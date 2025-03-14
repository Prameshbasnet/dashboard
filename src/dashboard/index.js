import { Grid, Typography } from '@mui/material';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

const DashboardDefault = () => {
  const stats = [
    { title: 'Total Sales', count: '1', percentage: 20, extra: '1' },
    { title: 'Total Income', count: '1', percentage: 10, extra: '1' },
    {
      title: 'Total Expenses',
      count: '1',
      percentage: 60,
      isLoss: true,
      color: 'warning',
      extra: '1'
    }
  ];

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard Overview
        </Typography>
      </Grid>
      {stats.map((metric, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce {...metric} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardDefault;
