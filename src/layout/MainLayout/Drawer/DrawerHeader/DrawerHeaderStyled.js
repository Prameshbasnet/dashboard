import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const DrawerHeaderStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-start' : 'center'
}));

export default DrawerHeaderStyled;
