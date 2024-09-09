import DashboardBox from "../../assets/DashboardBox";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { Box } from "@mui/joy";
import GradientBackground from "../../assets/GradientBackground";
import ProgressBar from "../../assets/ProposalProgressBar";
import { MoreVert } from "@mui/icons-material";
import { useMediaQuery } from '@mui/material'; // Import MUI useMediaQuery for responsive design

function Proposal() {
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Define screen size breakpoint

  return (
    <DashboardBox gridArea="i" style={{ position: 'relative', overflow: 'hidden' }} zIndex="1">
      <Box id="background">
        <GradientBackground />
      </Box>

      <Box style={{ position: 'absolute', top: '30px', right: '15px', zIndex: 2 }}>
        <MoreVert sx={{ fontSize: isSmallScreen ? '20px' : '30px' }} /> {/* Responsive icon size */}
      </Box>

      <Box className="icon-container" style={{ padding: isSmallScreen ? '15px' : '30px', position: 'relative', zIndex: 3 }}>
        <CoPresentIcon sx={{ fontSize: isSmallScreen ? '35px' : '50px' }} /> {/* Responsive icon size */}
      </Box>

     

      <Box style={{ 
        position: 'absolute', 
        top: isSmallScreen ? '180px' : '250px', 
        right: isSmallScreen ? '20px' : '255px', 
        left: '15px', 
        width: '100%', 
        zIndex: 1 
      }}>
        <ProgressBar percentage={76.8} label="Propuesta" usedStorage={"76%"} totalStorage={"100%"} />
      </Box>
    </DashboardBox>
  );
}

export default Proposal;