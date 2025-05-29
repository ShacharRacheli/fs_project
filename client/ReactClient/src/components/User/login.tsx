// import { Box, Button, Modal, TextField } from "@mui/material"
// import axios from "axios";
// import { FormEvent, useRef, useState } from "react";

// const Login = ({ succeedFunc }: { succeedFunc: Function }) => {
//     const [open, setOpen] = useState(false);
//     // const [logIn, setLogIn] = useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     const emailRef = useRef<HTMLInputElement>(null);
//     const passwordRef = useRef<HTMLInputElement>(null);
//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post(`http://localhost:5070/api/User/login`, {
//                 Email: emailRef.current?.value,
//                 Password: passwordRef.current?.value,
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json', // Specify that the request body is JSON
//                     'Accept': 'application/json' // Indicate that you expect a JSON response
//                 }});
//             if (res.data && res.data.token) {
//                 sessionStorage.setItem('token', res.data.token);
//                 console.log('Token stored:', res.data.token); // Log the token being stored
//             } else {
//                 console.log('Token not found in response');
//             }
//             succeedFunc()
//             handleClose();
//         }
//         catch (e: any) {
//             console.log(e)
//             if((e.response&&e.response===401)||e.response===400){
//                 alert('email or password are not correct')
//             }
//         }
//     }
//     return (<>
//         <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
//             <Button onClick={handleOpen}>Login</Button>
//         </Box>
//         <Modal
//             open={open}
//             onClose={handleClose}
//         >
//             <Box sx={style}>
//                 <form onSubmit={handleSubmit}>
//                     <TextField type='email' fullWidth label="Email" variant="outlined" inputRef={emailRef} />
//                     <TextField type='password' fullWidth label='Password' variant="outlined" inputRef={passwordRef} />
//                     <Button fullWidth type='submit' sx={{ color: 'var(--secondary-color)' }}>Signin</Button>
//                 </form>
//             </Box>
//         </Modal>
//     </>)
// }
// export default Login


import { Visibility, VisibilityOff } from "@mui/icons-material";
import {  Button, Fade, IconButton, InputAdornment, Modal, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import {  object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import {useForm}from "react-hook-form"
const apiUrl = import.meta.env.VITE_APP_API_URL;

const schema = object({
    email: string().email('Invalid email format').required('Email is required'),
    password: string().min(5, 'Password must be at least 6 characters').required('Password is required'),
});
const Login = ({ succeedFunc, open, handleClose }: { succeedFunc: Function, open: boolean, handleClose: () => void }) => {
    // const emailRef = useRef<HTMLInputElement>(null);
    // const passwordRef = useRef<HTMLInputElement>(null);
    // const [emailError, setEmailError] = useState('');
    // const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit= async (data: { email: string; password: string })  => {
        // e.preventDefault();
        try {
            const res = await axios.post(`${apiUrl}/api/User/login`, {
            // const res = await axios.post(`http://localhost:5070/api/User/login`, {
                // Email: emailRef.current?.value,
                // Password: passwordRef.current?.value,
                Email: data.email,
                Password: data.password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (res.status===200&&res.data && res.data.token) {
                sessionStorage.setItem('token', res.data.token);
                succeedFunc(res.data.token); 
                // window.location.reload();
            }
            // succeedFunc();
            handleClose();
        } catch (e: any) {
            if ((e.response && e.response.status === 401) || e.response.status === 400) {
                alert('Email or password are not correct');
            }
        }
    }
  

    return (
        <Modal 
      open={open} 
      onClose={handleClose}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Fade in={open}>
        <Paper 
          elevation={10}
          sx={{
            width: '100%',
            maxWidth: 400,
            borderRadius: 2,
            p: 4,
            outline: 'none',
            background: 'linear-gradient(145deg, #ffffff 0%, #f9f4ff 100%)',
            boxShadow: '0 8px 32px rgba(100, 50, 200, 0.15)',
            border: '1px solid rgba(153, 102, 255, 0.1)',
          }}
        >
          <Typography 
            variant="h5" 
            component="h2" 
            align="center" 
            sx={{ 
              mb: 3, 
              fontWeight: 700, 
              color: '#5e35b1',
              textShadow: '0px 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            Welcome Back
          </Typography>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField 
              {...register('email')}
              type='email' 
              fullWidth 
              label="Email" 
              variant="outlined" 
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(153, 102, 255, 0.3)',
                    borderRadius: 1.5,
                  },
                  '&:hover fieldset': {
                    borderColor: '#7c4dff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6200ea',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#7e57c2',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#6200ea',
                }
              }} 
            />
            
            <TextField 
              type={showPassword ? 'text' : 'password'}
              fullWidth 
              {...register('password')}
              label='Password' 
              variant="outlined" 
              error={!!errors.password}
              helperText={errors.password?.message}           
              sx={{ 
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(153, 102, 255, 0.3)',
                    borderRadius: 1.5,
                  },
                  '&:hover fieldset': {
                    borderColor: '#7c4dff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6200ea',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#7e57c2',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#6200ea',
                }
              }}
              slotProps={{
                input:{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={togglePasswordVisibility}
                      edge="end"
                      sx={{ color: '#7e57c2' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),}
              }}
            />
            
            <Button 
              fullWidth 
              type='submit'
              variant="contained"
              disableElevation 
              sx={{ 
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                backgroundColor: 'purple', 
                color: 'white', 
                '&:hover': { 
                  backgroundColor: '#ba01cf',
                  boxShadow: '0 4px 12pxrgb(163, 3, 181)',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.2s ease-in-out'
              }} 
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Fade>
    </Modal>
/* <Modal open={open} onClose={handleClose}>
<Box sx={style}>
    <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          {...register('email')}
            type='email' 
            fullWidth 
            label="Email" 
            variant="outlined" 
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ marginBottom: 2 }} 
        />
        <TextField 
            type={showPassword ? 'text' : 'password'}
            fullWidth 
            {...register('password')}
            label='Password' 
            variant="outlined" 
            error={!!errors.password}
            helperText={errors.password?.message}           
            sx={{ marginBottom: 2 }} 
            slotProps={{
                input: {
                    endAdornment: (
                        <IconButton onClick={togglePasswordVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    ),
                },
            }}
        />
        <Button 
            fullWidth 
            type='submit' 
            sx={{ backgroundColor: 'purple', color: 'white', '&:hover': { backgroundColor: 'darkviolet' } }} // Purple button
        >
            Sign In
        </Button>
    </form>
</Box>
</Modal> */
);
}

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid purple', // Changed border color to purple
//     borderRadius: '8px', // Added border radius
//     boxShadow: 24,
//     p: 4,
// };
export default Login;


//         <Modal open={open} onClose={handleClose}>
//             <Box sx={style}>
//                 <form onSubmit={handleSubmit}>
//                     <TextField type='email' fullWidth label="Email" variant="outlined" inputRef={emailRef} />
//                     <TextField type='password' fullWidth label='Password' variant="outlined" inputRef={passwordRef} />
//                     <Button fullWidth type='submit'>Sign In</Button>
//                 </form>
//             </Box>
//         </Modal>
//     );
// }

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };