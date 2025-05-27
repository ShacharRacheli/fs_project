import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { 
  CardMedia, 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Container,
  Divider,
  Chip
} from "@mui/material";
import ImageViewer from "../Pictures/imageViewr";
import { getTopImagesByChallenge } from "../redux/topImagesSlice";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Winners = () => {
  const dispatch = useDispatch<AppDispatch>();
  const winnersList = useSelector((state: RootState) => state.topImages.topImages);
  
  useEffect(() => {
    dispatch(getTopImagesByChallenge());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 5 }}>
        <Box sx={{ textAlign: "center", mb: 5, position: "relative" }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              fontWeight: 700,
              background: "linear-gradient(45deg, #6a1b9a 30%, #9c27b0 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily:"cursive",
              mb: 2,
              mt: 8
            }}
          >
            Our Winners
          </Typography>
          <Divider sx={{ width: "50%", margin: "0 auto", mb: 2 }} />
        </Box>

        <Grid container spacing={3}>
          {winnersList.map((winner, index) => (
            <Grid item xs={12} sm={4} md={4} key={winner.id}>
              <Paper 
                elevation={3}
                sx={{ 
                  borderRadius: 2,
                  overflow: "hidden",
                  height: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": { 
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 20px rgba(0,0,0,0.1)"
                  }
                }}
              >
                <Box sx={{ position: "relative" }}>
                    <Box sx={{ 
                      position: "absolute", 
                      top: 10, 
                      right: 10, 
                      zIndex: 10,
                      backgroundColor: "white",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                    }}>
                      <EmojiEventsIcon sx={{ 
                        color: index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : "#CD7F32" 
                      }} />
                    </Box>
                  
                  <CardMedia
                    component={ImageViewer}
                    fileName={winner.fileName}
                    sx={{ 
                      height: 240,
                      transition: "transform 0.5s ease",
                      "&:hover": {
                        transform: "scale(1.05)"
                      }
                    }}
                  />
                </Box>               
                <Box sx={{ p: 3, textAlign: "center" }}>
                  <Typography 
                    variant="h6" 
                    component="div" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      mb: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical"
                    }}
                  >
                    {winner.title}
                  </Typography>                 
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1
                    }}
                  >
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      Winner:
                    </Box>
                    {winner.userName}
                  </Typography>
                   <Chip
                      label={`${winner.countVotes.toLocaleString()} votes`}
                      sx={{
                        background: "linear-gradient(135deg,rgb(253, 84, 233) 0%,rgb(207, 0, 225) 100%",
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        height: 36,
                        borderRadius: 3,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        '& .MuiChip-icon': {
                          color: 'white'
                        }
                      }}
                    />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Winners;
