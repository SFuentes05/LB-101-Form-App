import { Routes, Route, useLocation } from "react-router-dom";
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import { useState, useEffect } from 'react';
import LoadingSpinner from './assets/LoadingSpinner';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/useAuth";
import UserProfile from "./pages/user/UserProfile";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Calendar from "./pages/Calendar";
import UploadFiles from "./pages/UploadFiles";
import Company from "./pages/Company";
import SelectProduct from "./pages/SelectProduct";
import Infrastructure from "./pages/101/Infrastructure";
import SolarPanels from "./pages/101/SolarPanel";
import Welcome from "./pages/Welcome";
import Form from "./pages/101/Form";

function App() {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const isNotFoundPage = location.pathname === '*';

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100%', width: '100%'}}>
        {auth?.isLoggedIn && <Header />}
        {auth?.isLoggedIn && !isNotFoundPage && <Sidebar />}
        {auth?.isLoggedIn ? (
          <Box
            component="main"
            className="MainContent"
            sx={{
              px: { xs: 0, md: 0 },
              pt: {
                xs: 'calc(12px + var(--Header-height))',
                sm: 'calc(12px + var(--Header-height))',
                md: 0,
              },
              pb: { xs: 0, sm: 0, md: 0 },
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              minHeight: '100vh',
              overflow: 'auto',
              gap: 0,
            }}
          >
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/101-form/Form" element={<Form />} />
              <Route path="/101-form/BRinfrastructure" element={<Infrastructure />} />
              <Route path="/101-form/SolarPanels" element={<SolarPanels />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/uploadfile" element={<UploadFiles />} />
              <Route path="/user/myprofile" element={<UserProfile />} />
              <Route path="/company" element={<Company />} />
              <Route path="/proposal" element={<Company />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        ) : (
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/select-product" element={<SelectProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </Box>
    </CssVarsProvider>
  );
}

export default App;