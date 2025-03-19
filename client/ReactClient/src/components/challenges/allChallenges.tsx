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
    
},[dispatch]);

const handleNavigate = (challengeId: number) => {
    navigate(`/allChallenges/${challengeId}`); 
};

return(<>
        {/* <Typography variant="h4" sx={{ margin: 2 }}>
                Challenges List
            </Typography>
            <List>
                {Array.isArray(challengesList) && challengesList.length > 0 ? (
                    challengesList.map((challenge) => (
                        <ListItem key={challenge.id}> 
                            <ListItemText primary={challenge.title} secondary={challenge.description} />
                            <Button 
                                variant="contained" 
                                onClick={() => handleNavigate(challenge.id)}
                                sx={{ marginLeft: 2 }} 
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
            </Box> */}
<Typography variant="h4" sx={{ margin: 2 }}>
                Challenges List
            </Typography>
            <List>
                {Array.isArray(challengesList) && challengesList.length > 0 ? (
                    challengesList.map((challenge) => (
                        <ListItem 
                            key={challenge.id} 
                            sx={{ 
                                padding: 2,
                                borderBottom: '1px solid #ccc', // גבול תחתון
                                display: 'flex',
                                alignItems: 'center',
                                opacity: challenge.status ? 1 : 0.5 // שקיפות לאתגרים לא פעילים
                            }}
                        >
                            <ListItemText 
                                primary={challenge.title} 
                                secondary={challenge.description} 
                                sx={{ 
                                    color: challenge.status ? 'black' : 'gray' // צבע טקסט שונה
                                }} 
                            />
                            <Button 
                                variant="contained" 
                                onClick={() => handleNavigate(challenge.id)}
                                sx={{ 
                                    marginLeft: 2, 
                                    backgroundColor: 'rgb(132 255 124)', 
                                    color: 'white', 
                                    borderRadius: '20px', // מעגלים את הכפתור
                                    padding: '10px 20px', // מרווח פנימי
                                    '&:hover': {
                                        backgroundColor: '#45a049' // צבע כפתור בהעברה
                                    }
                                }} 
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
                <Outlet />
            </Box>
</>)
}
export default AllChallenges