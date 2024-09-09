import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import { typographyClasses } from '@mui/joy/Typography';

export default function TwoSidedLayout({
  children,
  reversed,
}: React.PropsWithChildren<{ reversed?: boolean }>) {
  return (
    <Container
      sx={(theme) => ({
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: reversed ? 'column-reverse' : 'column',
        alignItems: 'center',
        py: 10,
        gap: 4,
        [theme.breakpoints.up(834)]: {
          flexDirection: 'row',
          gap: 6,
        },
        [theme.breakpoints.up(1199)]: {
          gap: 12,
        },
      })}
    >
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          maxWidth: '50ch',
          textAlign: 'center',
          flexShrink: 999,
          [theme.breakpoints.up(834)]: {
            minWidth: 420,
            alignItems: 'flex-start',
            textAlign: 'initial',
          },
          [`& .${typographyClasses.root}`]: {
            textWrap: 'balance',
          },
        })}
      >
        {children}
      </Box>
      <AspectRatio
        ratio={600 / 520}
        variant="outlined"
        maxHeight={300}
        sx={(theme) => ({
          minWidth: 300,
          alignSelf: 'stretch',
          [theme.breakpoints.up(834)]: {
            alignSelf: 'initial',
            flexGrow: 1,
            '--AspectRatio-maxHeight': '520px',
            '--AspectRatio-minHeight': '400px',
          },
          borderRadius: 'sm',
          bgcolor: 'background.level2',
          flexBasis: '50%',
        })}
      >
        <img src="/BiomassToElectricity.webp" alt="" />
      </AspectRatio>
      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
          position: 'absolute',
          bottom: 0,
          height: '60px',
          whiteSpace: 'nowrap',
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            animation: 'scrollLeft 30s linear infinite',
            '@keyframes scrollLeft': {
              '0%': {
                transform: 'translateX(0)',
              },
              '100%': {
                transform: 'translateX(-50%)',
              },
            },
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
            }}
          >
            <img src="/logoLatamBioenergy.png" alt="Logo Latam Bioenergy" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/1erLugarLatamDigital.png" alt="1er Lugar Latam Digital" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/LogoConep.png" alt="Logo Conep" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/Dominicana.webp" alt="Dominicana" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/Empresas-Sostenibles.png" alt="Empresas Sostenibles" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/gef30years.jpg" alt="GEF 30 Years" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/GrupoUniversal.png" alt="Grupo Universal" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/PNUD.png" alt="PNUD" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/Santander.webp" alt="Santander" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/UNIDO.png" alt="UNIDO" style={{ padding: '0 20px', height: '40px' }} />
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
            }}
          >
            <img src="/logoLatamBioenergy.png" alt="Logo Latam Bioenergy" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/1erLugarLatamDigital.png" alt="1er Lugar Latam Digital" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/LogoConep.png" alt="Logo Conep" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/Dominicana.webp" alt="Dominicana" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/Empresas-Sostenibles.png" alt="Empresas Sostenibles" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/gef30years.jpg" alt="GEF 30 Years" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/GrupoUniversal.png" alt="Grupo Universal" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/PNUD.png" alt="PNUD" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/Santander.webp" alt="Santander" style={{ padding: '0 20px', height: '40px' }} />
            <img src="/Logos/UNIDO.png" alt="UNIDO" style={{ padding: '0 20px', height: '40px' }} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
