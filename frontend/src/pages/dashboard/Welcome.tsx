import { Box, Typography, Stepper, Step, StepIndicator } from '@mui/joy';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useAuth } from "../../context/useAuth";
import DashboardBox from '../../assets/DashboardBox';

export default function Welcome() {
  const { user, forms } = useAuth() ?? {};
  const formProgress = forms?.progress || 0;

  return (
    <DashboardBox 
      gridArea="i"
      sx={{ padding: '16px', display: 'flex', flexDirection: 'column', height: '100%', border: 'none', width: '100%' }}
    >
      {/* Top Row: Welcome Header */}
      <Box sx={{ marginBottom: '24px', marginTop: '-10px' }}>
        <Box sx={{ whiteSpace: 'nowrap' }}>
          <Typography fontSize="24px" fontWeight="700" fontFamily="Inter" display="inline">
            Qué bueno verte,&nbsp;
          </Typography>
          <Typography fontSize="24px" fontWeight="700" fontFamily="Inter" display="inline">
            {user?.firstName}
          </Typography>
        </Box>
        <Typography fontSize="18px" fontWeight="400" fontFamily="Inter" color="neutral">
          Retomemos justo donde lo dejaste
        </Typography>
      </Box>

      {/* Modified Stepper Component */}
      <Stepper sx={{ width: '100%', mt: '15px'}}>
        <Step
          completed={formProgress > 0}
          indicator={
            <StepIndicator variant="solid" color={formProgress > 0 ? "success" : "neutral"}>
              {formProgress > 0 ? <CheckRoundedIcon /> : "1"}
            </StepIndicator>
          }
        >
          Llenar formularios
        </Step>
        <Step
          completed={formProgress === 100}
          indicator={
            <StepIndicator variant={formProgress === 100 ? "solid" : "outlined"} color={formProgress === 100 ? "success" : "neutral"}>
              {formProgress === 100 ? <CheckRoundedIcon /> : "2"}
            </StepIndicator>
          }
        >
          Reunión con Comercial
        </Step>
        <Step indicator={<StepIndicator>3</StepIndicator>}>Firmar Contrato</Step>
      </Stepper>
    </DashboardBox>
  );
}