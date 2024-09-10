import DashboardBox from "../../assets/DashboardBox";
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router-dom';

const MyCompany = () => {
const navigate = useNavigate(); // Create an instance of useNavigate
  return (
    <DashboardBox 
      gridArea="f" 
      style={{
        position: 'relative', 
        overflow: 'hidden', 
        display: "flex", 
        alignItems: "center",
        height: '100%', // Ensure it fills the parent container
      }}
    >
      <img 
        src="map.png" 
        style={{
          width: '33.3%', 
          height: '100%', 
          objectFit: 'cover', 
          position: 'absolute', 
          left: '-5%'  // Shifted further to the left
        }}
      />
      <Box 
        sx={{
          display: "flex", 
          flexDirection: 'column', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginLeft: '28.3%', // Adjusted to start right after the shifted image
          width: '71.7%', // Adjusted to fill the remaining space
          padding: "0 2rem" // Optional padding for aesthetics
        }}
      >
        <Typography 
          fontSize="20px" 
          fontWeight="500" 
          fontFamily="Inter" 
          sx={{
            color: "black", 
            fontWeight: 'bold',
            marginBottom: '0.5rem' // Space above the button
          }}
        >
          Mi compañía
        </Typography>
        <Button 
          type="submit"
          sx={{
            background: 'black', 
            color: 'white',
            width: '100%', 
            height: '2.5rem',  // Adjusted height for better appearance
            borderRadius: "12px",
            fontSize: '11px',
            transition: 'all 0.3s ease', // Transition effect for smoothness
            '&:hover': {
              background: '#ebebeb', // Very light grey on hover
              transform: 'scale(1.05)', // Make the button pop out a bit
              color: 'black',
            }
          }}
          onClick={() => navigate('/company')} // Add the onClick event handler
        >
        Proveer información
        </Button>
      </Box>
    </DashboardBox>
  );
};

export default MyCompany;
