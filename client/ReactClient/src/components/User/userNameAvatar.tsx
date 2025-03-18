import { Avatar, Box, Stack, Typography } from "@mui/material"
import { getUserNameByToken } from "../store/getFromToken";
// import React from "react";

const UserNameAvatar=()=>{

  const  userName=getUserNameByToken()
    function stringAvatar(name: string) {
        console.log(userName);
        
        return {
            sx: {
                bgcolor: 'rgb(4, 213, 151)',
            },
            children: `${name.split(' ')[0][0]}`,
        };
    }
return(<>
 <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
            <Stack direction="row" spacing={2}>
                <Avatar {...stringAvatar(userName)} />
                <Typography variant="h4">
                    Hi {userName}!
                </Typography>
                {/* <Button onClick={handleShowUpdate} sx={{ color: 'var(--secondary-color)' }} >Update details</Button>
                {showUpdate && <Update succeedUpdateFunc={handleCloseUpdate} />} */}
            </Stack>
        </Box>
</>)
}
export default UserNameAvatar