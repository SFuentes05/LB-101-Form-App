import React from "react";
import { Box, Typography, Button } from "@mui/joy";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <Box
        component="img"
        src="/placeholder-404.png"
        alt="404 No Encontrado"
        sx={{
          width: '100%',
          maxWidth: '400px',
          marginBottom: '2rem',
        }}
      />
      <Typography level="h2" component="h1" sx={{ marginBottom: '1rem' }}>
        ¡Ups! Página No Encontrada
      </Typography>
      <Typography level="body-lg" sx={{ marginBottom: '2rem' }}>
        La página que estás buscando no existe o ha sido movida.
      </Typography>
      <Button component={Link} to="/home" variant="solid" color="primary">
        Ir al Inicio
      </Button>
    </Box>
  );
};

export default NotFound;