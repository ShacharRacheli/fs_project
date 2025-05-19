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
  Divider,
  Container,
  Paper,
  Grid,
  Collapse,
  Avatar,
  Skeleton,
  Badge,
  Chip,
  LinearProgress
} from "@mui/material";
import { Outlet, useNavigate } from "react-router";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Define the Challenge interface to match your Redux store
interface Challenge {
  id: number;
  title: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  status?: boolean;
}

const AllChallenges = () => {
  const dispatch = useDispatch<AppDispatch>();
  const challengesList = useSelector((state: RootState) => state.challenges.list) as Challenge[];
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

  // Function to format dates safely
  const formatDate = (date: Date | string) => {
    try {
      return date instanceof Date 
        ? date.toLocaleDateString() 
        : new Date(date).toLocaleDateString();
    } catch (e) {
      return "Invalid date";
    }
  };

  // Function to determine if a challenge is active based on dates
  const isActiveChallenge = (startDate: Date | string, endDate: Date | string) => {
    try {
      const now = new Date();
      const start = startDate instanceof Date ? startDate : new Date(startDate);
      const end = endDate instanceof Date ? endDate : new Date(endDate);
      return now >= start && now <= end;
    } catch (e) {
      return false;
    }
  };

  // Function to calculate days remaining
  const getDaysRemaining = (endDate: Date | string) => {
    try {
      const end = endDate instanceof Date ? endDate : new Date(endDate);
      const now = new Date();
      const diffTime = end.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    } catch (e) {
      return 0;
    }
  };
  
  // Function to calculate percentage of time elapsed
  const getTimeProgress = (startDate: Date | string, endDate: Date | string) => {
    try {
      const start = startDate instanceof Date ? startDate : new Date(startDate);
      const end = endDate instanceof Date ? endDate : new Date(endDate);
      const now = new Date();
      
      const totalDuration = end.getTime() - start.getTime();
      const elapsedDuration = now.getTime() - start.getTime();
      
      if (now < start) return 0;
      if (now > end) return 100;
      
      return Math.min(100, Math.round((elapsedDuration / totalDuration) * 100));
    } catch (e) {
      return 0;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Typography 
        variant="h2" 
        component="h1" 
        sx={{ 
          mb: 1, 
          fontWeight: 700, 
          textAlign: 'center',
          color: '#6e48aa'
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
        <Box sx={{ mb: 4 }}>
          {[1, 2, 3].map((item) => (
            <Paper key={item} sx={{ mb: 3, overflow: 'hidden' }}>
              <Box sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <Skeleton variant="circular" width={80} height={80} />
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <Skeleton variant="text" height={40} width="60%" />
                    <Skeleton variant="text" height={20} width="40%" />
                    <Skeleton variant="text" height={20} width="80%" sx={{ mt: 1 }} />
                  </Grid>
                </Grid>
              </Box>
              <Skeleton variant="rectangular" height={60} />
            </Paper>
          ))}
        </Box>
      ) : (
        <Box>
          {Array.isArray(challengesList) && challengesList.map((challenge, index) => {
            const isActive = isActiveChallenge(challenge.startDate, challenge.endDate);
            const daysRemaining = getDaysRemaining(challenge.endDate);
            const timeProgress = getTimeProgress(challenge.startDate, challenge.endDate);
            const isExpandable = challenge.description && challenge.description.length > 0;
            
            return (
              <Paper 
                key={challenge.id}
                elevation={1}
                sx={{ 
                  mb: 4, 
                  borderRadius: 2,
                  overflow: 'hidden',
                  borderLeft: isActive ? '4px solid #6e48aa' : '4px solid transparent',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box sx={{ p: { xs: 2, md: 3 } }}>
                  <Grid container spacing={3} alignItems="center">
                    {/* Icon/Avatar Column */}
                    <Grid item xs={12} sm={2} md={1.5} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          isActive ? 
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                bgcolor: 'success.main',
                                border: '2px solid white'
                              }}
                            /> : undefined
                        }
                      >
                        <Avatar
                          sx={{ 
                            width: 70, 
                            height: 70, 
                            bgcolor: 'rgba(110, 72, 170, 0.1)',
                            border: '2px solid rgba(110, 72, 170, 0.2)'
                          }}
                        >
                          <ImageIcon sx={{ fontSize: 36, color: '#6e48aa' }} />
                        </Avatar>
                      </Badge>
                    </Grid>
                    
                    {/* Content Column */}
                    <Grid item xs={12} sm={10} md={8}>
                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                        <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: isActive ? '#333' : '#888' }}>
                          {challenge.title}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 1, ml: { xs: 0, sm: 2 } }}>
                          <Chip 
                            size="small" 
                            label={isActive ? "Active" : "Inactive"} 
                            color={isActive ? "success" : "default"}
                            sx={{ height: 24 }}
                          />
                          {isActive && daysRemaining > 0 && (
                            <Chip 
                              size="small" 
                              icon={<AccessTimeIcon sx={{ fontSize: '14px !important' }} />} 
                              label={`${daysRemaining} days left`} 
                              color="primary"
                              sx={{ height: 24 }}
                            />
                          )}
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                        <AccessTimeIcon sx={{ fontSize: 16, verticalAlign: 'text-bottom', mr: 0.5 }} />
                        {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}
                      </Typography>
                      
                      {isActive && (
                        <Box sx={{ mt: 2, mb: 2, width: '100%' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">Progress</Typography>
                            <Typography variant="caption" color="text.secondary">{timeProgress}%</Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={timeProgress} 
                            sx={{ 
                              height: 6, 
                              borderRadius: 1,
                              backgroundColor: 'rgba(110, 72, 170, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: '#6e48aa'
                              }
                            }} 
                          />
                        </Box>
                      )}
                      
                      {isExpandable && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <Button
                            onClick={() => toggleDescription(challenge.id)}
                            size="small"
                            endIcon={
                              <ExpandMoreIcon 
                                sx={{ 
                                  transform: expandedChallengeId === challenge.id ? 'rotate(180deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.3s' 
                                }} 
                              />
                            }
                            sx={{ 
                              color: '#6e48aa', 
                              textTransform: 'none', 
                              pl: 0,
                              '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
                            }}
                          >
                            {expandedChallengeId === challenge.id ? "Show Less" : "Show Description"}
                          </Button>
                        </Box>
                      )}
                      
                      <Collapse in={expandedChallengeId === challenge.id} timeout="auto" unmountOnExit>
                        <Box 
                          sx={{ 
                            mt: 2, 
                            p: 2, 
                            borderRadius: 1, 
                            backgroundColor: 'rgba(0,0,0,0.02)',
                            border: '1px solid rgba(0,0,0,0.05)'
                          }}
                        >
                          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                            {challenge.description}
                          </Typography>
                        </Box>
                      </Collapse>
                    </Grid>
                    
                    {/* Action Column */}
                    <Grid item xs={12} sm={12} md={2.5} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        variant="outlined"
                        onClick={() => handleNavigate(challenge.id)}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          borderColor: '#6e48aa',
                          color: '#6e48aa',
                          borderRadius: 2,
                          width: { xs: '100%', md: 'auto' },
                          '&:hover': {
                            backgroundColor: 'rgba(110, 72, 170, 0.04)',
                            borderColor: '#6e48aa'
                          }
                        }}
                      >
                        View Challenge
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                
                {index < challengesList.length - 1 && (
                  <Divider sx={{ borderColor: 'rgba(0,0,0,0.08)' }} />
                )}
              </Paper>
            );
          })}
          
          {Array.isArray(challengesList) && challengesList.length === 0 && !loading && (
            <Box sx={{ textAlign: 'center', mt: 8, mb: 8, p: 6, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 2 }}>
              <EmojiEventsIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h5" color="text.secondary" gutterBottom>
                No challenges available at the moment
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Check back soon for new AI image generation challenges!
              </Typography>
            </Box>
          )}
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