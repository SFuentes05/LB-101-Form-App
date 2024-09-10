import { useNavigate } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Star from '@mui/icons-material/Star';
import TwoSidedLayout from '../assets/TwoSidedLayout';

export default function Welcome() {
  const navigate = useNavigate();

  const handleLeerMas = () => {
    window.open('https://latambioenergy.com/', '_blank');
  };

  const handleEmpezar = () => {
    navigate('/signup');
  };

  return (
    <TwoSidedLayout>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        ÚNETE AL CICLO DE RENTABILIDAD SOSTENIBLE
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
        Nuestra propuesta de valor se basa en un ecosistema de cuatro impactos para hacer las agroindustrias más <Typography sx={{ fontWeight: 700 }}>eficientes, rentables, sostenibles </Typography>y habilitarlas rápidamente con las nuevas tecnologías, sin comprometer sus finanzas.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          my: 2,
          '& > *': { flex: 'auto' },
        }}
      >
        <Button size="lg" variant="outlined" color="neutral" onClick={handleLeerMas}>
          Leer más
        </Button>
        <Button size="lg" color="success" endDecorator={<ArrowForward fontSize="medium" />} onClick={handleEmpezar}>
          Empezar
        </Button>
      </Box>
      <Box
        sx={(theme) => ({
          display: 'flex',
          columnGap: 4.5,
          rowGap: 1.5,
          textAlign: 'center',
          alignSelf: 'stretch',
          '& > *': {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            alignItems: 'center',
          },
          [theme.breakpoints.up(834)]: {
            textAlign: 'left',
            '& > *': {
              alignItems: 'initial',
            },
          },
        })}
      >
        <div>
          <Typography
            fontSize="xl4"
            fontWeight="lg"
            endDecorator={<Star sx={{ fontSize: 'xl4', color: 'warning.300' }} />}
          >
            1er
          </Typography>
          <Typography textColor="text.secondary">
            Lugar mejor proyecto en economía circular
          </Typography>
        </div>
        <div>
          <Typography fontSize="xl4" fontWeight="lg">
            IA
          </Typography>
          <Typography textColor="text.secondary">
            Integramos Inteligencia Artificial
          </Typography>
        </div>
      </Box>
      <Typography
        level="body-xs"
        sx={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
      </Typography>
    </TwoSidedLayout>
  );
}
