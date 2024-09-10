import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '../assets/GoogleIcon';
import { useAuth } from '../context/useAuth';

interface FormElements extends HTMLFormControlsCollection {
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  country: HTMLInputElement;
  company: HTMLInputElement;
  jobTitle: HTMLInputElement;
  phoneNumber: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignUpFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Signup() {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (event: React.FormEvent<SignUpFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const firstName = formElements.firstName.value;
    const lastName = formElements.lastName.value;
    const country = formElements.country.value || ""; // Optional
    const company = formElements.company.value || ""; // Optional
    const jobTitle = formElements.jobTitle.value || ""; // Optional
    const phoneNumber = formElements.phoneNumber.value || ""; // Optional
    const email = formElements.email.value;
    const password = formElements.password.value;
  
    try {
      toast.loading("Registrándose", { id: "signup" });
      await auth?.signup(firstName, lastName, email, password, company, country, jobTitle, phoneNumber);
      toast.success("Registro Exitoso", { id: "signup" });
      navigate("/home", { replace: true });
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Fallo en el Registro", { id: "signup" });
    }
  };

  React.useEffect(() => {
    if (auth?.user) {
      navigate("/home");
    }
  }, [auth, navigate]);

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s', // set to none to disable transition
          },
        }}
      />
      <Toaster />
      <Box
        sx={(theme) => ({
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <img src="/logoLatamBioenergy.png" width={100} height={53} />
            </Box>
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Registrarse
                </Typography>
                <Typography level="body-sm" sx={{ textAlign: 'left' }}>
                  ¿Ya tienes una cuenta?{' '}
                  <Link href="/login" level="title-sm">
                    ¡Inicia sesión!
                  </Link>
                </Typography>
              </Stack>
              <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
              >
                Continuar con Google
              </Button>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector('light')]: {
                  color: { xs: '#FFF', md: 'text.tertiary' },
                },
              })}
            >
              o
            </Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <FormControl required>
                  <FormLabel>Nombre</FormLabel>
                  <Input type="text" name="firstName" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Apellido</FormLabel>
                  <Input type="text" name="lastName" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>
                <FormControl>
                  <FormLabel>País (opcional)</FormLabel>
                  <Input type="text" name="country" />
                </FormControl>
                <FormControl>
                  <FormLabel>Empresa (opcional)</FormLabel>
                  <Input type="text" name="company" />
                </FormControl>
                <FormControl>
                  <FormLabel>Puesto (opcional)</FormLabel>
                  <Input type="text" name="jobTitle" />
                </FormControl>
                <FormControl>
                  <FormLabel>Número de Teléfono (opcional)</FormLabel>
                  <Input type="text" name="phoneNumber" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Contraseña</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox size="sm" label="Recuérdame" name="persistent" />
                  </Box>
                  <Button type="submit" fullWidth>
                    Crear cuenta
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © LatAm BioEnergy {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'url(/plantaAGF.jpg)',
        }}
      />
    </CssVarsProvider>
  );
}
