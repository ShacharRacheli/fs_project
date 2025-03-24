// // import { Box, Button, Modal, TextField } from "@mui/material"
// // import axios from "axios";
// // import { FormEvent, useRef, useState } from "react";
// // import { getEmailByToken, getUserIdByToken } from "../store/getFromToken";

// // const Update=()=>{
// //     const [open, setOpen] = useState(false);
// //     // const [logIn, setLogIn] = useState(false);
// //     const handleOpen = () => setOpen(true);
// //     const handleClose = () => setOpen(false);
// //     const emailRef = useRef<HTMLInputElement>(null);
// //     const fullNameRef = useRef<HTMLInputElement>(null);
// //     const handleSubmit = async (e: FormEvent) => {

// //         e.preventDefault();
// //        const userId=getUserIdByToken()
// //        console.log("in updateeeeeeeeeeeee");
// //        console.log(userId);

// //         try {
// //             const res = await axios.put(`http://localhost:5070/api/User/${+userId}`, {
// //                 Email: emailRef.current?.value||getEmailByToken(),
// //                 FullName: fullNameRef.current?.value,
// //             }, {
// //                 headers: {
// //                     'Content-Type': 'application/json', // Specify that the request body is JSON
// //                     'Accept': 'application/json' // Indicate that you expect a JSON response
// //                 }});
// //             if (res.data && res.data.token) {
// //                 sessionStorage.setItem('token', res.data.token);
// //                 console.log('Token stored:', res.data.token); // Log the token being stored
// //             } else {
// //                 console.log('Token not found in response');
// //             }

// //             handleClose();
// //         }
// //         catch (e: any) {
// //             console.log(e)
// //             if((e.response&&e.response===401)||e.response===400){
// //                 alert('email or password are not correct')
// //             }
// //         }
// //     }
// // return(<>

// // <Box sx={{ position: 'absolute', top: 10, left: 200 }}>
// //             <Button onClick={handleOpen}>Update</Button>
// //         </Box>
// //         <Modal
// //             open={open}
// //             onClose={handleClose}
// //         >
// //             <Box sx={style}>
// //                 <form onSubmit={handleSubmit}>
// //                     <TextField type='text' fullWidth label='FullName' variant="outlined" inputRef={fullNameRef} />
// //                     <TextField type='email' fullWidth label="Email" variant="outlined" inputRef={emailRef} />
// //                     <Button fullWidth type='submit' sx={{ color: 'var(--secondary-color)' }}>Update</Button>
// //                 </form>
// //             </Box>
// //         </Modal>
// // </>)
// // }
// // const style = {
// //     position: 'absolute',
// //     top: '50%',
// //     left: '50%',
// //     transform: 'translate(-50%, -50%)',
// //     width: 400,
// //     bgcolor: 'background.paper',
// //     border: '2px solid #000',
// //     boxShadow: 24,
// //     p: 4,
// // };
// // export default Update
import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { getEmailByToken, getUserIdByToken } from "../store/getFromToken";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {useForm}from "react-hook-form"
const apiUrl = import.meta.env.VITE_API_URL;

const schema = object({
    email: string().email('Invalid email format').required('Email is required'),
    fullName: string().min(5, 'Name must be at least 6 characters').required('Name is required'),
});
const Update = ({ succeedFunc, open, handleClose }: { succeedFunc: Function, open: boolean, handleClose: () => void }) => {
    // const emailRef = useRef<HTMLInputElement>(null);
    // const fullNameRef = useRef<HTMLInputElement>(null);
  const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data: { email: string;  fullName: string }) => {
        // e.preventDefault();
        const userId = getUserIdByToken();
        console.log("in updateeeeeeeeeeeee");
        console.log(userId);

        try {
            const res = await axios.put(`${apiUrl}/User/${userId}`, {
            // const res = await axios.put(`http://localhost:5070/api/User/${userId}`, {
                // Email: emailRef.current?.value || getEmailByToken(),
                // FullName: fullNameRef.current?.value,
                Email: data.email || getEmailByToken(),
                FullName: data.fullName,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (res.data && res.data.token) {
                sessionStorage.setItem('token', res.data.token);
                console.log('Token stored:', res.data.token);
                succeedFunc(res.data.token);
            } else {
                console.log('Token not found in response');
            }

            handleClose();
        } catch (e: any) {
            console.log(e);
            if ((e.response && e.response.status === 401) || e.response.status === 400) {
                alert('Email or password are not correct');
            }
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField 
                        {...register('fullName')}
                        type='text' fullWidth label='FullName'
                        variant="outlined"
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                        // inputRef={fullNameRef}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField type='email' fullWidth
                        label="Email"
                        {...register('email')}
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        // inputRef={emailRef}
                        sx={{ marginBottom: 2 }}
                    />
                    <Button fullWidth type='submit'sx={{ backgroundColor: 'purple', color: 'white', '&:hover': { backgroundColor: 'darkviolet' } }} // Purple button
                    >Update</Button>
                </form>
            </Box>
        </Modal>
    );
};

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

export default Update;
