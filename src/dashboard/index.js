import {
  // Avatar,
  // AvatarGroup,
  // Button,
  Grid,
  // List,
  // ListItemAvatar,
  // ListItemButton,
  // ListItemSecondaryAction,
  // ListItemText,

  // Stack,
  Typography
} from '@mui/material';

import OrdersTable from './OrdersTable';
// import IncomeAreaChart from "./IncomeAreaChart";

import MainCard from 'components/MainCard';

// assets

import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import PieChartApplication from './PieChartApplication';

// avatar style
// const avatarSX = {
//   width: 36,
//   height: 36,
//   fontSize: "1rem"
// };

// action style
// const actionSX = {
//   mt: 0.75,
//   ml: 1,
//   top: "auto",
//   right: "auto",
//   alignSelf: "flex-start",
//   transform: "none"
// };

// sales report status
// const status = [
//   {
//     value: "today",
//     label: "Today"
//   },
//   {
//     value: "month",
//     label: "This Month"
//   },
//   {
//     value: "year",
//     label: "This Year"
//   }
// ];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  return (
    <Grid
      container
      rowSpacing={4.5}
      columnSpacing={1.75}
      style={{
        padding: '1rem'
      }}
    >
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Sales" count="1" percentage={1} extra="1" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Income" count="1" percentage={1} extra="1" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Expenses" count="1" percentage={1} isLoss color="warning" extra="1" />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      <Grid item xs={12} md={5} lg={5} sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <PieChartApplication />
      </Grid>
      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Application</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>

      {/* row 4 */}

      {/* row 5 */}
    </Grid>
  );
};

export default DashboardDefault;
