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
import { Link } from 'react-router';
import Register from './User/register';
import Login from './User/login';
import { useEffect, useState } from 'react';
import UserNameAvatar from './User/userNameAvatar';
// import Update from './User/update';

const drawerWidth = 240;
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Challenges', path: '/allChallenges' },
  { name: 'Winners', path: '/winners' },
];

const NavBar = (props: any) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token,setToken]=useState<string|null>(sessionStorage.getItem('token'))
  useEffect(() => {
    // setToken(sessionStorage.getItem('token')||null)
    setIsLoggedIn(!!token); // אם יש טוקן, setIsLoggedIn ל-true
    console.log(isLoggedIn+"jdkjskjksjkjk");
    
  }, [token]);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLoginOpen = () => {
setLoginOpen(true);
console.log(isLoggedIn+"llllllllll");

  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleRegisterOpen = () => {
    setRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
// setIsLoggedIn()
  };
const  handleUpdateOpen=()=>{

}
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    setToken(null);
  };
  const handleLoginSuccess = (newToken: string) => {
    sessionStorage.setItem('token', newToken); // שמירת הטוקן ב-sessionStorage
    setToken(newToken); // עדכון הטוקן במצב
    // handleLoginClose(); // סגירת חלון הכניסה
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
      <AppBar component="nav" sx={{ width: '100%', background: "rgb(229, 244, 226)", borderRadius: 2 }}>
      <Toolbar>
  <IconButton
    color="inherit"
    aria-label="open drawer"
    edge="start"
    onClick={handleDrawerToggle}
    sx={{ mr: 2, display: { sm: 'none' } }}
  >
    <MenuIcon />
  </IconButton>
  <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
      {!isLoggedIn && (
        <>
          <Button onClick={handleLoginOpen} sx={{ color: 'black' }}>Login</Button>
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
        {/* תוכן נוסף כאן */}
      </Box>
      <Login succeedFunc={handleLoginSuccess} open={loginOpen} handleClose={handleLoginClose} />
      <Register succeedFunc={handleLoginSuccess} open={registerOpen} handleClose={handleRegisterClose} />
      {/* <Update handleClose={} /> */}
    </Box>
  );
};

export default NavBar;

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

