import React from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { CssVarsProvider, CssBaseline } from "@mui/joy";
import { useAuth } from "../context/AuthContext";
import ScheduleMeeting from './dashboard/ScheduleMeeting';
import MyCompany from './dashboard/MyCompany';
import Welcome from './dashboard/Welcome';
import InfrastructureBox from './dashboard/InfrastructureBox';
import FormBox from './dashboard/FormBox';
import SolarPanelBox from './dashboard/SolarPanelBox';
import PhotoBox from './dashboard/PhotoBox';

const Home: React.FC = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1000px)");

  const { user } = useAuth();

  const gridTemplateLargeScreens = `
    "i i e"
    "b b e"
    "a a h"
    "d d f"
  `;

  const gridTemplateSmallScreens = `
    "i"
    "i"
    "b"
    "b"
    "a"
    "a"
    "d"
    "d"
    "e"
    "e"
    "f"
    "f"
    "h"
    "h"
  `;

  return (
    <CssVarsProvider>
      <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden', padding: '1.5rem' }}>
          <Box width="100%" flexGrow={1} display="grid" gap="1rem"
            sx={
              isAboveMediumScreens ? {
                gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
                gridTemplateRows: "repeat(4, minmax(60px, 1fr))",
                gridTemplateAreas: gridTemplateLargeScreens,
                overflow: 'auto'
              } : { 
                gridAutoColumns: "1fr",
                gridAutoRows: "80px",
                gridTemplateAreas: gridTemplateSmallScreens,
                overflow: 'auto'
              }
            }
          >
            <InfrastructureBox />
            <ScheduleMeeting />
            <MyCompany />
            <PhotoBox />
            <FormBox />
            <SolarPanelBox />
            <Welcome />
          </Box>
        </Box>
    </CssVarsProvider>
  );
};

export default Home;