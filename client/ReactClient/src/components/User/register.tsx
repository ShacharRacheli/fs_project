// import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
// import axios from "axios";
// import { FormEvent, useRef, useState } from "react";

// const Register=({ succeedFunc }: { succeedFunc: Function })=>{
//     const [error, setError] = useState('');

//     const [open, setOpen] = useState(false);
//     // const [logIn, setLogIn] = useState(false);
//     // const [role, setRole] = useState('');
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     const emailRef = useRef<HTMLInputElement>(null);
//     const passwordRef = useRef<HTMLInputElement>(null);
//     const fullNameRef=useRef<HTMLInputElement>(null)
//     // const roleRef=useRef<string>('')

//     const validateForm = () => {
//         const email = emailRef.current?.value;
//         const password = passwordRef.current?.value;
//         const fullName = fullNameRef.current?.value;

//         if (!email || !password || !fullName ) {
//             setError('All fields are required.');
//             return false;
//         }

//         // Additional email format validation can be added here if needed
//         // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         // if (!emailPattern.test(email)) {
//         //     setError('Please enter a valid email address.');
//         //     return false;
//         // }

//         setError(''); // Clear error if validation passes
//         return true;
//     };

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post(`http://localhost:5070/api/User/register`, {
//                 FullName: fullNameRef.current?.value,
//                 Password: passwordRef.current?.value,
//                 Email: emailRef.current?.value,
//                 // Role: roleRef.current,
//                 // Role: role,
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json', // Specify that the request body is JSON
//                     'Accept': 'application/json' // Indicate that you expect a JSON response
//                 }});
//             sessionStorage.setItem('testKey', 'testValue');
// console.log(sessionStorage.getItem('testKey')); // Should log 'testValue'

//             console.log("tttttttttttt");
//             console.log(res);
//             console.log("tttttttttttt");
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
//                 alert('email already exist')
//             } else {
//                 alert('An unexpected error occurred. Please try again later.');
//             }
//         }
//     }

//    return(<>
//    <Box sx={{ position: 'absolute', top: 10, left: 100 }}>
//             <Button onClick={handleOpen}>Sign up</Button>
//         </Box>
//         <Modal
//             open={open}
//             onClose={handleClose}
//         >
//             <Box sx={style}>
//                 <form onSubmit={handleSubmit}>
//                     <TextField type='email' fullWidth label="Email" variant="outlined" inputRef={emailRef}  required
//                             error={!!error} />
//                     <TextField type='password' fullWidth label='Password' variant="outlined" inputRef={passwordRef}  required
//                             error={!!error}/>
//                     <TextField type='text' fullWidth label='FullName' variant="outlined" inputRef={fullNameRef} required
//                             error={!!error} />                                      
//                  <Button fullWidth type='submit' sx={{ color: 'var(--secondary-color)' }}>send</Button>
//                 </form>
//             </Box>
//         </Modal>
//     </>)
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


// export default Register

import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {  Button, Fade, IconButton, InputAdornment, Modal, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { object, string } from "yup";
import {useForm}from "react-hook-form"
const apiUrl = import.meta.env.VITE_APP_API_URL;

const schema = object({
    email: string().email('Invalid email format').required('Email is required'),
    password: string().min(5, 'Password must be at least 6 characters').required('Password is required'),
    fullName: string().min(5, 'Name must be at least 6 characters').required('Name is required'),
});
const Register = ({ succeedFunc, open, handleClose }: { succeedFunc: Function, open: boolean, handleClose: () => void }) => {
    // const emailRef = useRef<HTMLInputElement>(null);
    // const passwordRef = useRef<HTMLInputElement>(null);
    // const fullNameRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: { email: string; password: string; fullName: string }) => {
        // e.preventDefault();

        try {
            const res = await axios.post(`${apiUrl}/api/User/register`, {
            // const res = await axios.post(`http://localhost:5070/api/User/register`, {
                // FullName: fullNameRef.current?.value,
                // Password: passwordRef.current?.value,
                // Email: emailRef.current?.value,
                FullName: data.fullName,
                Password: data.password,
                Email: data.email,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (res.data && res.data.token) {
                sessionStorage.setItem('token', res.data.token);
                succeedFunc(res.data.token);
            }
            // succeedFunc();
            handleClose();
        } catch (e: any) {
            if ((e.response && e.response.status === 400)) {
                alert('Email already exists');
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
        Create an Account
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
          slotProps={{
            input: {
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
              ),
            },
          }}
        />
        
        <TextField 
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          type='text' 
          fullWidth 
          label='Full Name' 
          variant="outlined" 
          {...register('fullName')}
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
              boxShadow: '0 4px 12px rgb(163, 3, 181)',
              transform: 'translateY(-1px)'
            },
            transition: 'all 0.2s ease-in-out'
          }} 
        >
          Sign Up
        </Button>
      </form>
    </Paper>
  </Fade>
</Modal>
    
        // <Modal open={open} onClose={handleClose}>
        //     <Box sx={style}>
        //         <form onSubmit={handleSubmit(onSubmit)}>
        //             <TextField
        //                 {...register('email')}
        //                 type='email'
        //                 fullWidth 
        //                 label="Email"
        //                 variant="outlined"
        //                 // inputRef={emailRef}
        //                 // required       
        //                 error={!!errors.email}
        //                 helperText={errors.email?.message}
        //                 sx={{ marginBottom: 2 }}
        //             />
        //             <TextField type='password' fullWidth label='Password' variant="outlined" 
        //             // inputRef={passwordRef}
        //                 {...register('password')}
        //                 // required
        //                 error={!!errors.password}
        //                 helperText={errors.password?.message}
        //                 sx={{ marginBottom: 2 }}
        //                 slotProps={{
        //                     input: {
        //                         endAdornment: (
        //                             <IconButton onClick={togglePasswordVisibility}>
        //                                 {showPassword ? <VisibilityOff /> : <Visibility />}
        //                             </IconButton>
        //                         ),
        //                     },
        //                 }} />
        //             <TextField
        //                 error={!!errors.fullName}
        //                 helperText={errors.fullName?.message}
        //                 type='text' fullWidth label='Full Name' variant="outlined" 
        //                 // inputRef={fullNameRef}
        //                 {...register('fullName')}
        //                 //  required 
        //                 sx={{ marginBottom: 2 }}
        //             />
        //             <Button fullWidth type='submit' sx={{ backgroundColor: 'purple', color: 'white', '&:hover': { backgroundColor: 'darkviolet' } }} // Purple button
        //             >Sign Up</Button>
        //         </form>
        //     </Box>
        // </Modal>
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

export default Register;
