// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../redux/store";
// import { useEffect } from "react";
// import {CardMedia, Grid, Paper, Typography } from "@mui/material";
// import ImageViewer from "../Pictures/imageViewr";
// import { getTopImagesByChallenge } from "../redux/topImagesSlice";

// const Winners=()=>{

//     const dispatch=useDispatch<AppDispatch>();
//     const winnersList=useSelector((state:RootState)=>state.topImages.topImages);
//     useEffect(()=>{
//         dispatch(getTopImagesByChallenge());
//     },[dispatch]);

//     console.log("in winnerrrrrr1111");
    
// return(<>

// <Typography variant="h4" component="h2" align="center" gutterBottom sx={{  margin: '70px 0px 24px', fontFamily: 'cursive'}}>
//                 Our Winners
//             </Typography>

//    <Grid container spacing={2}>
//             {winnersList.map((winner) => (
//                 <Grid item xs={12} sm={4} md={4} key={winner.id}> {/* Adjusted to 4 for 3 cards per row */}
//                     {/* <Card sx={{ width: '100%', boxShadow: 3 }}> Set width to 100% */}
//                 {/* <Grid item xs={12} sm={6} md={4} key={winner.id}> */}
//                             <Paper sx={{ padding: 2, textAlign: "center", width:'100%'}}>
//                         <CardMedia
//                             component={ImageViewer}
//                             fileName={winner.fileName}
//                             sx={{ height: 200 }} // Adjust height as needed
//                         />
//                         {/* <CardContent> */}
//                             <Typography variant="h6" component="div" gutterBottom>
//                                 {winner.title}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 Winner: {winner.userName}
//                             </Typography>
//                         {/* </CardContent> */}
//                     {/* </Card> */}
//                     </Paper>
//                 </Grid>
//             ))}
//         </Grid>
// </>)
// }
// export default Winners
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { 
  Box, 
  CardMedia, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Skeleton,
  Chip,
  Divider,
  useTheme,
  alpha,
  Fade
} from "@mui/material";
import ImageViewer from "../Pictures/imageViewr";
import { getTopImagesByChallenge } from "../redux/topImagesSlice";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';

