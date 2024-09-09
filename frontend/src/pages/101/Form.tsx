import React, { useEffect, useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Header from '../../components/Header';
import { Breadcrumbs, Card, Divider, FormControl, FormLabel, Stack, Typography, Button, Input, CardOverflow, CardActions, Textarea, Link, Select, Option, Modal, ModalDialog, ModalClose, ButtonGroup } from '@mui/joy';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';

interface FormElements extends HTMLFormControlsCollection {
  biomassType: HTMLInputElement;
  biomass: HTMLInputElement;
  annualProductionQuantity: HTMLInputElement;
  energyGenerationType: HTMLInputElement;
  annualOperatingHours: HTMLInputElement;
  thermalDemand: HTMLInputElement;
  fuelType: HTMLInputElement;
  fuelConsumption: HTMLInputElement;
  fuelMarketPrice: HTMLInputElement;
  boilerModel: HTMLInputElement;
  burnerPlate: HTMLInputElement;
  electricalDemand: HTMLInputElement;
  energyCost: HTMLInputElement;
  comments: HTMLInputElement;
}

interface EditFormFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function Form() {
  const auth = useAuth();
  const [openModal, setOpenModal] = React.useState(false);
  const [customBiomass, setCustomBiomass] = React.useState('');
  const [biomassValue, setBiomassValue] = React.useState(auth?.forms?.biomass || '');
  const [energyType, setEnergyType] = React.useState(auth?.forms?.energyGenerationType || '');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const form = auth?.forms;
  const user = auth?.user;

  useEffect(() => {
    if (form?.burnerPlate) {
      setPreviewUrl(form.burnerPlate);
    }
  }, [form?.burnerPlate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!form || !user) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event: React.FormEvent<EditFormFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
  
    if (!formElements) {
      console.error("Form elements are not defined.");
      return;
    }
  
    const companyID = user?.companyID;
    const userID = user?._id;
    const dateCreated = new Date();
    const biomassType = formElements.biomassType?.value || '';
    const biomass = biomassValue === 'other' ? customBiomass : biomassValue;
    const annualProductionQuantity = Number(formElements.annualProductionQuantity?.value) || 0;
    const energyGenerationType = energyType;
    const annualOperatingHours = Number(formElements.annualOperatingHours?.value) || 0;
    const thermalDemand = Number(formElements.thermalDemand?.value) || 0;
    const fuelType = formElements.fuelType?.value || '';
    const fuelConsumption = Number(formElements.fuelConsumption?.value) || 0;
    const fuelMarketPrice = Number(formElements.fuelMarketPrice?.value) || 0;
    const boilerModel = formElements.boilerModel?.value || '';
    const electricalDemand = Number(formElements.electricalDemand?.value) || 0;
    const energyCost = Number(formElements.energyCost?.value) || 0;
    const comments = formElements.comments?.value || '';
  
    let burnerPlate = '';
    const burnerPlateFile = formElements.burnerPlate?.files?.[0] ?? null;
    if (burnerPlateFile) {
      burnerPlate = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(burnerPlateFile);
      });
    }
  
    try {
      toast.loading("Editing Form Information", { id: "editForm" });
      await auth?.formEdit(
        companyID,
        userID,
        dateCreated,
        biomass,
        biomassType,
        annualProductionQuantity,
        energyGenerationType,
        thermalDemand,
        electricalDemand,
        annualOperatingHours,
        fuelType,
        fuelConsumption,
        fuelMarketPrice,
        boilerModel,
        burnerPlate,
        energyCost,
        comments
      );
      toast.success("Form Information Updated Successfully", { id: "editForm" });
    } catch (error) {
      console.error("Error updating form:", error);
      if (error instanceof Error) {
        toast.error(`Failed to Update Form Information: ${error.message}`, { id: "editForm" });
      } else {
        toast.error("Failed to Update Form Information", { id: "editForm" });
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
                    Formulario 101
                  </Link>
                </Breadcrumbs>
                <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                  Formulario 101
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
                    Formulario 101
                  </Typography>
                  <Typography level="body-sm">
                    Al llenar este formulario nos estará proporcionando información esencial sobre su compañía.
                  </Typography>
                </Box>
                <Divider />
                <Stack spacing={4} sx={{ my: 1 }}>
                  <Box>
                    <Typography level="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Información de Biomasa
                    </Typography>
                    <Card variant="outlined">
                      <Stack spacing={2}>
                        <FormControl>
                          <FormLabel>Qué biomasa tiene disponible?</FormLabel>
                          <Select
                            size="sm"
                            name="biomass"
                            value={biomassValue}
                            placeholder="Seleccione una opción"
                            onChange={(_, newValue) => {
                              setBiomassValue(newValue as string);
                              if (newValue === 'other') {
                                setOpenModal(true);
                              }
                            }}
                          >
                            <Option value="Jícara de Coco">Jícara de Coco</Option>
                            <Option value="Palm Kernel Shell (PKS)">Palm Kernel Shell (PKS)</Option>
                            <Option value="Cáscara de Almendra">Cáscara de Almendra</Option>
                            <Option value="Cáscara de Avellana">Cáscara de Avellana</Option>
                            <Option value="Orujo de Aceituna">Orujo de Aceituna</Option>
                            <Option value="Cáscara de pistacho">Cáscara de pistacho</Option>
                            <Option value="Acacia Mangium">Acacia Mangium</Option>
                            <Option value="Cáscara de castaña de cajú (Cajuil)">Cáscara de castaña de cajú (Cajuil)</Option>
                            <Option value="Cáscara de Macadamia">Cáscara de Macadamia</Option>
                            <Option value="Cáscara de Nuez">Cáscara de Nuez</Option>
                            <Option value="Nuez de Palma">Nuez de Palma</Option>
                            <Option value="Cascarilla de Café">Cascarilla de Café</Option>
                            <Option value="Cáscara de Maní">Cáscara de Maní</Option>
                            <Option value="Elephant Grass (EG) Fibra de Coco (Bonote)">Elephant Grass (EG)</Option>
                            <Option value="Fibra de Coco (Bonote)">Fibra de Coco (Bonote)</Option> 
                            <Option value="Tobacco Leaves">Tobacco Leaves</Option>
                            <Option value="Tobacco Stems">Tobacco Stems</Option>
                            <Option value="Tallo Maíz">Tallo Maíz</Option>
                            <Option value="Mazorca de Maíz">Mazorca de Maíz</Option>
                            <Option value="other">Otro</Option>
                          </Select>
                        </FormControl>
                        <FormControl>
                          <FormLabel>¿Cuánta biomasa producen anualmente? (en toneladas)</FormLabel>
                          <Input size="sm" type="number" name="annualProductionQuantity" defaultValue={form?.annualProductionQuantity || ''} placeholder="p. ej. 1365 toneladas" />
                        </FormControl>
                      </Stack>
                    </Card>
                  </Box>

                  <Box>
                    <Typography level="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Información Energética
                    </Typography>
                    <Card variant="outlined">
                      <Stack spacing={2}>
                        <FormControl>
                          <FormLabel>Está interesado en generar ahorros en la generación de:</FormLabel>
                          <ButtonGroup variant="outlined" sx={{ width: '100%' }}>
                            <Button
                              onClick={() => setEnergyType('Energía Térmica Vapor')}
                              variant={energyType === 'Energía Térmica Vapor' ? 'solid' : 'outlined'}
                              color={energyType === 'Energía Térmica Vapor' ? 'success' : 'neutral'}
                              sx={{ flex: 1 }}
                            >
                              Energía Térmica Vapor
                            </Button>
                            <Button
                              onClick={() => setEnergyType('Energía Eléctrica')}
                              variant={energyType === 'Energía Eléctrica' ? 'solid' : 'outlined'}
                              color={energyType === 'Energía Eléctrica' ? 'success' : 'neutral'}
                              sx={{ flex: 1 }}
                            >
                              Energía Eléctrica
                            </Button>
                          </ButtonGroup>
                        </FormControl>

                        {energyType === 'Energía Térmica Vapor' && (
                          <>
                            <FormControl>
                              <FormLabel>¿Cuál es su Demanda térmica MBTU/h?</FormLabel>
                              <Input size="sm" type="number" name="thermalDemand" defaultValue={form?.thermalDemand || ''} placeholder="p. ej. 500" />
                            </FormControl>
                            <FormControl>
                              <FormLabel>¿Cuántas horas de operación anual tiene?</FormLabel>
                              <Input size="sm" type="number" name="annualOperatingHours" defaultValue={form?.annualOperatingHours || ''} placeholder="p. ej. 8760" />
                            </FormControl>
                            <FormControl>
                              <FormLabel>¿Cuál es su tipo de combustible actual?</FormLabel>
                              <Input size="sm" type="text" name="fuelType" defaultValue={form?.fuelType || ''} placeholder="p. ej. Diésel" />
                            </FormControl>
                            <FormControl>
                              <FormLabel>¿Cuál es su consumo anual de combustible? (L/año)</FormLabel>
                              <Input size="sm" type="number" name="fuelConsumption" defaultValue={form?.fuelConsumption || ''} placeholder="p. ej. 10000" />
                            </FormControl>
                            <FormControl>
                              <FormLabel>¿Cuál es el precio de mercado del combustible? ($/L)</FormLabel>
                              <Input size="sm" type="number" name="fuelMarketPrice" defaultValue={form?.fuelMarketPrice || ''} placeholder="p. ej. 1.2" />
                            </FormControl>
                            <FormControl>
                              <FormLabel>¿Cuál es su modelo su caldera?</FormLabel>
                              <Input size="sm" type="text" name="boilerModel" defaultValue={form?.boilerModel || ''} placeholder="p. ej. Modelo XYZ" />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Por favor, suba una imagen de la placa de su caldera</FormLabel>
                              <Button
                                component="label"
                                role={undefined}
                                tabIndex={-1}
                                variant="outlined"
                                color="neutral"
                                startDecorator={
                                  <SvgIcon>
                                    <path d="M5 20h14v-2H5v2zm0-10h4v6h6v-6h4l-7-7-7 7z" />
                                  </SvgIcon>
                                }
                              >
                                Subir imagen
                                <VisuallyHiddenInput
                                  type="file"
                                  name="burnerPlate"
                                  onChange={handleFileChange}
                                  accept=".jpg, .jpeg, .png"
                                />
                              </Button>
                              {previewUrl && (
                                <Box mt={2}>
                                  <Typography level="body-sm" mb={1}>Vista previa de la imagen:</Typography>
                                  <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                </Box>
                              )}
                            </FormControl>
                          </>
                        )}

                        {energyType === 'Energía Eléctrica' && (
                          <>
                            <FormControl>
                              <FormLabel>¿Cuál es su demanda eléctrica? (kW)</FormLabel>
                              <Input size="sm" type="number" name="electricalDemand" defaultValue={form?.electricalDemand || ''} placeholder="p. ej. 200" />
                            </FormControl>
                            <FormControl>
                              <FormLabel>¿Cuántas horas de operación anual tiene?</FormLabel>
                              <Input size="sm" type="number" name="annualOperatingHours" defaultValue={form?.annualOperatingHours || ''} placeholder="p. ej. 8760" />
                            </FormControl>
                            <FormControl>
                              <FormLabel>¿Cuál es su costo de energía? ($/kWh)</FormLabel>
                              <Input size="sm" type="number" name="energyCost" defaultValue={form?.energyCost || ''} placeholder="p. ej. 0.15" />
                            </FormControl>
                          </>
                        )}
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
                          <Textarea size="sm" name="comments" minRows={2} placeholder="Tu comentario" defaultValue={form?.comments || ''} />
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

      {/* Add this Modal component at the end of your JSX, before the closing tags */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalDialog>
          <ModalClose />
          <Typography level="h4">Otro tipo de biomasa</Typography>
          <Input
            autoFocus
            placeholder="Ingrese el tipo de biomasa"
            value={customBiomass}
            onChange={(e) => setCustomBiomass(e.target.value)}
          />
          <Button
            onClick={() => {
              if (customBiomass) {
                setBiomassValue('other');
                setOpenModal(false);
              }
            }}
          >
            Confirmar          </Button>
        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  );
}