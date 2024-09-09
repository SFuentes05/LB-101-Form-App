import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Header from '../../components/Header';
import { Breadcrumbs, Card, Divider, FormControl, FormLabel, Stack, Typography, Button, Input, CardOverflow, CardActions, Textarea, Link } from '@mui/joy';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

interface FormElements extends HTMLFormControlsCollection {
  produceAmount: HTMLInputElement;
  residueInventory: HTMLInputElement;
  relativeHumidity: HTMLInputElement;
  density: HTMLInputElement;
  treatmentMethod: HTMLInputElement;
  residueSupply: HTMLInputElement;
  residueDisposition: HTMLInputElement;
  electricityConsumption: HTMLInputElement;
  operationHours: HTMLInputElement;
  frequency: HTMLInputElement;
  voltage: HTMLInputElement;
  energyCost: HTMLInputElement;
  energyPrice: HTMLInputElement;
  powerPrice: HTMLInputElement;
  transformerCapacity: HTMLInputElement;
  PPACounterpart: HTMLInputElement;
  fuelType: HTMLInputElement;
  fuelConsumption: HTMLInputElement;
  fuelConsumptionPeriod: HTMLInputElement;
  thermalInstallation: HTMLInputElement;
  thermalEnergyDemand: HTMLInputElement;
  energyThermalPeriod: HTMLInputElement;
  steamPressure: HTMLInputElement;
  fuelPrice: HTMLInputElement;
  fuelThermalConsumption: HTMLInputElement;
  comments: HTMLInputElement;
}

interface EditIndustrialProcessFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function IndustrialProcess() {
  const auth = useAuth();
  const industrialProcess = auth?.industrialProcess;
  const user = auth?.user;

  if (!industrialProcess || !user) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event: React.FormEvent<EditIndustrialProcessFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;

    const userID = user?._id;
    const dateCreated = new Date();
    const produceAmount = parseFloat(formElements.produceAmount?.value || '0');
    const residueInventory = parseFloat(formElements.residueInventory?.value || '0');
    const relativeHumidity = parseFloat(formElements.relativeHumidity?.value || '0');
    const density = parseFloat(formElements.density?.value || '0');
    const treatmentMethod = formElements.treatmentMethod?.value || '';
    const residueSupply = formElements.residueSupply?.value || '';
    const residueDisposition = formElements.residueDisposition?.value || '';
    const electricityConsumption = parseFloat(formElements.electricityConsumption?.value || '0');
    const operationHours = parseFloat(formElements.operationHours?.value || '0');
    const frequency = formElements.frequency?.value || '';
    const voltage = parseFloat(formElements.voltage?.value || '0');
    const energyCost = parseFloat(formElements.energyCost?.value || '0');
    const energyPrice = parseFloat(formElements.energyPrice?.value || '0');
    const powerPrice = parseFloat(formElements.powerPrice?.value || '0');
    const transformerCapacity = parseFloat(formElements.transformerCapacity?.value || '0');
    const PPACounterpart = formElements.PPACounterpart?.value || '';
    const fuelType = formElements.fuelType?.value || '';
    const fuelConsumption = parseFloat(formElements.fuelConsumption?.value || '0');
    const fuelConsumptionPeriod = formElements.fuelConsumptionPeriod?.value || '';
    const thermalInstallation = parseFloat(formElements.thermalInstallation?.value || '0');
    const thermalEnergyDemand = parseFloat(formElements.thermalEnergyDemand?.value || '0');
    const energyThermalPeriod = formElements.energyThermalPeriod?.value || '';
    const steamPressure = parseFloat(formElements.steamPressure?.value || '0');
    const fuelPrice = parseFloat(formElements.fuelPrice?.value || '0');
    const fuelThermalConsumption = parseFloat(formElements.fuelThermalConsumption?.value || '0');
    const comments = formElements.comments?.value || '';