const Winners = () => {
  const dispatch = useDispatch<AppDispatch>();
  const winnersList = useSelector((state: RootState) => state.topImages.topImages);
  const loading = useSelector((state: RootState) => state.topImages.loading);
  const theme = useTheme();
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);

  useEffect(() => {
    dispatch(getTopImagesByChallenge());
  }, [dispatch]);

  // Staged animation for cards
  useEffect(() => {
    if (winnersList.length > 0 && animatedItems.length === 0) {
      const timer = setTimeout(() => {
        const animationSequence = Array.from({ length: winnersList.length }, (_, i) => i);
        let count = 0;
        
        const interval = setInterval(() => {
          setAnimatedItems(prev => [...prev, animationSequence[count]]);
          count++;
          
          if (count >= animationSequence.length) {
            clearInterval(interval);
          }
        }, 150);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [winnersList]);

  const getMedalColor = (index: number) => {
    switch (index) {
      case 0: return "gold";
      case 1: return "#C0C0C0"; // Silver
      case 2: return "#CD7F32"; // Bronze
      default: return theme.palette.primary.main;
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Skeleton variant="text" width="40%" height={60} sx={{ mx: "auto", mb: 4 }} />
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 2 }} />
                <Skeleton variant="text" width="60%" sx={{ mx: "auto", mt: 2 }} />
                <Skeleton variant="text" width="40%" sx={{ mx: "auto" }} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box 
        sx={{ 
          pt: 10, 
          pb: 12,
          position: "relative"
        }}
      >
        {/* Page title with decorative elements */}
        <Box sx={{ position: "relative", textAlign: "center", mb: 8 }}>
          <Box 
            sx={{ 
              position: "absolute", 
              top: -20, 
              left: "50%", 
              transform: "translateX(-50%)",
              color: theme.palette.primary.main,
              opacity: 0.1,
              fontSize: "8rem",
              zIndex: 0
            }}
          >
            <EmojiEventsIcon fontSize="inherit" />
          </Box>
          
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{
              position: "relative",
              zIndex: 1,
              fontWeight: 700,
              fontSize: { xs: "2.5rem", md: "3.2rem" },
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2
            }}
          >
            Our Champions
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ 
              maxWidth: "700px", 
              mx: "auto", 
              mb: 4,
              fontSize: "1.1rem"
            }}
          >
            Celebrating creativity, vision, and outstanding achievement in our challenges
          </Typography>
          
          <Divider 
            sx={{ 
              width: "60%", 
              mx: "auto", 
              mb: 6,
              "&::before, &::after": {
                borderColor: alpha(theme.palette.primary.main, 0.3),
              }
            }}
          >
            <Chip 
              icon={<EmojiEventsIcon />} 
              label="Winners Gallery" 
              color="primary" 
              variant="outlined"
            />
          </Divider>
        </Box>

        {winnersList.length > 0 ? (
          <Grid container spacing={4}>
            {winnersList.map((winner, index) => (
              <Grid item xs={12} sm={6} md={4} key={winner.id}>
                <Fade 
                  in={animatedItems.includes(index)} 
                  timeout={800}
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                    transformOrigin: "center"
                  }}
                >
                  <Paper 
                    elevation={3}
                    sx={{ 
                      borderRadius: 3,
                      overflow: "hidden",
                      height: "100%",
                      transition: "all 0.3s ease",
                      position: "relative",
                      "&:hover": { 
                        transform: "translateY(-10px)",
                        boxShadow: "0 12px 28px rgba(0,0,0,0.15)"
                      }
                    }}
                  >
                    {/* Medal position indicator for top 3 */}
                    {index < 3 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          zIndex: 2,
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          backgroundColor: getMedalColor(index),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                          border: "2px solid white"
                        }}
                      >
                        <Typography 
                          variant="h6" 
                          component="span"
                          sx={{ 
                            color: "white", 
                            fontWeight: 700,
                            fontSize: "1.2rem"
                          }}
                        >
                          {index + 1}
                        </Typography>
                      </Box>
                    )}
                    
                    {/* Challenge name banner */}
                    <Box 
                      sx={{ 
                        position: "absolute",
                        top: 20,
                        left: 0,
                        backgroundColor: alpha(theme.palette.background.paper, 0.8),
                        backdropFilter: "blur(5px)",
                        px: 2,
                        py: 0.5,
                        maxWidth: "85%",
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        zIndex: 1
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 600,
                          fontSize: "0.85rem",
                          color: theme.palette.text.primary
                        }}
                        noWrap
                      >
                        {winner.title}
                      </Typography>
                    </Box>
                    
                    {/* Image area */}
                    <Box 
                      sx={{ 
                        position: "relative",
                        height: 280,
                        backgroundColor: "#f8f8f8",
                        overflow: "hidden"
                      }}
                    >
                      <CardMedia
                        component={ImageViewer}
                        fileName={winner.fileName}
                        sx={{ 
                          height: "100%",
                          backgroundSize: "cover",
                          transition: "transform 0.5s ease",
                          "&:hover": {
                            transform: "scale(1.05)"
                          }
                        }}
                      />
                    </Box>
                    
                    {/* Winner info */}
                    <Box 
                      sx={{ 
                        p: 3,
                        backgroundColor: index < 3 
                          ? alpha(getMedalColor(index), 0.05)
                          : "transparent"
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <PersonIcon 
                          fontSize="small" 
                          sx={{ 
                            mr: 1, 
                            color: theme.palette.primary.main 
                          }} 
                        />
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600,
                            fontSize: "1.1rem"
                          }}
                        >
                          {winner.userName}
                        </Typography>
                      </Box>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        <EmojiEventsIcon 
                          fontSize="small" 
                          sx={{ 
                            mr: 1, 
                            color: getMedalColor(index)
                          }} 
                        />
                        {index === 0 ? "Gold Winner" : 
                         index === 1 ? "Silver Winner" : 
                         index === 2 ? "Bronze Winner" : "Winner"}
                      </Typography>
                    </Box>
                  </Paper>
                </Fade>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box 
            sx={{ 
              textAlign: "center", 
              py: 8, 
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              borderRadius: 2
            }}
          >
            <EmojiEventsIcon sx={{ fontSize: 60, opacity: 0.3, mb: 2 }} />
            <Typography variant="h6">
              No winners announced yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Check back soon to see our champions
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Winners;
{/* <Grid container spacing={2}>
            {winnersList.map((winner) => (
                <Grid item xs={12} sm={6} md={4} key={winner.id}>
                    <Typography variant="h6">{winner.title}</Typography>
                    <Typography variant="h6">{winner.userName}</Typography>
                    <ImageViewer fileName={winner.fileName} />
                </Grid>
            ))}
        </Grid> */}