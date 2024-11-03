import { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography,
  Button,
  IconButton
} from '@mui/material';
import {
  Security,
  Map,
  NavigationOutlined,
  PersonOutline,
  Settings
} from '@mui/icons-material';

export default function Dashboard() {
  const [emergencyMode, setEmergencyMode] = useState(false);

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Header */}
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display="flex" alignItems="center">
                  <Security sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h4">SafeRoute AI</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={() => setEmergencyMode(true)}
                >
                  SOS Emergency
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Stats */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Safe Routes</Typography>
                <Typography variant="h3">24</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Add more stat cards */}
        </Grid>
      </Box>
    </Container>
  );
}

