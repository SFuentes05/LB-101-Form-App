import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PhoneIcon from '@mui/icons-material/Phone';
import { Button, CardActions, CardOverflow } from '@mui/joy';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import CountrySelector from '../assets/CountrySelector';

interface FormElements extends HTMLFormControlsCollection {
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  country: HTMLInputElement;
  company: HTMLInputElement;
  jobTitle: HTMLInputElement;
  phoneNumber: HTMLInputElement;
  email: HTMLInputElement;
}
interface EditUserFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function MyProfile() {
  const auth = useAuth();
  const user = auth?.user; // Use optional chaining here

  const handleSubmit = async (event: React.FormEvent<EditUserFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;

    if (!formElements) {
      console.error("Form elements are not defined.");
      return;
    }

    const firstName = formElements.firstName?.value || "";
    const lastName = formElements.lastName?.value || "";
    const country = formElements.country?.value || "";
    const company = formElements.company?.value || "";
    const jobTitle = formElements.jobTitle?.value || "";
    const phoneNumber = formElements.phoneNumber?.value || "";
    const email = formElements.email?.value || "";

    try {
      toast.loading("Editing User", { id: "editUser" });
      await auth?.userEdit(firstName, lastName, company, country, jobTitle, phoneNumber, email);
      toast.success("User Edit Successful", { id: "editUser" });
    } catch (error) {
      console.log(error);
      toast.error("User Edit Failed", { id: "editUser" });
    }
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box
        component="main"
        className="MainContent"
        sx={{
          pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100vh',
          gap: 1,
          overflow: 'auto',
        }}
      >
        <Box sx={{ flex: 1, width: '100%' }}>
          <Box
            sx={{
              position: 'sticky',
              top: { sm: -100, md: -110 },
              bgcolor: 'background.body',
              zIndex: 9995,
            }}
          >
            <Box sx={{ px: { xs: 2, md: 6 } }}>
              <Breadcrumbs
                size="sm"
                aria-label="breadcrumbs"
                separator={<ChevronRightRoundedIcon fontSize="small" />}
                sx={{ pl: 0 }}
              >
                <Link underline="none" color="neutral" href="/home" aria-label="Home">
                  <HomeRoundedIcon />
                </Link>
                <Link underline="hover" color="neutral" href="" fontSize={12} fontWeight={500}>
                  Usuarios
                </Link>
                <Typography color="primary" fontWeight={500} fontSize={12}>
                  Mi perfil
                </Typography>
              </Breadcrumbs>
              <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                Mi Perfil
              </Typography>
            </Box>
            <Tabs
              defaultValue={0}
              sx={{ bgcolor: 'transparent' }}
            >
              <TabList
                tabFlex={1}
                size="sm"
                sx={{
                  pl: { xs: 0, md: 4 },
                  justifyContent: 'left',
                  [`&& .${tabClasses.root}`]: {
                    fontWeight: '600',
                    flex: 'initial',
                    color: 'text.tertiary',
                    [`&.${tabClasses.selected}`]: {
                      bgcolor: 'transparent',
                      color: 'text.primary',
                      '&::after': {
                        height: '2px',
                        bgcolor: 'primary.500',
                      },
                    },
                  },
                }}
              >
                <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={0}>
                  Mi perfil
                </Tab>
                {/* <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={1}>
                  Equipo
                </Tab> */}
              </TabList>
            </Tabs>
          </Box>
          <Stack
            spacing={4}
            sx={{
              display: 'flex',
              maxWidth: '800px',
              mx: 'auto',
              px: { xs: 2, md: 6 },
              py: { xs: 2, md: 3 },
            }}
          >
            <Card component="form" onSubmit={handleSubmit}>
              <Box sx={{ mb: 1 }}>
                <Typography level="title-md">Información</Typography>
                <Typography level="body-sm">
                  Ayúdanos a servirte mejor proporcionándonos detalles adicionales sobre ti
                </Typography>
              </Box>
              <Divider />
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={3}
                sx={{ my: 1 }}
                alignItems="center"
              >
                <Box sx={{ position: 'relative' }}>
                  <AspectRatio
                    ratio="1"
                    sx={{ width: 120, borderRadius: '50%', overflow: 'hidden' }}
                  >
                    <img
                      src="https://www.cross-court.com/assets/missing-profile-image-7239fb75.jpg"
                      srcSet="https://www.cross-court.com/assets/missing-profile-image-7239fb75.jpg 2x"
                      loading="lazy"
                      alt="Profile"
                    />
                  </AspectRatio>
                  <IconButton
                    aria-label="upload new picture"
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    sx={{
                      bgcolor: 'background.body',
                      position: 'absolute',
                      zIndex: 2,
                      borderRadius: '50%',
                      right: -10,
                      bottom: -10,
                      boxShadow: 'sm',
                    }}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                </Box>
                <Stack spacing={2} sx={{ flexGrow: 1, width: '100%' }}>
                  <Stack spacing={1}>
                    <FormLabel>Información General</FormLabel>
                    <Stack spacing={1}>
                      <FormControl>
                        <FormLabel>Nombre</FormLabel>
                        <Input size="sm" name="firstName" defaultValue={user?.firstName || ''} />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Apellido</FormLabel>
                        <Input size="sm" name="lastName" defaultValue={user?.lastName || ''} />
                      </FormControl>
                    </Stack>
                  </Stack>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <FormControl>
                      <FormLabel>Compañía (optional)</FormLabel>
                      <Input size="sm" name="company" defaultValue={user?.company || ''} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Posición (optional)</FormLabel>
                      <Input size="sm" name="jobTitle" defaultValue={user?.jobTitle || ''} />
                    </FormControl>
                  </Stack>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <FormControl>
                      <FormLabel>Número de teléfono (optional)</FormLabel>
                      <Input size="sm" name="phoneNumber" defaultValue={user?.phoneNumber || ''} startDecorator={<PhoneIcon />} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        size="sm"
                        type="email"
                        name="email"
                        defaultValue={user?.email || ''}
                        startDecorator={<EmailRoundedIcon />}
                      />
                    </FormControl>
                  </Stack>
                  <FormControl>
                    <FormLabel>País</FormLabel>
                    <CountrySelector defaultValue={user?.country || ''} />
                  </FormControl>
                  <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                      <Button size="sm" variant="outlined" color="neutral">
                        Cancel
                      </Button>
                      <Button size="sm" variant="solid" type="submit">
                        Save
                      </Button>
                    </CardActions>
                  </CardOverflow>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
