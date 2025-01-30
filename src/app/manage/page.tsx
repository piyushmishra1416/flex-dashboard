"use client";
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const DashboardCard = ({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon sx={{ color, fontSize: 40, mr: 2 }} />
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Invoices',
      value: '1,234',
      icon: DescriptionIcon,
      color: '#1976d2'
    },
    {
      title: 'Active Vendors',
      value: '156',
      icon: GroupIcon,
      color: '#2e7d32'
    },
    {
      title: 'Monthly Spend',
      value: '$45,678',
      icon: AttachMoneyIcon,
      color: '#ed6c02'
    },
    {
      title: 'Growth Rate',
      value: '+12.5%',
      icon: TrendingUpIcon,
      color: '#9c27b0'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}