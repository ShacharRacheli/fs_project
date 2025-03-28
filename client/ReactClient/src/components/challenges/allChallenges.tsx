import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { useEffect } from "react";
import { getChallenges } from "../redux/challengeSlice";
import { Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router";

const AllChallenges = () => {
    const dispatch = useDispatch<AppDispatch>();
    const challengesList = useSelector((state: RootState) => state.challenges.list);
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(getChallenges());
        console.log(challengesList);

    }, [dispatch]);

    const handleNavigate = (challengeId: number) => {
        navigate(`/allChallenges/${challengeId}`);
    };
    console.log(challengesList);

    return (<>
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
                            borderBottom: '1px solid purple', // גבול תחתון סגול
                            display: 'flex',
                            alignItems: 'center',
                            // opacity: challenge.status ? 1 : 0.5,
                            backgroundColor: 'white' // צבע רקע לבן
                        }}
                    >
                        <ListItemText
                            primary={challenge.title}
                            secondary={challenge.description}
                            sx={{
                                color: challenge.status ? 'black' : 'gray', // צבע טקסט שונ                        
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                maxWidth: "300px", }}
                        />     <Typography
                        sx={{
                            marginLeft: 2,
                            color: 'purple', // Date text color purple
                            fontStyle: 'italic', // Italic style for dates
                            opacity: challenge.status ? 1 : 0.5, // Only apply opacity to date//////================
                
                        }}
                    >
                        Start: {new Date(challenge.startDate).toLocaleDateString()} - End: {new Date(challenge.endDate).toLocaleDateString()}
                    </Typography>
                        <Button
                            variant="contained"
                            onClick={() => handleNavigate(challenge.id)}
                            sx={{
                                marginLeft: 2,
                                backgroundColor: 'white', // צבע רקע לבן
                                color: 'purple', // צבע טקסט סגול
                                borderRadius: '20px',
                                padding: '10px 20px',
                                border: '1px solid purple', // גבול סגול
                                '&:hover': {
                                    backgroundColor: 'lightgray' // צבע כפתור בהעברה
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
{/* <List>
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
            </List> */}

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