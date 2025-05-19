// import { useDispatch, useSelector } from "react-redux"
// import { AppDispatch, RootState } from "../redux/store"
// import { useEffect, useState } from "react";
// import { getChallenges } from "../redux/challengeSlice";
// import { Box, Button, List, ListItem, ListItemText, Typography , ListItemAvatar, Avatar} from "@mui/material";
// import { Outlet, useNavigate } from "react-router";
// // import SendPrompt from "./sendPrompt";

// const AllChallenges = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const challengesList = useSelector((state: RootState) => state.challenges.list);
//     const navigate = useNavigate();
//     const [expandedChallengeId, setExpandedChallengeId] = useState<number | null>(null);


//     useEffect(() => {
//         dispatch(getChallenges());
//         console.log(challengesList);

//     }, [dispatch]);

//     const handleNavigate = (challengeId: number) => {
//         navigate(`/allChallenges/${challengeId}`);
//     };
//     const toggleDescription = (challengeId: number) => {
//         setExpandedChallengeId(expandedChallengeId === challengeId ? null : challengeId);
//     };
//     console.log(challengesList);

//     return (<>
    
//        <Typography variant="h4" sx={{  margin: '70px 0px 24px', 
//   fontFamily: 'cursive',  
//   fontWeight: 450, 
//   fontSize: '3rem', 
//   lineHeight: 1.167,letterSpacing: '0em', 
//   textAlign: 'center', }}>
//             Challenges List
//         </Typography>
//         <List>
//             {Array.isArray(challengesList) && challengesList.length > 0 ? (
//                 challengesList.map((challenge) => (
//                     <ListItem
//                         key={challenge.id}
//                         sx={{
//                             padding: 2,
//                             borderBottom: '1px solid purple', // גבול תחתון סגול
//                             display: 'flex',
//                             alignItems: 'center',
//                             // opacity: challenge.status ? 1 : 0.5,
//                             backgroundColor: 'white', // צבע רקע לבן
//                             marginBottom: 2, // מרווח בין פריטים
//                         }}
//                     >    <ListItemAvatar>
//                     <Avatar src={'./icon.png'} alt={challenge.title} sx={{ width: 40, height: 40 }} /> {/* הוסף את התמונה כאן */}
//         {/* <SendPrompt challengeTopic={challenge.title} challengeDescription={challenge.description} /> */}
//                 </ListItemAvatar>
//                         <ListItemText
//                             primary={
//                                 // challenge.title
//                                 <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//                                 {challenge.title}
//                             </Typography>                    
//                             }
//                             secondary={
//                                 <>
//                                 <Typography 
//                                     onClick={() => toggleDescription(challenge.id)} 
//                                     sx={{ color: 'purple', cursor: 'pointer',  textDecoration: 'underline', marginBottom: 1  }}
//                                 >
//                                     {expandedChallengeId === challenge.id ? "Show Less" : "Show More"}
//                                 </Typography>
//                                 <Typography 
//                                     sx={{
//                                         display: expandedChallengeId === challenge.id ? 'block' : 'none',
//                                         marginTop: 1,
//                                         whiteSpace: 'pre-wrap', 
//                                     }}
//                                 >
//                                     {challenge.description}
//                                 </Typography>
//                             </>
//                             }                            
//                             sx={{
//                                 color: challenge.status ? 'black' : 'gray',                        
//                                 overflow: "hidden",                       
//                                 maxWidth: "350px", }}
//                         />     <Typography
//                         sx={{
//                             marginLeft: 2,
//                             color: 'purple', 
//                             fontStyle: 'italic', 
//                             opacity: challenge.status ? 1 : 0.5, // Only apply opacity to date//////================
                
//                         }}
//                     >
//                         From: {new Date(challenge.startDate).toLocaleDateString()} - Till: {new Date(challenge.endDate).toLocaleDateString()}
//                     </Typography>
//                         <Button
//                             variant="contained"
//                             onClick={() => handleNavigate(challenge.id)}
//                             sx={{
//                                 marginLeft: 2,
//                                 backgroundColor: 'white',  
//                                 color: 'purple', 
//                                 borderRadius: '20px',
//                                 padding: '10px 20px',
//                                 border: '1px solid purple', 
//                                 '&:hover': {
//                                     backgroundColor: 'lightgray' 
//                                 }
//                             }}
//                         >
//                             View Challenge
//                         </Button>
//                     </ListItem>
//                 ))
//             ) : (
//                 <Typography sx={{ padding: 2 }}>Loading challenges...</Typography>
//             )}
//         </List>
//         <Box>
//             <Outlet />
//         </Box>
//     </>)
// }
// export default AllChallenges
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { getChallenges } from "../redux/challengeSlice";
import { 
  Box, 
  Button, 
  Typography,
  Card,
  CardContent,
  CardActions,
  Chip,
  Container,
  Grid,
  Collapse,
  Avatar,
  IconButton,
  Skeleton
} from "@mui/material";
import { Outlet, useNavigate } from "react-router";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import ImageIcon from '@mui/icons-material/Image';

