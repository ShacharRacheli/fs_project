import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { useEffect } from "react";
import { getChallenges } from "../redux/challengeSlice";
import { Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router";

const AllChallenges=()=>{
const dispatch=useDispatch<AppDispatch>();
const challengesList=useSelector((state:RootState)=>state.challenges.list);
const navigate = useNavigate();


useEffect(()=>{
    dispatch(getChallenges());
    console.log(challengesList.values);
    
},[]);


const handleNavigate = (challengeId:number) => {
    navigate(`${challengeId}`); // Adjust the path as needed
};
return(<>
        <Typography variant="h4" sx={{ margin: 2 }}>
                Challenges List
            </Typography>
            <List>
                {Array.isArray(challengesList) && challengesList.length > 0 ? (
                    challengesList.map((challenge) => (
                        <ListItem key={challenge.id}> {/* Ensure this ID is unique */}
                            <ListItemText primary={challenge.title} secondary={challenge.description} />
                            <Button 
                                variant="contained" 
                                onClick={() => handleNavigate(challenge.id)}
                                sx={{ marginLeft: 2 }} // Add some spacing
                            >
                                View Challenge
                            </Button>
                        </ListItem>
                    ))
                ) : (
                    <Typography sx={{ padding: 2 }}>No challenges available.</Typography>
                )}
            </List>
            <Box>
            <Outlet/>
            </Box>

</>)
}
export default AllChallenges