import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';
import DrawerHeaderStyled from './DrawerHeaderStyled';
import logo from '../../../../assets/images/logo/logo.png';

const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1}>
        <img src={logo} alt="client logo" style={{ padding: 15 }} />
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
