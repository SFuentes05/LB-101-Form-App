import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { AspectRatio, Autocomplete, Breadcrumbs, Card, Divider, FormControl, FormLabel, Input, Link, Slider, Stack, Tab, tabClasses, TabList, Tabs, Textarea, Typography } from '@mui/joy';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CountrySelector from '../../assets/CountrySelector';
import { Link as RouterLink } from 'react-router-dom';

export default function Business() {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                    separator={<ChevronRightRoundedIcon fontSize='sm' />}
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
                      color="neutral"
                      href=""
                      fontSize={12}
                      fontWeight={500}
                    >
                      Formulario 101
                    </Link>
                    <Typography color="primary" fontWeight={500} fontSize={12}>
                      Negocio
                    </Typography>
                  </Breadcrumbs>
                  <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                    Negocio
                  </Typography>
                </Box>
                <Tabs
                  defaultValue={0}
                  sx={{
                    bgcolor: 'transparent',
                  }}
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
                    <Tab
                      sx={{ borderRadius: '6px 6px 0 0' }}
                      indicatorInset
                      value={0}
                      component={RouterLink}
                      to="/101-form/business"
                    >
                      Negocio
                    </Tab>
                    <Tab
                      sx={{ borderRadius: '6px 6px 0 0' }}
                      indicatorInset
                      value={1}
                      component={RouterLink}
                      to="/101-form/infrastructure"
                    >
                      Infraestructura
                    </Tab>
                    <Tab
                      sx={{ borderRadius: '6px 6px 0 0' }}
                      indicatorInset
                      value={2}
                      component={RouterLink}
                      to="/101-form/industrial-process"
                    >
                      Proceso industrial
                    </Tab>
                    <Tab
                      sx={{ borderRadius: '6px 6px 0 0' }}
                      indicatorInset
                      value={3}
                      component={RouterLink}
                      to="/101-form/desired-product"
                    >
                      Producto deseado
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
                <Card>
                  <Box sx={{ mb: 1 }}>
                    <Typography level="title-md">Información del prospecto</Typography>
                    <Typography level="body-sm">
                      Ayúdanos a servirte mejor proporcionándonos detalles adicionales sobre tu negocio
                    </Typography>
                  </Box>
                  <Divider />
                  <Stack
                    spacing={3}
                    sx={{ my: 1 }}
                  >
                    <FormControl>
                      <FormLabel htmlFor="date">Fecha de visita</FormLabel>
                      <Input type="date" className="date" name="Fecha"/>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="direccionComercial">Dirección comercial</FormLabel>
                      <Input name="direccionComercial" placeholder="p. ej. C. Ludovino Fernández 24, Santo Domingo"/>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="ubicacionPlantaIndustrial">Ubicación de la planta industrial</FormLabel>
                      <Input name="ubicacionPlantaIndustrial" placeholder="p. ej. Zona Industrial El Marqués, Avenida Principal, Edificio Planta Tech, Sto. Dgo., Rep. Dom." />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="alturaNivelMar">Altura sobre el nivel del mar de la futura planta</FormLabel>
                      <Input name="alturaSobreNivelDelMar" type="number" placeholder="p. ej. 450 metros"/>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="CUIT/RNC/TaxID">CUIT / RNC / Tax ID</FormLabel>
                      <Input name="CUIT/RNC/TaxID" type="number" placeholder="p. ej. 30-12345678-9"/>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="contactoPrincipal">Contacto principal de referencia para esta evaluación</FormLabel>
                      <Input name="contactoPrincipal" placeholder="p. ej. Axel Almonte" />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="phone">Número de teléfono</FormLabel>
                      <Input name="contactoPrincipal" type="number" placeholder="p. ej. +1 809 567 8901"/>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                      <Input name="nTelefono" type="email" placeholder="p. ej. nombreapellido@gmail.com"/>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="paginaWebEmpresa">Página web de la empresa</FormLabel>
                      <Input name="email" type="text" placeholder="p. ej. latambioenergy.com"/>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="description">Proceso donde se produce el residuo</FormLabel>
                      <Textarea name="desProcesoResiduo" minRows={2} placeholder="p. ej. Breve descripción del proceso donde se produce el residuo" size="md"/>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="paisesDondeExporta">¿A qué países exporta?</FormLabel>
                      <Autocomplete name="paisesDondeExporta" multiple options={["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor (Timor-Leste)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]} />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="porcentajeExportaciones">¿Qué porcentaje de sus operaciones son de exportación?</FormLabel>
                      <Slider name="porcentajeExportaciones"  valueLabelDisplay="auto" defaultValue={50} color="success" />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="comentarioNegocio">¿Algún comentario que le gustaría compartirnos?</FormLabel>
                      <Textarea name="negocioComentario" minRows={2} placeholder="Tu comentario" size="md"/>
                    </FormControl>
                  </Stack>
                </Card>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
