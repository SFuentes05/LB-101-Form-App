import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Header from '../components/Header';
import { Autocomplete, Breadcrumbs, Card, Divider, FormControl, FormLabel, Input, Link, Slider, Stack, Textarea, Typography } from '@mui/joy';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Button from '@mui/joy/Button';
import toast from 'react-hot-toast';
import { useAuth } from '../context/useAuth';

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  desiredProduct: HTMLInputElement;
  commercialAddress: HTMLInputElement;
  plantAddress: HTMLInputElement;
  seaLevel: HTMLInputElement;
  taxID: HTMLInputElement;
  webURL: HTMLInputElement;
  processDescription: HTMLTextAreaElement;
  countriesExport: HTMLInputElement;
  exportPercentage: HTMLInputElement;
  comments: HTMLTextAreaElement;
}

interface EditCompanyFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Company = () => {
  const auth = useAuth();
  const company = auth?.company;
  const user = auth?.user;

  if (!company || !user) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  const handleSubmit = async (event: React.FormEvent<EditCompanyFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;

    const userID = user?._id;
    const dateCreated = new Date();
    const name = formElements.name.value;
    const desiredProduct = formElements.desiredProduct.value.split(',');
    const commercialAddress = formElements.commercialAddress.value;
    const plantAddress = formElements.plantAddress.value;
    const seaLevel = formElements.seaLevel.value;
    const taxID = formElements.taxID.value;
    const webURL = formElements.webURL.value;
    const processDescription = formElements.processDescription.value;
    const countriesExport = formElements.countriesExport.value.split(',');
    const exportPercentage = Number(formElements.exportPercentage.value);
    const comments = formElements.comments.value;

    try {
      toast.loading("Editing Company Information", { id: "editCompany" });
      await auth?.companyEdit(
        userID,
        dateCreated,
        name,
        desiredProduct,
        commercialAddress,
        plantAddress,
        seaLevel,
        taxID,
        webURL,
        processDescription,
        countriesExport,
        exportPercentage,
        comments
      );
      toast.success("Company Information Updated Successfully", { id: "editCompany" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to Update Company Information", { id: "editCompany" });
    }
  };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column'}}>
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
          <Box sx={{ flex: 1, width: '100%'}}>
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
                  <Typography color="primary" fontWeight={500} fontSize={12}>
                    Compañía
                  </Typography>
                </Breadcrumbs>
                <Typography level="h2" component="h1" sx={{ mt: 1}}>
                  Compañía
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
                  <Typography level="title-md">Información sobre su compañía</Typography>
                  <Typography level="body-sm">
                    Ayúdanos a servirte mejor proporcionándonos detalles adicionales sobre tu compañía.
                  </Typography>
                </Box>
                <Divider />
                <Stack spacing={3} sx={{ my: 1 }}>
                  <FormControl sx={{ padding: "10px"}}>
                    <FormLabel htmlFor="name">Nombre de la compañía</FormLabel>
                    <Input name="name" defaultValue={company?.name} placeholder="p. ej. Latam Bioenergy" />
                  </FormControl>
                  <FormControl sx={{ padding: "10px"}}>
                    <FormLabel htmlFor="desiredProduct">Producto/s deseado/s</FormLabel>
                    <Autocomplete name="desiredProduct" multiple options={["Biorrefinería", "BioChar", "Paneles Solares"]} defaultValue={company?.desiredProduct} />
                  </FormControl>
                  <FormControl sx={{ padding: "10px"}}>
                    <FormLabel htmlFor="commercialAddress">Dirección comercial</FormLabel>
                    <Input name="commercialAddress" defaultValue={company?.commercialAddress} placeholder="p. ej. C. Ludovino Fernández 24, Santo Domingo" />
                  </FormControl>
                  <FormControl sx={{ padding: "10px"}}>
                    <FormLabel htmlFor="plantAddress">Dirección de la planta</FormLabel>
                    <Input name="plantAddress" defaultValue={company?.plantAddress} placeholder="p. ej. Zona Industrial El Marqués, Avenida Principal, Edificio Planta Tech, Sto. Dgo., Rep. Dom." />
                  </FormControl>
                  <FormControl sx={{ padding: "10px"}}>
                    <FormLabel htmlFor="seaLevel">Altura sobre el nivel del mar de la futura planta</FormLabel>
                    <Input name="seaLevel" type="number" defaultValue={company?.seaLevel} placeholder="p. ej. 450 metros" />
                  </FormControl>
                  <FormControl sx={{ padding: "10px"}}>
                    <FormLabel htmlFor="taxID">CUIT / RNC / Tax ID</FormLabel>
                    <Input name="taxID" type="number" defaultValue={company?.taxID} placeholder="p. ej. 30-12345678-9" />
                  </FormControl>
                  <FormControl sx={{ padding: "10px"}}>
                    <FormLabel htmlFor="webURL">Página web de la empresa</FormLabel>
                    <Input name="webURL" type="text" defaultValue={company?.webURL} placeholder="p. ej. latambioenergy.com" />
                  </FormControl>
                  <FormControl sx={{ padding: "10px"}}>
                    <FormLabel htmlFor="processDescription">Descripción del proceso de residuo</FormLabel>
                    <Textarea name="processDescription" minRows={2} defaultValue={company?.processDescription} placeholder="p. ej. Breve descripción del proceso donde se produce el residuo" size="md" />
                  </FormControl>
                  <FormControl sx={{ padding: "10px"}}>
                    <FormLabel htmlFor="countriesExport">¿A qué países exporta?</FormLabel>
                    <Autocomplete name="countriesExport" multiple options={["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor (Timor-Leste)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]} defaultValue={company?.countriesExport} />
                  </FormControl>
                  <FormControl sx={{ padding: "10px"}}>
                    <FormLabel htmlFor="exportPercentage">¿Qué porcentaje de sus operaciones son de exportación?</FormLabel>
                    <Slider name="exportPercentage" valueLabelDisplay="auto" defaultValue={company?.exportPercentage || 0} color="success" />
                  </FormControl>
                  <FormControl sx={{ padding: "10px"}}>
                    <FormLabel htmlFor="comments">¿Algún comentario que le gustaría compartirnos?</FormLabel>
                    <Textarea name="comments" minRows={2} defaultValue={company?.comments} placeholder="Tu comentario" size="md" />
                  </FormControl>
                  <Box sx={{ paddingTop: "10px", paddingLeft: "10px"}}>
                    <Button type="submit" color='success'>Subir</Button>
                  </Box>
                </Stack>
              </Card>
            </Stack>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default Company;
