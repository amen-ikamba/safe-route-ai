import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
export const gemmaModel = genAI.getGenerativeModel({ model: 'gemma-7b-it' });

// Utility function for route safety analysis
export async function analyzeRouteSafety(startLocation, endLocation, timeOfDay) {
  try {
    const prompt = `
      Analyze the safety of a route:
      Start: ${startLocation}
      End: ${endLocation}
      Time: ${timeOfDay}
      
      Consider:
      1. Historical crime data
      2. Lighting conditions
      3. Population density
      4. Emergency service proximity
      
      Provide:
      1. Safety score (0-100)
      2. Key risk factors
      3. Recommended precautions
      4. Alternative safer routes if necessary
    `;

    const result = await geminiModel.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw error;
  }
}

// File: src/components/Dashboard.js
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