const AllChallenges = () => {
  const dispatch = useDispatch<AppDispatch>();
  const challengesList = useSelector((state: RootState) => state.challenges.list);
  const loading = useSelector((state: RootState) => state.challenges.loading);
  const navigate = useNavigate();
  const [expandedChallengeId, setExpandedChallengeId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getChallenges());
  }, [dispatch]);

  const handleNavigate = (challengeId: number) => {
    navigate(`/allChallenges/${challengeId}`);
  };

  const toggleDescription = (challengeId: number) => {
    setExpandedChallengeId(expandedChallengeId === challengeId ? null : challengeId);
  };

const isActiveChallenge = (startDate: Date | string, endDate: Date | string) => {
  const now = new Date();
  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const end = endDate instanceof Date ? endDate : new Date(endDate);
  return now >= start && now <= end;
};
  // Function to calculate days remaining
  const getDaysRemaining = (endDate: Date |  string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Typography 
        variant="h2" 
        component="h1" 
        sx={{ 
          mb: 4, 
          fontWeight: 700, 
          textAlign: 'center',
          background: 'linear-gradient(90deg, #6e48aa 0%, #9d50bb 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '4px',
            background: 'linear-gradient(90deg, #6e48aa 0%, #9d50bb 100%)',
            borderRadius: '2px'
          }
        }}
      >
        AI Image Challenges
      </Typography>
      
      <Typography 
        variant="h6" 
        color="text.secondary" 
        sx={{ 
          mb: 6, 
          textAlign: 'center',
          maxWidth: '800px',
          mx: 'auto'
        }}
      >
        Participate in our creative AI image generation challenges and showcase your AI prompting skills
      </Typography>

      {loading ? (
        <Grid container spacing={4}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} md={6} key={item}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
                <Skeleton variant="rectangular" height={140} animation="wave" />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Skeleton variant="text" height={32} width="80%" animation="wave" />
                  <Skeleton variant="text" height={20} animation="wave" />
                  <Skeleton variant="text" height={20} animation="wave" />
                </CardContent>
                <CardActions>
                  <Skeleton variant="rectangular" height={36} width={120} animation="wave" />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={4}>
          {Array.isArray(challengesList) && challengesList.map((challenge) => {
            const isActive = isActiveChallenge(challenge.startDate, challenge.endDate);
            const daysRemaining = getDaysRemaining(challenge.endDate);
            
            return (
              <Grid item xs={12} md={6} key={challenge.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    borderRadius: 2,
                    border: isActive ? '1px solid rgba(157, 80, 187, 0.3)' : 'none',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.15)'
                    },
                    opacity: isActive ? 1 : 0.8,
                  }}
                >
                  <Box
                    sx={{
                      height: 180,
                      backgroundColor: 'rgba(110, 72, 170, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 2,
                      position: 'relative',
                      overflow: 'hidden',
                      borderBottom: '1px solid rgba(0,0,0,0.05)'
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        backgroundColor: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    >
                      <ImageIcon sx={{ fontSize: 40, color: '#9d50bb' }} />
                    </Avatar>
                    
                    <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
                      <Chip 
                        label={isActive ? "Active" : "Inactive"} 
                        size="small"
                        color={isActive ? "success" : "default"}
                        sx={{ fontWeight: 500 }}
                      />
                      {isActive && (
                        <Chip 
                          icon={<AccessTimeIcon sx={{ fontSize: '16px !important' }} />}
                          label={`${daysRemaining} days left`} 
                          size="small"
                          color="primary"
                          sx={{ fontWeight: 500 }}
                        />
                      )}
                    </Box>
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 600,
                        color: isActive ? '#333' : 'text.secondary',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <ArtTrackIcon sx={{ color: '#9d50bb' }} />
                      {challenge.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    
                    <IconButton
                      onClick={() => toggleDescription(challenge.id)}
                      aria-expanded={expandedChallengeId === challenge.id}
                      aria-label="show more"
                      sx={{
                        transform: expandedChallengeId === challenge.id ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s',
                        color: '#9d50bb',
                        p: 0,
                        mb: 1
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                    
                    <Collapse in={expandedChallengeId === challenge.id} timeout="auto" unmountOnExit>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        paragraph
                        sx={{ 
                          mb: 2,
                          whiteSpace: 'pre-wrap',
                          p: 2,
                          backgroundColor: 'rgba(0,0,0,0.02)',
                          borderRadius: 1,
                          border: '1px solid rgba(0,0,0,0.05)'
                        }}
                      >
                        {challenge.description}
                      </Typography>
                    </Collapse>
                  </CardContent>
                  
                  <CardActions sx={{ p: 2, pt: 0, justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      onClick={() => handleNavigate(challenge.id)}
                      sx={{
                        background: 'linear-gradient(90deg, #6e48aa 0%, #9d50bb 100%)',
                        color: 'white',
                        borderRadius: '24px',
                        px: 3,
                        py: 1,
                        fontWeight: 500,
                        textTransform: 'none',
                        '&:hover': {
                          boxShadow: '0 4px 12px rgba(157, 80, 187, 0.3)'
                        }
                      }}
                    >
                      View Challenge
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {Array.isArray(challengesList) && challengesList.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', mt: 8, mb: 8 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No challenges available at the moment
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Check back soon for new AI image generation challenges!
          </Typography>
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        <Outlet />
      </Box>
    </Container>
  );
};

export default AllChallenges;
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