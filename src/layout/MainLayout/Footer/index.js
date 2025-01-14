import React from 'react';
import { Typography, AppBar, Grid } from '@mui/material';
import logo from '../../../assets/images/TU.png';
import { Link } from '../../../../node_modules/react-router-dom/dist/index';

const Footer = () => {
  return (
    <AppBar position="fixed" color="" sx={{ top: 'auto', bottom: 0, marginTop: 'auto' }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="body2"></Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" color="secondary" component="div" style={{ marginTop: '10px' }}>
            © Copyright {new Date().getFullYear()} Pramesh Basnet.
          </Typography>
        </Grid>
        <Grid item style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="subtitle2" color="secondary" component="span" style={{ marginRight: '10px', textAlign: 'center' }}>
            Powered By
          </Typography>
          <Typography component={Link} variant="subtitle2" href="https://prameshbasnet.com.np" target="_blank" underline="hover">
            <img src={logo} alt="logo" height="10px" width="40px" style={{ marginRight: '25px' }} />{' '}
          </Typography>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Footer;
