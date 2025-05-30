import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router';
import Register from './User/register';
import Login from './User/login';
import { useEffect, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import Update from './User/update';
import { getUserNameByToken } from './store/getFromToken';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { Edit } from '@mui/icons-material';

const drawerWidth = 240;
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Challenges', path: '/allChallenges' },
  { name: 'Winners', path: '/winners' },
];
const buttonStyles = () => ({
  color: 'white', 
  fontWeight: 'bold', 
  fontSize: '17px',
  backgroundColor: 'transparent', 
  '&:hover': {
    backgroundColor: 'transparent', 
    color: 'purple', 
  },
});

const NavBar = (props: any) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('token'))
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userName, setUserName] = useState(getUserNameByToken())
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!token);
    setUserName(getUserNameByToken())
  }, [token, userName]);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleRegisterOpen = () => {
    setRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };
  const handleUpdateOpen = () => {
    setUpdateOpen(true)
  }
  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    setToken(null);
    navigate('/');
  };
  const handleLoginSuccess = (newToken: string) => {
    sessionStorage.setItem('token', newToken); 
    setToken(newToken); 
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        My App
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton component={Link} to={item.path} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ width: '100%', background: "rgb(0, 0, 0)", borderRadius: 2 ,margin:0}}>
        <Toolbar sx={{ padding: 0 }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: "rgb(255, 255, 255)" }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {isLoggedIn ? (
                <>
                  <Button
                    aria-controls="menu--account"
                    aria-label={userName}
                    aria-expanded="false"
                    onClick={handleMenu}
                    variant="text" 
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 15px',
                      ...buttonStyles()
                    }}
                  >
                    {userName}
                    <ArrowDropDownIcon sx={{ color: 'white' }} />
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{
                      "& .MuiPaper-root": {
                        marginTop: "7px",
                        marginRight: "10px",
                        backgroundColor: "white",
                        color: "black", 
                        border: "2px solid purple",
                        borderRadius: "8px", 
                        padding: "10px",
                        width: "320px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      },
                      "& .MuiTypography-root": {
                        fontSize: "18px",
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: "8px",
                        fontFamily: "Plus Jakarta Sans, Arial, Helvetica, sans-serif",
                      },
                      "& .MuiTypography-subtitle1": {
                        fontSize: "13px",
                        textAlign: "center",
                        color: "#BBB",
                        marginTop: "4px",
                        fontFamily: "Plus Jakarta Sans, Arial, Helvetica, sans-serif",
                      },
                    }}
                  >                  
                    <Typography variant="h6">Profile</Typography>
                    <Typography variant="subtitle1">
                      Your profile helps improve your interactions with select.
                    </Typography>
                    <MenuItem onClick={handleUpdateOpen} >Update Profile <Edit sx={{ marginLeft: "8px", fontSize: "19px" }} />
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      Logout <ExitToApp sx={{ marginLeft: "8px", fontSize: "20px" }} />
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button onClick={handleLoginOpen} sx={buttonStyles()}>
                    Login
                  </Button>
                  <Button onClick={handleRegisterOpen} sx={buttonStyles()}>
                    Sign Up
                  </Button>
                </>
              )}
              </Box>
              <img src='/pickapic2.png' style={{ height: '80px' }} />
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end', gap: 2 }}>
                {navItems.map((item) => (
                  <Button key={item.name} component={Link} to={item.path} sx={buttonStyles()}>
                    {item.name}
                  </Button>
                ))}
              </Box>
            </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
      <Login succeedFunc={handleLoginSuccess} open={loginOpen} handleClose={handleLoginClose} />
      <Register succeedFunc={handleLoginSuccess} open={registerOpen} handleClose={handleRegisterClose} />
      <Update succeedFunc={handleLoginSuccess} open={updateOpen} handleClose={handleUpdateClose} />
    </Box>
</>
  );
};
export default NavBar;