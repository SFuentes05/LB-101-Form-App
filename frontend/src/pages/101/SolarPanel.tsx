import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Header from '../../components/Header';
import { Breadcrumbs, Card, Divider, FormControl, FormLabel, Stack, Typography, Button, Input, CardOverflow, CardActions, Textarea, Link } from '@mui/joy';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/useAuth';
import QuestionTooltip from '../../components/Tooltip';

interface FormElements extends HTMLFormControlsCollection {
  installationLocation: HTMLInputElement;
  agroProduction: HTMLInputElement;
  energyConsumption: HTMLInputElement;
  consumptionPattern: HTMLInputElement;
  monthlyEnergyCost: HTMLInputElement;
  primaryEnergySource: HTMLInputElement;
  visitAvailability: HTMLInputElement;
  contactPreference: HTMLInputElement;
  availableSpace: HTMLInputElement;
  ceilingType: HTMLInputElement;
  climateCondition: HTMLInputElement;
  electricInfrastructure: HTMLInputElement;
  financingAvailability: HTMLInputElement;
  ROI: HTMLInputElement;
  subsidies: HTMLInputElement;
  desiredInstallationTime: HTMLInputElement;
  dueDate: HTMLInputElement;
  comments: HTMLInputElement;
}

interface EditSolarPanelFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function SolarPanel() {
  const auth = useAuth();
  const solarPanel = auth?.solarPanel;
  const user = auth?.user;

  if (!solarPanel || !user) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event: React.FormEvent<EditSolarPanelFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;

    if (!formElements) {
      console.error("Form elements are not defined.");
      return;
    }

    const companyID = user?.companyID;
    const userID = user?._id;
    const dateCreated = new Date();
    const installationLocation = formElements.installationLocation?.value || '';
    const agroProduction = formElements.agroProduction?.value || '';
    const energyConsumption = formElements.energyConsumption?.value || '';
    const consumptionPattern = formElements.consumptionPattern?.value || '';
    const monthlyEnergyCost = Number(formElements.monthlyEnergyCost?.value) || 0;
    const primaryEnergySource = formElements.primaryEnergySource?.value || '';
    const visitAvailability = new Date(formElements.visitAvailability?.value || '');
    const contactPreference = formElements.contactPreference?.value || '';
    const availableSpace = formElements.availableSpace?.value || '';
    const ceilingType = formElements.ceilingType?.value || '';
    const climateCondition = formElements.climateCondition?.value || '';
    const electricInfrastructure = formElements.electricInfrastructure?.value || '';
    const financingAvailability = formElements.financingAvailability?.value || '';
    const ROI = formElements.ROI?.value || '';
    const subsidies = formElements.subsidies?.value || '';
    const desiredInstallationTime = formElements.desiredInstallationTime?.value || '';
    const dueDate = formElements.dueDate?.value || '';
    const comments = formElements.comments?.value || '';

