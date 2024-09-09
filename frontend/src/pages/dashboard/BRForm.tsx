import BoxHeader from "../../assets/BoxHeader";
import DashboardBox from "../../assets/DashboardBox";
import FactoryIcon from '@mui/icons-material/Factory';
import { Box, CircularProgress, Typography } from "@mui/joy";
import { useAuth } from "../../context/AuthContext";

const BRForm = () => {
  const questionsAnswered = 23;
  const questionsRemaining = 31;

  const auth = useAuth();
  const infrastructure = auth?.infrastructure;
  console.log(infrastructure?.progress)
  
  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          icon={
            <Box sx={{ fontSize: '16px', color: "#000000", alignItems: "center", marginTop: "0.2rem" }}>
              <FactoryIcon fontSize="inherit" />
            </Box>
          }
          title="Formulario Biorrefinería"
          route="./101-form/infrastructure"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: '1rem'}}>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
            <Typography fontSize="30px" fontWeight="500" fontFamily="Inter">{questionsAnswered} / {questionsAnswered + questionsRemaining} <Typography fontSize="12px" fontWeight="semibold" fontFamily="Inter">preguntas</Typography> </Typography>
          </Box>
          <Box sx={{ width: '50%', height: '50px', margin: '0rem 1rem', padding: '0.5rem 0rem'}}>
            <CircularProgress size="lg" determinate value={infrastructure?.progress}>
              <Typography>{infrastructure?.progress}%</Typography>
            </CircularProgress>
          </Box>
        </Box>
      </DashboardBox>
    </>
  );
};

export default BRForm;
