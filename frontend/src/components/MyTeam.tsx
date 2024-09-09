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
import { Button, CardActions, CardOverflow } from '@mui/joy';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';

interface FormElements extends HTMLFormControlsCollection {
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  email: HTMLInputElement;
  permissions: HTMLInputElement;
  phoneNumber?: HTMLInputElement;
  jobTitle?: HTMLInputElement;
}

interface AddTeamMemberFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function MyTeam() {
  const auth = useAuth();
  const user = auth?.user;
  const teamMembers = auth?.teamMembers || [];

  const handleEditTeamMember = (teamMemberId: string) => {
    // Handle edit action here
    toast.success(`Edit team member with ID: ${teamMemberId}`);
  };

  const handleDeleteTeamMember = async (teamMemberId: string) => {
    try {
      await auth?.deleteTeamMember(user?._id || '', teamMemberId);
      toast.success("Team member deleted successfully");
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Failed to delete team member");
    }
  };

  const handleAddTeamMember = async (event: React.FormEvent<AddTeamMemberFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;

    const firstName = formElements.firstName.value;
    const lastName = formElements.lastName.value;
    const email = formElements.email.value;
    const permissions = formElements.permissions.value.split(',').map((perm) => perm.trim());
    const phoneNumber = formElements.phoneNumber?.value || '';
    const jobTitle = formElements.jobTitle?.value || '';

    try {
      toast.loading("Adding team member", { id: "addTeamMember" });
      await auth?.addTeamMember(user?._id || '', firstName, lastName, email, permissions, phoneNumber, jobTitle);
      toast.success("Team member added successfully", { id: "addTeamMember" });
    } catch (error) {
      console.error("Error adding team member:", error);
      toast.error("Failed to add team member", { id: "addTeamMember" });
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
                  Mi equipo
                </Typography>
              </Breadcrumbs>
              <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                Mi Equipo
              </Typography>
            </Box>
            <Tabs defaultValue={1} sx={{ bgcolor: 'transparent' }}>
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
                  Ajustes
                </Tab>
                <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={1}>
                  Equipo
                </Tab>
                <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={2}>
                  Plan
                </Tab>
                <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={3}>
                  Facturación
                </Tab>
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
            <Sheet
              variant="outlined"
              sx={{
                '--TableCell-height': '40px',
                '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
                '--Table-firstColumnWidth': '80px',
                '--Table-lastColumnWidth': '144px',
                '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
                '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
                overflow: 'auto',
                background: (theme) => `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
                  linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
                  radial-gradient(farthest-side at 0 50%, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0)),
                  radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0))
                  0 100%`,
                backgroundSize:
                  '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'local, local, scroll, scroll',
                backgroundPosition:
                  'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
                backgroundColor: 'background.surface',
              }}
            >
              <Table
                borderAxis="bothBetween"
                stripe="odd"
                hoverRow
                sx={{
                  '& tr > *:first-child': {
                    position: 'sticky',
                    left: 0,
                    boxShadow: '1px 0 var(--TableCell-borderColor)',
                    bgcolor: 'background.surface',
                  },
                  '& tr > *:last-child': {
                    position: 'sticky',
                    right: 0,
                    bgcolor: 'var(--TableCell-headBackground)',
                  },
                }}
              >
                <thead>
                  <tr>
                    <th style={{ width: 'var(--Table-firstColumnWidth)' }}>ID</th>
                    <th style={{ width: 200 }}>Nombre</th>
                    <th style={{ width: 200 }}>Apellido</th>
                    <th style={{ width: 200 }}>Email</th>
                    <th style={{ width: 200 }}>Permisos</th>
                    <th aria-label="last" style={{ width: 'var(--Table-lastColumnWidth)' }} />
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member._id}>
                      <td>{member._id}</td>
                      <td>{member.firstName}</td>
                      <td>{member.lastName}</td>
                      <td>{member.email}</td>
                      <td>{member.permissions.join(', ')}</td>
                      <td>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            size="sm"
                            variant="plain"
                            color="neutral"
                            onClick={() => handleEditTeamMember(member._id)}
                          >
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="soft"
                            color="danger"
                            onClick={() => handleDeleteTeamMember(member._id)}
                          >
                            Eliminar
                          </Button>
                        </Box>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Sheet>

            <Card component="form" onSubmit={handleAddTeamMember}>
              <Box sx={{ mb: 1 }}>
                <Typography level="title-md">Agregar nuevo miembro del equipo</Typography>
                <Typography level="body-sm">
                  Complete los detalles para agregar un nuevo miembro del equipo.
                </Typography>
              </Box>
              <Divider />
              <Stack spacing={2} sx={{ flexGrow: 1, width: '100%', mt: 2 }}>
                <FormControl>
                  <FormLabel>Nombre</FormLabel>
                  <Input size="sm" name="firstName" required />
                </FormControl>
                <FormControl>
                  <FormLabel>Apellido</FormLabel>
                  <Input size="sm" name="lastName" required />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input size="sm" type="email" name="email" required />
                </FormControl>
                <FormControl>
                  <FormLabel>Permisos (separados por comas)</FormLabel>
                  <Input size="sm" name="permissions" placeholder="view,edit,delete" required />
                </FormControl>
                <FormControl>
                  <FormLabel>Número de teléfono (opcional)</FormLabel>
                  <Input size="sm" name="phoneNumber" />
                </FormControl>
                <FormControl>
                  <FormLabel>Título del trabajo (opcional)</FormLabel>
                  <Input size="sm" name="jobTitle" />
                </FormControl>
              </Stack>
              <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                  <Button size="sm" variant="outlined" color="neutral">
                    Cancelar
                  </Button>
                  <Button size="sm" variant="solid" type="submit">
                    Guardar
                  </Button>
                </CardActions>
              </CardOverflow>
            </Card>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
