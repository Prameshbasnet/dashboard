import { Grid, Typography } from '@mui/material';

// assets

import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import PieChartApplication from './PieChartApplication';

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
    </Grid>
  );
};

export default DashboardDefault;
