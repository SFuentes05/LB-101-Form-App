import BoxHeader from "../../assets/BoxHeader";
import DashboardBox from "../../assets/DashboardBox";
import FlexBetween from "../../assets/FlexBetween";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Box, CircularProgress, Typography } from "@mui/joy";
import FormChart from "../../assets/Data";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import Data from "../../assets/Data";
import Data2 from "../../assets/Data2";
import { useAuth } from "../../context/AuthContext";

const BCForm = () => {
    const questionsAnswered = 13
    const questionsRemaining = 0

    const auth = useAuth();
    const infrastructure = auth?.infrastructure;
  return (
    <>
      <DashboardBox gridArea="b">
        <BoxHeader
          icon={
            <Box sx={{ fontSize: '16px', color: "#000000", alignItems:"center", marginTop:"0.2rem"}}>
                <LocalFireDepartmentIcon fontSize="inherit"/>
            </Box>
        }
          title="Formulario BioChar"
          route="./101-form/infrastructure"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: '1rem'}}>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
            <Typography fontSize="30px" fontWeight="500" fontFamily="Inter">{questionsAnswered} / {questionsAnswered + questionsRemaining} <Typography fontSize="12px" fontWeight="semibold" fontFamily="Inter">preguntas</Typography> </Typography>
          </Box>
          <Box sx={{ width: '50%', height: '50px', margin: '0rem 1rem', padding: '0.5rem 0rem'}}>
            <CircularProgress size="lg" determinate value={infrastructure?.progress as number}>
              <Typography>{infrastructure?.progress}%</Typography>
            </CircularProgress>
          </Box>
        </Box>
      </DashboardBox>
    </>
  );
};

export default BCForm;