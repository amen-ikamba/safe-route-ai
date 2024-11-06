// File: src/components/RoutePlanner.js
'use client'
import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { analyzeRouteSafety } from '@/lib/ai';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// Define the map container styles
const mapContainerStyle = {
  width: '100%',
  height: '400px',  // Set map height to fit within the page
};

const defaultCenter = {
  lat: 37.7749, // Default center point (San Francisco)
  lng: -122.4194,
};

export default function RoutePlanner() {
  const [route, setRoute] = useState({
    start: '',
    end: '',
    analysis: null,
    loading: false
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDAdOFcGdrhJ-kkaPEcIwinbDE2c2vO-9o', // Replace with your actual API key
    libraries: ['places'],
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

  if (!isLoaded) {
    return <div>Loading Map...</div>; // Loading message while the map is loading
  }

  return (
      <Box>
        {/* Route Planner Section */}
        <Paper sx={{ p: 3, mb: 3 }}>
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

        {/* Google Map Section */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Route Map</Typography>
          <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={defaultCenter}
              zoom={10}
          >
            {/* Marker for default location */}
            <Marker position={defaultCenter} />
          </GoogleMap>
        </Paper>
      </Box>
  );
}
