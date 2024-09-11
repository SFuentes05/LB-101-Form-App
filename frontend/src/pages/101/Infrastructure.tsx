import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Header from '../../components/Header';
import { Breadcrumbs, Card, Divider, FormControl, FormLabel, Stack, Typography, Button, CardOverflow, CardActions, Textarea, Link, Radio, RadioGroup, Slider } from '@mui/joy';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/useAuth';

interface FormElements extends HTMLFormControlsCollection {
  availableSpace: HTMLInputElement;
  maxDistance: HTMLInputElement;
  constructure: HTMLInputElement;
  basicServices: HTMLInputElement;
  dirtQuality: HTMLInputElement;
  voltageRegulator: HTMLInputElement;
  comments: HTMLInputElement;
}

interface EditInfrastructureFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Infrastructure() {
  const auth = useAuth();
  const infrastructure = auth?.infrastructure;
  const user = auth?.user;

  if (!infrastructure || !user) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event: React.FormEvent<EditInfrastructureFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;

    if (!formElements) {
      console.error("Form elements are not defined.");
      return;
    }

    const companyID = user?.companyID; // Use as string
    const userID = user?._id; // Use as string
    const dateCreated = new Date();
    const availableSpace = formElements.availableSpace?.value || '';
    const maxDistance = formElements.maxDistance?.value || '';
    const constructure = formElements.constructure?.value || '';
    const basicServices = formElements.basicServices?.value || '';
    const dirtQuality = formElements.dirtQuality?.value || '';
    const voltageRegulator = formElements.voltageRegulator?.value || '';
    const comments = formElements.comments?.value || '';

    try {
      toast.loading("Editing Infrastructure Information", { id: "editInfrastructure" });
      await auth?.infrastructureEdit(
        companyID,
        userID,
        dateCreated,
        availableSpace,
        maxDistance,
        constructure,
        basicServices,
        dirtQuality,
        voltageRegulator,
        comments
      );
      toast.success("Infrastructure Information Updated Successfully", { id: "editInfrastructure" });
    } catch (error) {
      console.error("Error updating infrastructure:", error);
      if (error instanceof Error) {
        toast.error(`Failed to Update Infrastructure Information: ${error.message}`, { id: "editInfrastructure" });
      } else {
        toast.error("Failed to Update Infrastructure Information", { id: "editInfrastructure" });
      }
    }
  };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: { xs: 0, md: 0 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
            overflow: 'auto',
          }}
        >
          <Box sx={{ flex: 1, width: '100%', mt: "30px" }}>
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
                  <Link
                    underline="none"
                    color="neutral"
                    href="/home"
                    aria-label="Home"
                  >
                    <HomeRoundedIcon />
                  </Link>
                  <Link
                    underline="hover"
                    color="primary"
                    href=""
                    fontSize={12}
                    fontWeight={500}
                  >
                    Formulario 101 Infraestructura
                  </Link>
                </Breadcrumbs>
                <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                  Formulario Infraestructura
                </Typography>
              </Box>
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
                  <Typography level="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Formulario sobre Infraestructura
                  </Typography>
                  <Typography level="body-sm">
                    Al llenar este formulario nos estará proporcionando información esencial sobre la infraestructura de su compañía.
                  </Typography>
                </Box>
                <Divider />
                <Stack spacing={4} sx={{ my: 1 }}>
                  <Box>
                    <Typography level="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Espacio y Ubicación
                    </Typography>
                    <Card variant="outlined">
                      <Stack spacing={2}>
                        <FormControl>
                          <FormLabel>¿Tiene espacio disponible para el proyecto (500m^2)?</FormLabel>
                          <RadioGroup
                            name="constructure"
                            defaultValue={infrastructure?.constructure || ''}
                            orientation="horizontal"
                          >
                            <Radio value="Si" label="Si" color="success"/>
                            <Radio value="No" label="No" color="danger"/>
                          </RadioGroup>
                        </FormControl>
                        <FormControl>
                          <FormLabel>¿Requiere de construcción civil para el proyecto?</FormLabel>
                          <RadioGroup
                            name="constructure"
                            defaultValue={infrastructure?.constructure || ''}
                            orientation="horizontal"
                          >
                            <Radio value="Si" label="Si" color="danger"/>
                            <Radio value="No" label="No" color="success"/>
                          </RadioGroup>
                        </FormControl>
                        <FormControl>
                          <FormLabel>¿Cuál es la distancia máxima desde el punto más lejano del área hasta la aplicación? (m)</FormLabel>
                          <Slider
                            name="maxDistance"
                            defaultValue={Number(infrastructure?.maxDistance) || 0}
                            min={0}
                            max={1000}
                            step={10}
                            valueLabelDisplay="auto"
                            color="success"
                            sx={{ width: '95%', ml: 1.2 }}
                          />
                        </FormControl>
                      </Stack>
                    </Card>
                  </Box>

                  <Box>
                    <Typography level="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Servicios Básicos
                    </Typography>
                    <Card variant="outlined">
                      <Stack spacing={2}>
                        <FormControl>
                          <FormLabel>¿Tiene servicios básicos de agua, luz e internet?</FormLabel>
                          <RadioGroup
                            name="basicServices"
                            defaultValue={infrastructure?.basicServices || ''}
                            orientation="horizontal"
                          >
                            <Radio value="Si" label="Si" color="success"/>
                            <Radio value="No" label="No" color="danger"/>
                          </RadioGroup>
                        </FormControl>
                      </Stack>
                    </Card>
                  </Box>

                  <Box>
                    <Typography level="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Condiciones Técnicas
                    </Typography>
                    <Card variant="outlined">
                      <Stack spacing={2}>
                        <FormControl>
                          <FormLabel>¿La planta posee buena puesta a tierra?</FormLabel>
                          <RadioGroup
                            name="dirtQuality"
                            defaultValue={infrastructure?.dirtQuality || ''}
                            orientation="horizontal"
                          >
                            <Radio value="Si" label="Si" color="success"/>
                            <Radio value="No" label="No" color="danger"/>
                          </RadioGroup>
                        </FormControl>
                        <FormControl>
                          <FormLabel>¿La planta posee regulador de voltaje?</FormLabel>
                          <RadioGroup
                            name="voltageRegulator"
                            defaultValue={infrastructure?.voltageRegulator || ''}
                            orientation="horizontal"
                          >
                            <Radio value="Si" label="Si" color="success"/>
                            <Radio value="No" label="No" color="danger"/>
                          </RadioGroup>
                        </FormControl>
                      </Stack>
                    </Card>
                  </Box>

                  <Box>
                    <Typography level="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Comentarios Adicionales
                    </Typography>
                    <Card variant="outlined">
                      <Stack spacing={2}>
                        <FormControl>
                          <FormLabel>¿Algún comentario adicional?</FormLabel>
                          <Textarea size="sm" name="comments" minRows={2} placeholder="Tu comentario" defaultValue={infrastructure?.comments || ''} />
                        </FormControl>
                      </Stack>
                    </Card>
                  </Box>

                  <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2 }}>
                    <CardActions sx={{ alignSelf: 'flex-end' }}>
                      <Button size="sm" variant="outlined" color="neutral">Cancelar</Button>
                      <Button size="sm" variant="solid" color="success" type="submit">Subir</Button>
                    </CardActions>
                  </CardOverflow>
                </Stack>
              </Card>
            </Stack>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
