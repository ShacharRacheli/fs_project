// // import { AppBar, Box,  Toolbar } from "@mui/material"
// // import { Link } from "react-router"
// // const NavBar=()=>{

// // return(<>
// //   <AppBar
// //       position="fixed"
// //       sx={{
// //         top: 5,
// //         right: 5,
// //         width: "auto",
// //         background: "linear-gradient(90deg,rgb(88, 242, 183),rgb(243, 96, 196))", // מעבר צבעים
// //         borderRadius: 2,
// //       }}
// //     >
// //       <Toolbar sx={{ padding: "0 10px" }}>
// //         <Box sx={{ display: "flex", gap: 2 }}>
// //           <Link to='/' style={{ color: 'rgb(0, 0, 0)', margin: '0 10px' }}>Home</Link> |
// //           <Link to='/allChallenges' style={{ color: 'rgb(0, 0, 0)', margin: '0 10px' }}>Challenges</Link>|
// //           <Link to='/winners' style={{ color: 'rgb(0, 0, 0)', margin: '0 10px' }}>Winners</Link>
// //         </Box>
// //       </Toolbar>
// //     </AppBar>
// // </>)
// // }
// // export default NavBar





// ////==============================
// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { Link } from 'react-router'; // ודא שאתה משתמש ב-react-router-dom

// const drawerWidth = 240;
// const navItems = [
//   { name: 'Home', path: '/' },
//   { name: 'Challenges', path: '/allChallenges' },
//   { name: 'Winners', path: '/winners' },
// ];

// const NavBar = (props: any) => {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen((prevState) => !prevState);
//   };

//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
//       <Typography variant="h6" sx={{ my: 2 }}>
//         My App
//       </Typography>
//       <Divider />
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item.name} disablePadding>
//             <ListItemButton component={Link} to={item.path} sx={{ textAlign: 'center' }}>
//               <ListItemText primary={item.name} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar  component="nav" sx={{width:'80%', background: "rgb(229, 244, 226)", borderRadius: 2 }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography  variant="h6" component="div" sx={{color:'black', flexGrow: 1 }}>
//             My App
//           </Typography>
//           <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//             {navItems.map((item) => (
//               <Button key={item.name} component={Link} to={item.path} sx={{ color: 'black' }}>
//                 {item.name}
//               </Button>
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <nav>
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true,
//           }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </nav>
//       <Box component="main" sx={{ p: 3 }}>
//         <Toolbar />
//         {/* תוכן נוסף כאן */}
//       </Box>
//     </Box>
//   );
// };

