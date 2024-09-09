import DashboardBox from "../../assets/DashboardBox";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardCover from '@mui/joy/CardCover';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { Link } from "react-router-dom";

const PhotoBox = () => {
  return (
    <>
      <DashboardBox gridArea="e">
        <Link
          to="https://www.unido.org/news/la-onudi-y-el-fmam-apoyan-proyecto-en-la-repblica-dominicana-que-integra-inteligencia-artificial-por-primera-vez-en-una-planta-de-gasificacin-de-biomasa"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <Card 
            sx={{ 
              width: "100%", 
              height: "100%", 
              border: "none",
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardCover>
              <img
                src="/plantaAGF.jpg"
                srcSet="/plantaAGF.jpg 2x"
                loading="lazy"
                alt=""
              />
            </CardCover>
            <CardCover
              sx={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
              }}
            />
            <CardContent sx={{ justifyContent: 'flex-end' }}>
              <Typography level="title-lg" textColor="#fff">
                  La primera planta de gasificación de biomasa tipo downdraft que utiliza Inteligencia Artificial
              </Typography>
              <Typography
                startDecorator={<LocationOnRoundedIcon sx={{fill: "white"}}/>}
                textColor="white"
              >
                Santo Domingo, República Dominicana
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </DashboardBox>
    </>
  );
};

export default PhotoBox;