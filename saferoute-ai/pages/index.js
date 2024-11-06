// File: pages/index.js
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Paper,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Map as MapIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  NavigationOutlined as NavigationIcon,
  Notifications as NotificationsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#5c6bc0',
      light: '#8e99f3',
      dark: '#26418f',
    },
    secondary: {
      main: '#ff4081',
      light: '#ff79b0',
      dark: '#c60055',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

// Mock data for demonstration
const initialStats = {
  totalRoutes: 24,
  safeAreas: 12,
  trustedContacts: 3,
  activeAlerts: 0,
};

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedView, setSelectedView] = useState('dashboard');
  const router = useRouter(); // Initialize useRouter for navigation

  // Simulate loading initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In real app, fetch data from your backend
        setStats(initialStats);
      } catch (error) {
        setNotification({
          type: 'error',
          message: 'Failed to load dashboard data'
        });
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleSOSClick = async () => {
    try {
      setLoading(true);
      // Simulate AI emergency assessment
      await new Promise(resolve => setTimeout(resolve, 1500));
      setNotification({
        type: 'success',
        message: 'Emergency services notified. Help is on the way.'
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to activate SOS. Please try again or call emergency services directly.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoutePlannerClick = () => {
    router.push('/route');  // Navigate to the Route Planner page
  };

  const drawerContent = (
      <List>
        <ListItem button selected={selectedView === 'dashboard'} onClick={() => setSelectedView('dashboard')}>
          <ListItemIcon><DashboardIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button selected={selectedView === 'map'} onClick={handleRoutePlannerClick}>
          <ListItemIcon><MapIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Route Planner" />
        </ListItem>
        <ListItem button selected={selectedView === 'contacts'} onClick={() => setSelectedView('contacts')}>
          <ListItemIcon><PersonIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Trusted Contacts" />
        </ListItem>
        <ListItem button selected={selectedView === 'settings'} onClick={() => setSelectedView('settings')}>
          <ListItemIcon><SettingsIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
  );

  return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton
                  color="inherit"
                  edge="start"
                  onClick={() => setDrawerOpen(!drawerOpen)}
                  sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <SecurityIcon sx={{ mr: 1 }} />
                <Typography variant="h6" noWrap>
                  SafeRoute AI
                </Typography>
              </Box>
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
              <Avatar sx={{ ml: 2 }}>JS</Avatar>
            </Toolbar>
          </AppBar>

          <Drawer
              variant="permanent"
              open={drawerOpen}
              sx={{
                width: drawerOpen ? 240 : 64,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerOpen ? 240 : 64,
                  boxSizing: 'border-box',
                  transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                },
              }}
          >
            <Toolbar />
            {drawerContent}
          </Drawer>

          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            <Container maxWidth="lg">
              {loading ? (
                  <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                    <CircularProgress />
                  </Box>
              ) : (
                  <>
                    <Grid container spacing={3}>
                      {/* Emergency SOS Button */}
                      <Grid item xs={12}>
                        <Paper
                            elevation={3}
                            sx={{
                              p: 2,
                              display: 'flex',
                              justifyContent: 'center',
                              background: 'linear-gradient(45deg, #ff4081 30%, #ff0057 90%)',
                            }}
                        >
                          <Button
                              variant="contained"
                              color="error"
                              size="large"
                              startIcon={<SecurityIcon />}
                              onClick={handleSOSClick}
                              sx={{
                                py: 2,
                                px: 6,
                                color: 'white',
                                fontSize: '1.2rem',
                              }}
                          >
                            SOS Emergency
                          </Button>
                        </Paper>
                      </Grid>

                      {/* Stats Cards */}
                      <Grid item xs={12} sm={6} md={3}>
                        <Card>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                              Total Routes
                            </Typography>
                            <Typography variant="h4">{stats.totalRoutes}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3}>
                        <Card>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                              Safe Areas
                            </Typography>
                            <Typography variant="h4">{stats.safeAreas}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3}>
                        <Card>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                              Trusted Contacts
                            </Typography>
                            <Typography variant="h4">{stats.trustedContacts}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3}>
                        <Card>
                          <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                              Active Alerts
                            </Typography>
                            <Typography variant="h4">{stats.activeAlerts}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>

                      {/* Quick Actions */}
                      <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                          <Typography variant="h6" gutterBottom>
                            Quick Actions
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                              <Button
                                  fullWidth
                                  variant="outlined"
                                  startIcon={<NavigationIcon />}
                                  sx={{ py: 1.5 }}
                              >
                                Plan New Route
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <Button
                                  fullWidth
                                  variant="outlined"
                                  startIcon={<SecurityIcon />}
                                  sx={{ py: 1.5 }}
                              >
                                Report an Incident
                              </Button>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Grid>
                  </>
              )}
            </Container>
          </Box>
        </Box>

        <Snackbar
            open={notification !== null}
            autoHideDuration={6000}
            onClose={() => setNotification(null)}
        >
          <Alert
              severity={notification?.type || 'info'}
              onClose={() => setNotification(null)}
              sx={{ width: '100%' }}
          >
            {notification?.message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
  );
}
