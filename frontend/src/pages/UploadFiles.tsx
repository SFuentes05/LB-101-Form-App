import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import FileUpload from '../assets/FileUpload';
import { Button, Card, CardActions, CardOverflow, Divider, Stack, Typography } from '@mui/joy';
import DropZone from '../assets/DropZone';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { VideocamRounded } from '@mui/icons-material';
import ArchitectureIcon from '@mui/icons-material/Architecture';

export default function UploadFiles() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Card>
            <Box sx={{ mb: 1 }}>
                <Typography level="title-md">Archivos</Typography>
                <Typography level="body-sm">
                Ayúdenos a comprender su proceso industrial e infraestructura actual subiendo archivos.
                </Typography>
            </Box>
            <Divider />
            <Stack spacing={2} sx={{ my: 1 }}>
                <DropZone />
                <FileUpload
                icon={<ArchitectureIcon />}
                fileName="plantaCCD2024.cad"
                fileSize="23 MB"
                progress={100}
                />
                <FileUpload
                icon={<PictureAsPdfIcon />}
                fileName="factura_mes_junio.pdf"
                fileSize="150 kb"
                progress={40}
                />
                <FileUpload
                icon={<VideocamRounded />}
                fileName="videoSuelosPlanta.mp4"
                fileSize="16 MB"
                progress={40}
                />
            </Stack>
            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                <Button size="sm" variant="outlined" color="neutral">
                    Cancel
                </Button>
                <Button size="sm" variant="solid">
                    Save
                </Button>
                </CardActions>
            </CardOverflow>
            </Card>
      </Box>
    </CssVarsProvider>
  );
}