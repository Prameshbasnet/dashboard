import { Chip, Grid, Stack, Typography, Box, useTheme, alpha } from '@mui/material';
import MainCard from 'components/MainCard';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

const AnalyticEcommerce = ({ color = 'primary', title, count, percentage, isLoss }) => {
  const theme = useTheme();

  return (
    <MainCard
      contentSX={{
        p: 2.5,
        height: 160,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.1)} 0%, ${alpha(theme.palette[color].main, 0)} 100%)`,
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: theme.shadows[6]
        }
      }}
    >
      <Stack spacing={0.5}>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          sx={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 0.5,
            color: theme.palette[color].main
          }}
        >
          {title}
        </Typography>

        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                lineHeight: 1.2,
                color: theme.palette.text.primary
              }}
            >
              {count}
            </Typography>
          </Grid>

          {percentage !== undefined && (
            <Grid item>
              <Chip
                variant="filled"
                color={color}
                icon={isLoss ? <FallOutlined style={{ fontSize: '0.75rem' }} /> : <RiseOutlined style={{ fontSize: '0.75rem' }} />}
                label={`${percentage}%`}
                size="small"
                sx={{
                  height: 24,
                  borderRadius: 1,
                  bgcolor: alpha(theme.palette[color].main, 0.1),
                  color: theme.palette[color].main,
                  '& .MuiChip-icon': {
                    marginRight: 0.5,
                    marginLeft: 0
                  }
                }}
              />
            </Grid>
          )}
        </Grid>
      </Stack>

      <Box
        sx={{
          height: 4,
          width: '100%',
          bgcolor: alpha(theme.palette[color].main, 0.1),
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            width: `${percentage}%`,
            height: '100%',
            bgcolor: theme.palette[color].main,
            transition: 'width 0.5s ease'
          }}
        />
      </Box>
    </MainCard>
  );
};
export default AnalyticEcommerce;
