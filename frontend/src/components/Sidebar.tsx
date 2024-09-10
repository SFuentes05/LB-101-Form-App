import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BusinessIcon from '@mui/icons-material/Business';
import FactoryIcon from '@mui/icons-material/Factory';
import SolarPowerIcon from '@mui/icons-material/SolarPower';

import { closeSidebar } from '../utils';
import { useAuth } from '../context/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {

  const { user, logout } = useAuth() ?? {};
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (logout) {
      logout();
      navigate('/');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={closeSidebar}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton variant="soft" size="sm">
          <img src="/LlamaLatam.png" style={{ width: '24px', height: '24px' }} alt="Logo" />
        </IconButton>
        <Typography level="title-lg">LatAm BioEnergy</Typography>
      </Box>
      <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Buscar" />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton selected={isActive('/home')} component="a" href="/home">
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" sx={{ textAlign: 'left' }}>Inicio</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <FactoryIcon/>
                  <ListItemContent>
                    <Typography level="title-sm" sx={{ textAlign: 'left' }}>Formulario 101 Biorrefinería</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem>
                  <ListItemButton selected={isActive('/101-form/form')} component="a" href="/101-form/form">Formulario 101</ListItemButton>
                </ListItem>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton selected={isActive('/101-form/infrastructure')} component="a" href="/101-form/BRinfrastructure">Infraestructura</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <ListItem>
                <ListItemButton component="a" href="/101-form/SolarPanels">
                  <SolarPowerIcon />
                  <ListItemContent>
                    <Typography level="title-sm" sx={{ textAlign: 'left' }} >Formulario 101 Fotovoltaico</Typography>
                  </ListItemContent>
                </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton selected={isActive('/calendar')} component="a" href="/calendar">
              <CalendarMonthIcon />
              <ListItemContent>
                <Typography level="title-sm" sx={{ textAlign: 'left' }}>Reuniones</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton selected={isActive('/company')} component="a" href="/company">
              <BusinessIcon />
              <ListItemContent>
                <Typography level="title-sm" sx={{ textAlign: 'left' }}>Compañía</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm" sx={{ textAlign: 'left' }}>Usuarios</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton selected={isActive('/user/myprofile')} component="a" href="/user/myprofile">
                    Mi perfil
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        </List>

        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://www.cross-court.com/assets/missing-profile-image-7239fb75.jpg"
          alt="Profile"
        />
        <Box sx={{
          minWidth: 0,
          flex: 1,
          overflow: 'hidden',
        }}>
          <Typography level="title-sm" sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
            textAlign: 'left',
          }}>
            {user?.firstName}
          </Typography>
          <Typography level="body-xs" sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
            textAlign: 'left',
          }}>
            {user?.email}
          </Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="danger" onClick={handleLogout}>
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}