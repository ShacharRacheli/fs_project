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

import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";

const Register = ({ succeedFunc, open, handleClose }: { succeedFunc: Function, open: boolean, handleClose: () => void }) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const fullNameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:5070/api/User/register`, {
                FullName: fullNameRef.current?.value,
                Password: passwordRef.current?.value,
                Email: emailRef.current?.value,
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
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField type='email' fullWidth label="Email" variant="outlined" inputRef={emailRef} />
                    <TextField type='password' fullWidth label='Password' variant="outlined" inputRef={passwordRef} />
                    <TextField type='text' fullWidth label='Full Name' variant="outlined" inputRef={fullNameRef} />
                    <Button fullWidth type='submit'>Sign Up</Button>
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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default Register;