    try {
      toast.loading("Editing Industrial Process Information", { id: "editIndustrialProcess" });
      await auth?.industrialProcessEdit(
        userID,
        dateCreated,
        produceAmount,
        residueInventory,
        relativeHumidity,
        density,
        treatmentMethod,
        residueSupply,
        residueDisposition,
        electricityConsumption,
        operationHours,
        frequency,
        voltage,
        energyCost,
        energyPrice,
        powerPrice,
        transformerCapacity,
        PPACounterpart,
        fuelType,
        fuelConsumption,
        fuelConsumptionPeriod,
        thermalInstallation,
        thermalEnergyDemand,
        energyThermalPeriod,
        steamPressure,
        fuelPrice,
        fuelThermalConsumption,
        comments
      );
      toast.success("Industrial Process Information Updated Successfully", { id: "editIndustrialProcess" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to Update Industrial Process Information", { id: "editIndustrialProcess" });
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
                    Formulario 101 Proceso Industrial
                  </Link>
                </Breadcrumbs>
                <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                  Formulario Proceso Industrial
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
                  <Typography level="title-md">Formulario sobre Proceso Industrial</Typography>
                  <Typography level="body-sm">
                    Al llenar este formulario nos estará proporcionando información esencial sobre el proceso industrial de su compañía.
                  </Typography>
                </Box>
                <Divider />
                <Stack spacing={3} sx={{ my: 1 }}>
                  <Stack spacing={2} sx={{ flexGrow: 1, width: '100%' }}>
                    <Typography level="title-md">Producción y Residuos</Typography>
                    <Divider />
                    <Stack spacing={1}>
                      <FormControl>
                        <FormLabel>Cantidad Producida</FormLabel>
                        <Input size="sm" type="number" name="produceAmount" defaultValue={industrialProcess?.produceAmount || 0} placeholder="p. ej. 1000" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Inventario de Residuos</FormLabel>
                        <Input size="sm" type="number" name="residueInventory" defaultValue={industrialProcess?.residueInventory || 0} placeholder="p. ej. 200" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Humedad Relativa</FormLabel>
                        <Input size="sm" type="number" name="relativeHumidity" defaultValue={industrialProcess?.relativeHumidity || 0} placeholder="p. ej. 50" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Densidad</FormLabel>
                        <Input size="sm" type="number" name="density" defaultValue={industrialProcess?.density || 0} placeholder="p. ej. 1.2" />
                      </FormControl>
                    </Stack>

                    <Typography level="title-md" sx={{ mt: 2 }}>Métodos y Suministros</Typography>
                    <Divider />
                    <Stack spacing={1}>
                      <FormControl>
                        <FormLabel>Método de Tratamiento</FormLabel>
                        <Input size="sm" type="text" name="treatmentMethod" defaultValue={industrialProcess?.treatmentMethod || ''} placeholder="p. ej. Tratamiento Químico" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Suministro de Residuos</FormLabel>
                        <Input size="sm" type="text" name="residueSupply" defaultValue={industrialProcess?.residueSupply || ''} placeholder="p. ej. 500 kg/día" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Disposición de Residuos</FormLabel>
                        <Input size="sm" type="text" name="residueDisposition" defaultValue={industrialProcess?.residueDisposition || ''} placeholder="p. ej. Incineración" />
                      </FormControl>
                    </Stack>

                    <Typography level="title-md" sx={{ mt: 2 }}>Consumo de Energía</Typography>
                    <Divider />
                    <Stack spacing={1}>
                      <FormControl>
                        <FormLabel>Consumo Eléctrico</FormLabel>
                        <Input size="sm" type="number" name="electricityConsumption" defaultValue={industrialProcess?.electricityConsumption || 0} placeholder="p. ej. 1500 kWh" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Horas de Operación</FormLabel>
                        <Input size="sm" type="number" name="operationHours" defaultValue={industrialProcess?.operationHours || 0} placeholder="p. ej. 24" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Frecuencia</FormLabel>
                        <Input size="sm" type="text" name="frequency" defaultValue={industrialProcess?.frequency || ''} placeholder="p. ej. 60 Hz" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Voltaje</FormLabel>
                        <Input size="sm" type="number" name="voltage" defaultValue={industrialProcess?.voltage || 0} placeholder="p. ej. 220 V" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Costo Energético</FormLabel>
                        <Input size="sm" type="number" name="energyCost" defaultValue={industrialProcess?.energyCost || 0} placeholder="p. ej. 0.12 USD/kWh" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Precio Energético</FormLabel>
                        <Input size="sm" type="number" name="energyPrice" defaultValue={industrialProcess?.energyPrice || 0} placeholder="p. ej. 100 USD" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Precio de Potencia</FormLabel>
                        <Input size="sm" type="number" name="powerPrice" defaultValue={industrialProcess?.powerPrice || 0} placeholder="p. ej. 50 USD/kW" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Capacidad del Transformador</FormLabel>
                        <Input size="sm" type="number" name="transformerCapacity" defaultValue={industrialProcess?.transformerCapacity || 0} placeholder="p. ej. 500 kVA" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Contraparte PPA</FormLabel>
                        <Input size="sm" type="text" name="PPACounterpart" defaultValue={industrialProcess?.PPACounterpart || ''} placeholder="p. ej. Empresa XYZ" />
                      </FormControl>
                    </Stack>

                    <Typography level="title-md" sx={{ mt: 2 }}>Consumo de Combustible</Typography>
                    <Divider />
                    <Stack spacing={1}>
                      <FormControl>
                        <FormLabel>Tipo de Combustible</FormLabel>
                        <Input size="sm" type="text" name="fuelType" defaultValue={industrialProcess?.fuelType || ''} placeholder="p. ej. Gas Natural" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Consumo de Combustible</FormLabel>
                        <Input size="sm" type="number" name="fuelConsumption" defaultValue={industrialProcess?.fuelConsumption || 0} placeholder="p. ej. 1000 L/día" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Período de Consumo</FormLabel>
                        <Input size="sm" type="text" name="fuelConsumptionPeriod" defaultValue={industrialProcess?.fuelConsumptionPeriod || ''} placeholder="p. ej. Diario" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Instalación Térmica</FormLabel>
                        <Input size="sm" type="number" name="thermalInstallation" defaultValue={industrialProcess?.thermalInstallation || 0} placeholder="p. ej. 2000 kW" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Demanda de Energía Térmica</FormLabel>
                        <Input size="sm" type="number" name="thermalEnergyDemand" defaultValue={industrialProcess?.thermalEnergyDemand || 0} placeholder="p. ej. 1500 kW" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Período de Energía Térmica</FormLabel>
                        <Input size="sm" type="text" name="energyThermalPeriod" defaultValue={industrialProcess?.energyThermalPeriod || ''} placeholder="p. ej. Semanal" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Presión del Vapor</FormLabel>
                        <Input size="sm" type="number" name="steamPressure" defaultValue={industrialProcess?.steamPressure || 0} placeholder="p. ej. 10 bar" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Precio del Combustible</FormLabel>
                        <Input size="sm" type="number" name="fuelPrice" defaultValue={industrialProcess?.fuelPrice || 0} placeholder="p. ej. 1 USD/L" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Consumo Térmico de Combustible</FormLabel>
                        <Input size="sm" type="number" name="fuelThermalConsumption" defaultValue={industrialProcess?.fuelThermalConsumption || 0} placeholder="p. ej. 5000 kW" />
                      </FormControl>
                    </Stack>

                    <Typography level="title-md" sx={{ mt: 2 }}>Comentarios Adicionales</Typography>
                    <Divider />
                    <Stack spacing={1}>
                      <FormControl>
                        <FormLabel>Comentarios</FormLabel>
                        <Textarea size="sm" name="comments" minRows={2} placeholder="Tu comentario" defaultValue={industrialProcess?.comments || ''} />
                      </FormControl>
                    </Stack>

                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2 }}>
                      <CardActions sx={{ alignSelf: 'flex-end' }}>
                        <Button size="sm" variant="outlined" color="neutral">Cancelar</Button>
                        <Button size="sm" variant="solid" color="success" type="submit">Subir</Button>
                      </CardActions>
                    </CardOverflow>
                  </Stack>
                </Stack>
              </Card>
            </Stack>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
