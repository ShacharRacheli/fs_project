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
// export default Login


import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";

const Login = ({ succeedFunc, open, handleClose }: { succeedFunc: Function, open: boolean, handleClose: () => void }) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        // Basic validation
        // if (!email || !/\S+@\S+\.\S+/.test(email)) {
        //     setEmailError('Please enter a valid email address.');
        //     return;
        // }
        // if (!password || password.length < 6) {
        //     setPasswordError('Password must be at least 6 characters long.');
        //     return;
        // }
        try {
            const res = await axios.post(`http://localhost:5070/api/User/login`, {
                Email: emailRef.current?.value,
                Password: passwordRef.current?.value,
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
            if ((e.response && e.response.status === 401) || e.response.status === 400) {
                alert('Email or password are not correct');
            }
        }
    }
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
<Modal open={open} onClose={handleClose}>
<Box sx={style}>
    <form onSubmit={handleSubmit}>
        <TextField 
            type='email' 
            fullWidth 
            label="Email" 
            variant="outlined" 
            required
            inputRef={emailRef} 
            error={!!emailError}
            helperText={emailError}
            sx={{ marginBottom: 2 }} // Space between inputs
        />
        <TextField 
            type={showPassword ? 'text' : 'password'}
            fullWidth 
            label='Password' 
            variant="outlined" 
            required
            inputRef={passwordRef} 
            error={!!passwordError}
            helperText={passwordError}
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
</Modal>
);
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid purple', // Changed border color to purple
    borderRadius: '8px', // Added border radius
    boxShadow: 24,
    p: 4,
};
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