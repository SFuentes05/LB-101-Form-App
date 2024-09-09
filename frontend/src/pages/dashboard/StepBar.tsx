import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography, { typographyClasses } from '@mui/joy/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Box } from '@mui/joy';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import ConstructionIcon from '@mui/icons-material/Construction';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import { useAuth } from '../../context/AuthContext';

export default function StepBar() {
  const {user, logout} = useAuth();
  return (
    <Box gridArea="d" sx={{ position: 'relative', overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'left',
          height: '100%',
          position: 'relative',
          zIndex: 1,
          flexDirection: 'column'
        }}
      >
        <Stepper
          orientation="vertical"
          size="sm"
          sx={{
            '--Stepper-verticalGap': '1rem', // Smaller vertical spacing between steps
            '--StepIndicator-size': '1.5rem', // Smaller step indicator size
            '--Step-gap': '0.3rem', // Smaller gap for the overall step
            '--Step-connectorInset': '0.3rem', // Smaller inset for connector
            '--Step-connectorRadius': '0.3rem', // Smaller radius for the connector
            '--Step-connectorThickness': '4px', // Thinner connector line
            [`& .${stepClasses.completed}`]: {
              [`& .${stepIndicatorClasses.root}`]: {
                background: 'linear-gradient(135deg, rgba(3, 247, 77, 1) 0%, rgba(69, 255, 50, 1) 30%, rgba(28, 219, 255, 1) 100%)',
              },
              '&::after': {
                background: 'linear-gradient(135deg, rgba(3, 247, 77, 1) 0%, rgba(69, 255, 50, 1) 30%, rgba(28, 219, 255, 1) 100%)',
              },
            },
            [`& .${stepClasses.active}`]: {
              [`& .${stepIndicatorClasses.root}`]: {
                background: 'linear-gradient(135deg, rgba(3, 247, 77, 1) 0%, rgba(69, 255, 50, 1) 30%, rgba(28, 219, 255, 1) 100%)',
              },
            },
            [`& .${stepClasses.disabled} *`]: {
              color: 'neutral.softDisabledColor',
            },
            [`& .${typographyClasses['title-sm']}`]: {
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '8px', // Smaller font size for titles
            },
            [`& .${stepClasses.root}`]: {
              '--Step-connectorColor': 'linear-gradient(135deg, rgba(3, 247, 77, 1) 0%, rgba(69, 255, 50, 1) 50%, rgba(28, 219, 255, 1) 100%)',
            },
          }}
        >
          <Step
            completed
            indicator={
              <StepIndicator variant="solid" color="success">
                <CheckRoundedIcon />
              </StepIndicator>
            }
          >
            <div>
              <Typography level="title-sm">Paso 1</Typography>
              Crear cuenta
            </div>
          </Step>
          <Step
            active
            indicator={
              <StepIndicator variant="solid" color="danger">
                <AppRegistrationRoundedIcon />
              </StepIndicator>
            }
          >
            <div>
              <Typography level="title-sm">Paso 2</Typography>
              Llenar Información 101
            </div>
          </Step>
          <Step
            disabled
            indicator={
              <StepIndicator><CoPresentIcon /></StepIndicator>
            }
          >
            <div>
              <Typography level="title-sm">Paso 3</Typography>
              Recibir propuesta
            </div>
          </Step>
          <Step disabled
            indicator={<StepIndicator><ConstructionIcon /></StepIndicator>}>
            <div>
              <Typography level="title-sm">Paso 4</Typography>
              Implementación
            </div>
          </Step>
        </Stepper>
      </Box>
    </Box>
  );
}
