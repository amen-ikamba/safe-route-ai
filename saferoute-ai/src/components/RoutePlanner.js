import { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Typography,
  CircularProgress
} from '@mui/material';
import { analyzeRouteSafety } from '@/lib/ai';

export default function RoutePlanner() {
  const [route, setRoute] = useState({
    start: '',
    end: '',
    analysis: null,
    loading: false
  });

  const analyzeRoute = async () => {
    setRoute(prev => ({ ...prev, loading: true }));
    try {
      const analysis = await analyzeRouteSafety(
        route.start,
        route.end,
        new Date().toLocaleTimeString()
      );
      setRoute(prev => ({ ...prev, analysis, loading: false }));
    } catch (error) {
      console.error(error);
      setRoute(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Plan Safe Route</Typography>
      
      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Start Location"
          value={route.start}
          onChange={(e) => setRoute(prev => ({ ...prev, start: e.target.value }))}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Destination"
          value={route.end}
          onChange={(e) => setRoute(prev => ({ ...prev, end: e.target.value }))}
          sx={{ mb: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={analyzeRoute}
          disabled={route.loading}
        >
          {route.loading ? <CircularProgress size={24} /> : 'Analyze Route'}
        </Button>
      </Box>

      {route.analysis && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Safety Analysis</Typography>
          <Typography>{route.analysis}</Typography>
        </Box>
      )}
    </Paper>
  );
}