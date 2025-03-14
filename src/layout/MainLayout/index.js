import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import Drawer from './Drawer';
import Header from './Header';
import Footer from './Footer';
import { openDrawer } from 'store/slice/menu';

const MainLayout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const { drawerOpen } = useSelector((state) => state.menu);

  useEffect(() => {
    const initializeLayout = () => {
      const shouldReload = !sessionStorage.getItem('hasReloaded');
      if (shouldReload) {
        sessionStorage.setItem('hasReloaded', 'true');
        window.location.reload();
      }

      const initialDrawerState = !matchDownLG;
      dispatch(openDrawer({ drawerOpen: initialDrawerState }));
    };

    initializeLayout();
  }, [dispatch, matchDownLG]);

  useEffect(() => {
    dispatch(openDrawer({ drawerOpen: !matchDownLG }));
  }, [matchDownLG, dispatch]);

  const handleDrawerToggle = () => {
    dispatch(openDrawer({ drawerOpen: !drawerOpen }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default
      }}
    >
      <Header open={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={drawerOpen} handleDrawerToggle={handleDrawerToggle} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: `calc(100% - ${drawerOpen ? theme.mixins.drawerWidth : 0}px)`,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          })
        }}
      >
        <Toolbar />
        <Box
          sx={{
            flex: 1,
            p: 3,
            [theme.breakpoints.down('sm')]: {
              p: 2
            }
          }}
        >
          <Box
            sx={{
              borderRadius: 2,
              p: 3,
              bgcolor: 'background.paper',
              boxShadow: theme.shadows[2],
              minHeight: 'calc(100vh - 160px)'
            }}
          >
            <Outlet />
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
