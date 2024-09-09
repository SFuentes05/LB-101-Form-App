import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Header from '../../components/Header';
import { Breadcrumbs, Card, Divider, FormControl, FormLabel, Stack, Typography, Button, Input, Textarea, Link } from '@mui/joy';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

interface FormElements extends HTMLFormControlsCollection {
  electricity: HTMLInputElement;
  thermalEnergy: HTMLInputElement;
  coGeneration: HTMLInputElement;
  warmWater: HTMLInputElement;
  warmAir: HTMLInputElement;
  requiredUptime: HTMLInputElement;
  comments: HTMLInputElement;
}

interface EditDesiredProductFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function DesiredProduct() {
  const auth = useAuth();
  const desiredProduct = auth?.desiredProduct;
  const user = auth?.user;

  if (!desiredProduct || !user) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  const handleSubmit = async (event: React.FormEvent<EditDesiredProductFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;

    if (!formElements) {
      console.error("Form elements are not defined.");
      return;
    }

    const userID = user?._id;
    const dateCreated = new Date();
    const electricity = formElements.electricity?.value || '';
    const thermalEnergy = formElements.thermalEnergy?.value || '';
    const coGeneration = formElements.coGeneration?.value || '';
    const warmWater = formElements.warmWater?.value || '';
    const warmAir = formElements.warmAir?.value || '';
    const requiredUptime = formElements.requiredUptime?.value || '';
    const comments = formElements.comments?.value || '';

    try {
      toast.loading("Editing Desired Product Information", { id: "editDesiredProduct" });
      await auth?.desiredProductEdit(
        userID,
        dateCreated,
        electricity,
        thermalEnergy,
        coGeneration,
        warmWater,
        warmAir,
        requiredUptime,
        comments
      );
      toast.success("Desired Product Information Updated Successfully", { id: "editDesiredProduct" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to Update Desired Product Information", { id: "editDesiredProduct" });
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
                  separator={<ChevronRightRoundedIcon fontSize="small" />} // Corrected fontSize
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
                    Formulario 101 Producto Deseado
                  </Link>
                </Breadcrumbs>
                <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                  Producto Final Deseado
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
                  <Typography level="title-md">Producto Final Deseado</Typography>
                  <Typography level="body-sm">
                    Llene este formulario para que conozcamos más sobre el producto final del proyecto propuesto.
                  </Typography>
                </Box>
                <Divider />
                <Stack spacing={3} sx={{ my: 1 }}>
                  <FormControl>
                    <FormLabel htmlFor="electricity">Electricidad (kWh)</FormLabel>
                    <Input type="number" name="electricity" defaultValue={desiredProduct?.electricity || ''} placeholder="p. ej. _" />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="thermalEnergy">Energía térmica</FormLabel>
                    <Input type="number" name="thermalEnergy" defaultValue={desiredProduct?.thermalEnergy || ''} placeholder="p. ej. _" />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="coGeneration">Co-Generación</FormLabel>
                    <Input type="text" name="coGeneration" defaultValue={desiredProduct?.coGeneration || ''} placeholder="p. ej. _" />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="warmWater">Agua Caliente</FormLabel>
                    <Input type="text" name="warmWater" defaultValue={desiredProduct?.warmWater || ''} placeholder="p. ej. _" />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="warmAir">Aire Caliente</FormLabel>
                    <Input type="text" name="warmAir" defaultValue={desiredProduct?.warmAir || ''} placeholder="p. ej. _" />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="requiredUptime">Uptime requerido (Hrs/año)</FormLabel>
                    <Input type="number" name="requiredUptime" defaultValue={desiredProduct?.requiredUptime || ''} placeholder="p. ej. _" />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="comments">¿Algún comentario que le gustaría compartirnos?</FormLabel>
                    <Textarea name="comments" minRows={2} placeholder="Tu comentario" size="md" defaultValue={desiredProduct?.comments || ''} />
                  </FormControl>
                  <Button type="submit">Subir</Button>
                </Stack>
              </Card>
            </Stack>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
