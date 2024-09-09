import { CircularProgress, Box } from '@mui/joy';

export default function LoadingSpinner() {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      zIndex: 9999
    }}>
      <CircularProgress color="success"/>
    </Box>
  );
}