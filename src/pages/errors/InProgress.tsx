import { Paper, Typography } from '@mui/material';

export const InProgress = () => {
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
      <Typography>&#9202;</Typography>
      <Typography fontWeight="70px">Page still In Progress...</Typography>
    </Paper>
  );
};
