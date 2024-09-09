import BoxHeader from "../../assets/BoxHeader";
import DashboardBox from "../../assets/DashboardBox";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Box, CircularProgress, LinearProgress, Typography } from "@mui/joy";
import { useAuth } from "../../context/AuthContext";
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const DesiredProductBox = () => {

    const auth = useAuth();
    const desiredProduct = auth?.desiredProduct;

  return (
    <>
      <DashboardBox gridArea="c">
      <Card sx={{ width: "100%", height: "100%", border: "none"}}>
      <div>
        <Typography level="title-lg">Producto Deseado</Typography>
        <Typography level="body-sm">{desiredProduct?.filledFields} de {desiredProduct?.totalFields} preguntas respondidas</Typography>
        <IconButton
          aria-label="add team member"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
          <GroupAddIcon />
        </IconButton>
      </div>
        <LinearProgress determinate value={desiredProduct?.progress} size="lg" color="success"/>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Progreso:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {desiredProduct?.progress}%
          </Typography>
        </div>
        <Button
          variant="solid"
          size="md"
          color="success"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
        >
          Ir al formulario
        </Button>
      </CardContent>
    </Card>
    </DashboardBox>
    </>
  );
};

export default DesiredProductBox;