    try {
      toast.loading("Editing Solar Panel Information", { id: "editSolarPanel" });
      await auth?.solarPanelEdit(
        companyID,
        userID,
        dateCreated,
        installationLocation,
        agroProduction,
        energyConsumption,
        consumptionPattern,
        monthlyEnergyCost,
        primaryEnergySource,
        visitAvailability,
        contactPreference,
        availableSpace,
        ceilingType,
        climateCondition,
        electricInfrastructure,
        financingAvailability,
        ROI,
        subsidies,
        desiredInstallationTime,
        dueDate,
        comments
      );
      toast.success("Solar Panel Information Updated Successfully", { id: "editSolarPanel" });
    } catch (error) {
      console.error("Error updating solar panel:", error);
      if (error instanceof Error) {
        toast.error(`Failed to Update Solar Panel Information: ${error.message}`, { id: "editSolarPanel" });
      } else {
        toast.error("Failed to Update Solar Panel Information", { id: "editSolarPanel" });
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
                    Formulario Fotovoltaico
                  </Link>
                </Breadcrumbs>
                <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                  Formulario Fotovoltaico
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
                    Formulario sobre Paneles Solares
                  </Typography>
                  <Typography level="body-sm">
                    Al llenar este formulario nos estará proporcionando información esencial sobre la instalación de paneles solares en su compañía.
                  </Typography>
                </Box>
                <Divider />
                <Stack spacing={4} sx={{ my: 1 }}>
                  <Box>
                    <Typography level="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Información General
                    </Typography>
                    <Card variant="outlined">
                      <Stack spacing={2}>
                      <FormControl>
                        <FormLabel>
                          Ubicación de la instalación
                          <QuestionTooltip 
                            question="Ubicación de la instalación"
                            context="Especifique el lugar donde se instalarán los paneles solares."
                          />
                        </FormLabel>
                        <Input 
                          size="sm" 
                          type="text" 
                          name="installationLocation" 
                          defaultValue={solarPanel?.installationLocation || ''} 
                          placeholder="p. ej. Techo de la fábrica" 
                        />
                      </FormControl>
                        <FormControl>
                          <FormLabel>Producción agrícola (si aplica)</FormLabel>
                          <Input size="sm" type="text" name="agroProduction" defaultValue={solarPanel?.agroProduction || ''} placeholder="p. ej. Cultivo de maíz" />
                        </FormControl>
                      </Stack>
                    </Card>
                  </Box>

                  <Box>
                    <Typography level="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Consumo Energético
                    </Typography>
                    <Card variant="outlined">
                      <Stack spacing={2}>
                        <FormControl>
                          <FormLabel>Consumo de energía</FormLabel>
                          <Input size="sm" type="text" name="energyConsumption" defaultValue={solarPanel?.energyConsumption || ''} placeholder="p. ej. 5000 kWh/mes" />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Patrón de consumo</FormLabel>
                          <Input size="sm" type="text" name="consumptionPattern" defaultValue={solarPanel?.consumptionPattern || ''} placeholder="p. ej. Diurno principalmente" />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Costo mensual de energía</FormLabel>
                          <Input size="sm" type="number" name="monthlyEnergyCost" defaultValue={solarPanel?.monthlyEnergyCost || ''} placeholder="p. ej. 1000" />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Fuente principal de energía actual</FormLabel>
                          <Input size="sm" type="text" name="primaryEnergySource" defaultValue={solarPanel?.primaryEnergySource || ''} placeholder="p. ej. Red eléctrica" />
                        </FormControl>
                      </Stack>
                    </Card>
                  </Box>

                  <Box>
                    <Typography level="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Detalles de la Instalación
                    </Typography>
                    <Card variant="outlined">
                      <Stack spacing={2}>
                        <FormControl>
                          <FormLabel>Disponibilidad para visita técnica</FormLabel>
                          <Input size="sm" type="date" name="visitAvailability" defaultValue={solarPanel?.visitAvailability ? new Date(solarPanel.visitAvailability).toISOString().split('T')[0] : ''} />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Preferencia de contacto</FormLabel>
                          <Input size="sm" type="text" name="contactPreference" defaultValue={solarPanel?.contactPreference || ''} placeholder="p. ej. Correo electrónico" />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Espacio disponible</FormLabel>
                          <Input size="sm" type="text" name="availableSpace" defaultValue={solarPanel?.availableSpace || ''} placeholder="p. ej. 100 m²" />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Tipo de techo</FormLabel>
                          <Input size="sm" type="text" name="ceilingType" defaultValue={solarPanel?.ceilingType || ''} placeholder="p. ej. Techo plano" />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Condición climática</FormLabel>
                          <Input size="sm" type="text" name="climateCondition" defaultValue={solarPanel?.climateCondition || ''} placeholder="p. ej. Soleado la mayor parte del año" />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Infraestructura eléctrica</FormLabel>
                          <Input size="sm" type="text" name="electricInfrastructure" defaultValue={solarPanel?.electricInfrastructure || ''} placeholder="p. ej. Transformador de 100 kVA" />
                        </FormControl>
                      </Stack>
                    </Card>
                  </Box>

                  <Box>
                    <Typography level="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Aspectos Financieros
                    </Typography>
                    <Card variant="outlined">
                      <Stack spacing={2}>
                        <FormControl>
                          <FormLabel>Disponibilidad de financiamiento</FormLabel>
                          <Input size="sm" type="text" name="financingAvailability" defaultValue={solarPanel?.financingAvailability || ''} placeholder="p. ej. Préstamo bancario disponible" />
                        </FormControl>
                        <FormControl>
                          <FormLabel>ROI esperado</FormLabel>
                          <Input size="sm" type="text" name="ROI" defaultValue={solarPanel?.ROI || ''} placeholder="p. ej. 5 años" />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Subsidios disponibles</FormLabel>
                          <Input size="sm" type="text" name="subsidies" defaultValue={solarPanel?.subsidies || ''} placeholder="p. ej. Incentivo fiscal del 30%" />
                        </FormControl>
                      </Stack>
                    </Card>
                  </Box>

                  <Box>
                    <Typography level="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Plazos
                    </Typography>
                    <Card variant="outlined">
                      <Stack spacing={2}>
                        <FormControl>
                          <FormLabel>Tiempo de instalación deseado</FormLabel>
                          <Input size="sm" type="text" name="desiredInstallationTime" defaultValue={solarPanel?.desiredInstallationTime || ''} placeholder="p. ej. 3 meses" />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Fecha límite</FormLabel>
                          <Input size="sm" type="date" name="dueDate" defaultValue={solarPanel?.dueDate || ''} />
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
                          <FormLabel>Comentarios</FormLabel>
                          <Textarea size="sm" name="comments" minRows={2} placeholder="Tus comentarios" defaultValue={solarPanel?.comments || ''} />
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