// export default NavBar;
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
// import Update from './User/update';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExitToApp from '@mui/icons-material/ExitToApp';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { Edit } from '@mui/icons-material';
const drawerWidth = 240;
const navItems = [
  { name: 'Home', path: '/home' },
  { name: 'Challenges', path: '/allChallenges' },
  { name: 'Winners', path: '/winners' },
];
const buttonStyles = () => ({
  color: 'white', // Default text color
  fontWeight: 'bold', // Make text bold
  fontSize: '17px',
  backgroundColor: 'transparent', // Ensure background is transparent by default
  '&:hover': {
    backgroundColor: 'transparent', // Keep background transparent on hover
    color: 'purple', // Change text color to purple on hover
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

  // const userName=getUserIdByToken()
  useEffect(() => {
    // setToken(sessionStorage.getItem('token')||null)
    setIsLoggedIn(!!token); // אם יש טוקן, setIsLoggedIn ל-true
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
    navigate('/home');
  };
  const handleLoginSuccess = (newToken: string) => {
    sessionStorage.setItem('token', newToken); // שמירת הטוקן ב-sessionStorage
    setToken(newToken); // עדכון הטוקן במצב
    // handleLoginClose(); // סגירת חלון הכניסה
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ width: '100%', background: "rgb(0, 0, 0)", borderRadius: 2 }}>
        <Toolbar>
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
                    variant="text" // או "contained" לפי הצורך
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
                    // id="menu-appbar"
                    // anchorEl={anchorEl}
                    // anchorOrigin={{
                    //   vertical: 'bottom',
                    //   horizontal: 'right',
                    // }}
                    // keepMounted
                    // transformOrigin={{
                    //   vertical: 'top',
                    //   horizontal: 'right',
                    // }}
                    // open={Boolean(anchorEl)}
                    // onClose={handleClose}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{
                      "& .MuiPaper-root": {
                        marginTop: "7px",
                        marginRight: "10px",
                        backgroundColor: "white", // רקע לבן
                        color: "black", // צבע טקסט שחור
                        border: "2px solid purple", // מסגרת סגולה
                        borderRadius: "8px", // רדיוס פינות
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
                    {/* <MenuItem onClick={handleUpdateOpen} >Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </> */}
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
              <img src='./pickapic2.png' style={{ height: '80px' }} />
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
  );
};

export default NavBar;
{/* <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
         
            <Box sx={{ display: { xs: 'none', sm: 'block' }, justifyContent: 'flex-end', gap: 2 }}>
              {navItems.map((item) => (
                <Button key={item.name} component={Link} to={item.path} sx={{ color: 'white', '&:hover': { color: 'purple' }, '&:active': { color: 'purple' } }}>
                  {item.name}
                </Button>
              ))}
            <Typography variant="h6" component="div" sx={{ color: 'white', textAlign: 'center' }}>
              My App
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
            {isLoggedIn && (
                <>
                  <Button
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    {userName}
                  </Button>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleUpdateOpen}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <Button
                    onClick={handleLoginOpen}
                    sx={{ color: "rgb(255, 255, 255)", '&:hover': { color: 'purple' }, '&:active': { color: 'purple' } }}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={handleRegisterOpen}
                    sx={{ color: "rgb(255, 255, 255)", '&:hover': { color: 'purple' }, '&:active': { color: 'purple' } }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
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
    </Box> */}
{/* {!isLoggedIn && (
                <>
                  <Button
                    onClick={handleLoginOpen}
                    sx={{ color: "rgb(255, 255, 255)", '&:hover': { color: 'purple' }, '&:active': { color: 'purple' } }}   
                  >
                    Login
                  </Button>
                  <Button
                    onClick={handleRegisterOpen}
                    sx={{ color: "rgb(255, 255, 255)", '&:hover': { color: 'purple' }, '&:active': { color: 'purple' } }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Button
                    onClick={handleLogout}
                    sx={{ left: 80, color: "rgb(255, 255, 255)", '&:hover': { color: 'purple' }, '&:active': { color: 'purple' } }} // צבע סגול בעת רחיפה ולחיצה
                  >
                    Logout
                  </Button>
                  <UserNameAvatar />
                </>
              )}*/}
{/* <AppBar component="nav" sx={{ width: '100%', background: "rgb(0, 0, 0)", borderRadius: 2 }}>
      <Toolbar>
  <IconButton
   
    aria-label="open drawer"
    edge="start"
    onClick={handleDrawerToggle}
    sx={{ mr: 2, display: { sm: 'none' } , color:"rgb(255, 255, 255)"}}
  >
    <MenuIcon />
  </IconButton>
  <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
      {!isLoggedIn && (
        <>
          <Button onClick={handleLoginOpen} sx={{ color: "rgb(255, 255, 255)" }}>Login</Button>
          <Button onClick={handleRegisterOpen} sx={{ color: 'black' }}>Sign Up</Button>
        </>
      )}
      {isLoggedIn && (
        <>
          <Button onClick={handleLogout} sx={{ color: 'black' ,left:'100px'}}>Logout</Button>
          <UserNameAvatar />
        </>
      )}
    </Box>
    <Typography variant="h6" component="div" sx={{ color: 'black', textAlign: 'center' }}>
      My App
    </Typography>
    <Box sx={{ display: { xs: 'none', sm: 'block' }, justifyContent: 'flex-end' }}>
      {navItems.map((item) => (
        <Button key={item.name} component={Link} to={item.path} sx={{ color: 'black' }}>
          {item.name}
        </Button>
      ))}
    </Box>
  </Box>
</Toolbar>

      </AppBar> */}
// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { Link } from 'react-router';
// import Login from './User/login';
// import Register from './User/register';

// const drawerWidth = 240;
// const navItems = [
//   { name: 'Home', path: '/' },
//   { name: 'Challenges', path: '/allChallenges' },
//   { name: 'Winners', path: '/winners' },
// ];

// const NavBar = (props: any) => {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const [loginOpen, setLoginOpen] = React.useState(false);
//   const [registerOpen, setRegisterOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen((prevState) => !prevState);
//   };

//   const handleLoginOpen = () => {
//     setLoginOpen(true);
//   };

//   const handleLoginClose = () => {
//     setLoginOpen(false);
//   };

//   const handleRegisterOpen = () => {
//     setRegisterOpen(true);
//   };

//   const handleRegisterClose = () => {
//     setRegisterOpen(false);
//   };

//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
//       <Typography variant="h6" sx={{ my: 2 }}>
//         My App
//       </Typography>
//       <Divider />
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item.name} disablePadding>
//             <ListItemButton component={Link} to={item.path} sx={{ textAlign: 'center' }}>
//               <ListItemText primary={item.name} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar component="nav" sx={{ width: '80%', background: "rgb(229, 244, 226)", borderRadius: 2 }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ color: 'black', flexGrow: 1 }}>
//             My App
//           </Typography>
//           <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//             {navItems.map((item) => (
//               <Button key={item.name} component={Link} to={item.path} sx={{ color: 'black' }}>
//                 {item.name}
//               </Button>
//             ))}
//             <Button onClick={handleLoginOpen} sx={{ color: 'black' }}>Login</Button>
//             <Button onClick={handleRegisterOpen} sx={{ color: 'black' }}>Sign Up</Button>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <nav>
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true,
//           }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </nav>
//       <Box component="main" sx={{ p: 3 }}>
//         <Toolbar />
//         {/* תוכן נוסף כאן */}
//       </Box>
//       <Login succeedFunc={handleLoginClose} open={loginOpen} handleClose={handleLoginClose} />
//       <Register succeedFunc={handleRegisterClose} open={registerOpen} handleClose={handleRegisterClose} />
//     </Box>
//   );
// };

// export default NavBar;

