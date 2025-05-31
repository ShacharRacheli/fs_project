import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { useEffect, useState } from "react";
import { getChallenges } from "../redux/challengeSlice";
import { Box, Button, List, ListItem, ListItemText, Typography, ListItemAvatar, Avatar, CircularProgress } from "@mui/material";
import { Outlet, useNavigate } from "react-router";

const AllChallenges = () => {
    const dispatch = useDispatch<AppDispatch>();
    const challengesList = useSelector((state: RootState) => state.challenges.list);
    const navigate = useNavigate();
    const [expandedChallengeId, setExpandedChallengeId] = useState<number | null>(null);


    useEffect(() => {
        dispatch(getChallenges());
        console.log(challengesList);

    }, [dispatch]);

    const handleNavigate = (challengeId: number) => {
        navigate(`/allChallenges/${challengeId}`);
    };
    const toggleDescription = (challengeId: number) => {
        setExpandedChallengeId(expandedChallengeId === challengeId ? null : challengeId);
    };

    return (<>

        <Typography variant="h4" sx={{
            margin: '70px 0px 54px',
            padding: '10px',
            fontFamily: 'cursive',
            fontWeight: 450,
            fontSize: '3rem',
            lineHeight: 1.167,
            letterSpacing: '0em',
            textAlign: 'center',
            background: "linear-gradient(45deg, #6a1b9a 30%, #9c27b0 90%)",
            backgroundClip: 'text',
            color: 'transparent',
        }}>
            Challenges List
        </Typography>
        <List>
            {Array.isArray(challengesList) && challengesList.length > 0 ? (
                challengesList.map((challenge) => (
                    <ListItem
                        key={challenge.id}
                        sx={{
                            padding: 2,
                            borderBottom: '1px solid purple',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            marginBottom: 2,
                        }}
                    >    <ListItemAvatar>
                            <Avatar src={'/icon.png'} alt={challenge.title} sx={{ width: 40, height: 40 }} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {challenge.title}
                                </Typography>
                            }
                            secondary={
                                <>
                                    <Typography
                                        onClick={() => toggleDescription(challenge.id)}
                                        sx={{ color: 'purple', cursor: 'pointer', textDecoration: 'underline', marginBottom: 1 }}
                                    >
                                        {expandedChallengeId === challenge.id ? "Show Less" : "Show More"}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            display: expandedChallengeId === challenge.id ? 'block' : 'none',
                                            marginTop: 1,
                                            whiteSpace: 'pre-wrap',
                                        }}
                                    >
                                        {challenge.description}
                                    </Typography>
                                </>
                            }
                            sx={{
                                color: challenge.status ? 'black' : 'gray',
                                overflow: "hidden",
                                maxWidth: "350px",
                            }}
                        />     <Typography
                            sx={{
                                marginLeft: 2,
                                color: 'purple',
                                fontStyle: 'italic',
                                opacity: challenge.status ? 1 : 0.5, 

                            }}
                        >
                            From: {new Date(challenge.startDate).toLocaleDateString()} - Till: {new Date(challenge.endDate).toLocaleDateString()}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => handleNavigate(challenge.id)}
                            sx={{
                                marginLeft: 2,
                                backgroundColor: 'white',
                                color: 'purple',
                                borderRadius: '20px',
                                padding: '10px 20px',
                                border: '1px solid purple',
                                '&:hover': {
                                    backgroundColor: 'lightgray'
                                }
                            }}
                        >
                            View Challenge
                        </Button>
                    </ListItem>
                ))
            ) : (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="100vh"
                    gap={2}
                >
                    <CircularProgress size={60} sx={{ color: '#9333ea' }} />
                    <Typography variant="h5" color="text.primary" fontWeight="medium">
                        Loading Challenges...
                    </Typography>
                </Box>
            )}
        </List>
        <Box>
            <Outlet />
        </Box>
    </>)
}
export default AllChallenges
