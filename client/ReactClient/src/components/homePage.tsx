import { useEffect, useState } from "react";
import Login from "./User/login";
import Register from "./User/register";
import { Button } from "@mui/material";
import Update from "./User/update";
import UserNameAvatar from "./User/userNameAvatar";

const HomePage=()=>{

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [succeed, setSucceed] = useState(false)
    // const LoginSucceed = () => setSucceed(true)  
    const IsToken=()=>{
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            console.log(isAuthenticated);            
        }
    }
      useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            console.log(isAuthenticated);            
        }
    }, []);
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setIsAuthenticated(false);
        console.log("hghghghghgh");
        
    };
return(<>
            {!isAuthenticated && <><Login succeedFunc={IsToken}/> <Register succeedFunc={IsToken}/></>}     
            {isAuthenticated &&<><Button sx={{ position: 'absolute', top: 50, left: 80 }} onClick={handleLogout}>Log out</Button><Update /></>}       
            {isAuthenticated&&<UserNameAvatar/>}
</>)
}
export default HomePage