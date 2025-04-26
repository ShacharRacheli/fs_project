// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Grid, Typography, Box, IconButton, Paper } from '@mui/material';
// import { AppDispatch, RootState } from '../redux/store';
// import { getImageByChallengeId } from '../redux/imageSlice';
// import { useParams } from 'react-router';
// import Vote from '../Pictures/vote';
// import FileUploader from '../Pictures/fileUploader';
// import { getChallengeById } from '../redux/challengeSlice';
// import ImageViewer from '../Pictures/imageViewr';
// import axios from 'axios';
// import DownloadIcon from '@mui/icons-material/Download';
// import SendPrompt from './sendPrompt';
// const apiUrl = import.meta.env.VITE_APP_API_URL;

// const ShowChallenge = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch<AppDispatch>();
//   const ImagesOfChallenge = useSelector((state: RootState) => state.images.imagesByChallenge);
//   const challenge = useSelector((state: RootState) => state.challenges.selectedChallenge);
//   useEffect(() => {
//     dispatch(getChallengeById(Number(id)));
//     dispatch(getImageByChallengeId(Number(id)))
//   }, [id, dispatch])
//   const handleDownload = async (fileName: string) => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/Image/getImageUrl`, {
//         params: { fileName } 
//       });
//       const downloadUrl = response.data.url;

//       if (!downloadUrl) {
//         console.error("No URL returned from server!");
//         return;
//       }

//       console.log("Download URL:", downloadUrl);
//       const fileResponse = await axios.get(downloadUrl, {
//         responseType: 'blob' 
//       });

//       const blobUrl = URL.createObjectURL(fileResponse.data);

//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.setAttribute("download", fileName); // שם הקובץ שישמר
//       document.body.appendChild(link);
//       link.click();

//       document.body.removeChild(link);
//       URL.revokeObjectURL(blobUrl);
//     } catch (error) {
//       console.error("Error downloading the image:", error);
//     }
//   };
//   return (

//     <Box sx={{ padding: 4 }}>
//       {challenge ? (
//         <>
//           <Typography variant="h3" gutterBottom sx={{
//   margin: '70px 0px 110px', // השתמש ברווחים
//   fontFamily: 'cursive', // השתמש במרכאות כפולות
//   fontWeight: 450, 
//   fontSize: '3rem', 
//   lineHeight: 1.167, // אין צורך במרכאות
//   letterSpacing: '0em', // השתמש במרכאות כפולות
//   textAlign: 'center', // השתמש במרכאות כפולות
// }}
// >
//             {challenge.title}
//           </Typography>
//         <SendPrompt challengeTopic={challenge.title} challengeDescription={challenge.description} />

//         {challenge.status?(<FileUploader idChallenge={Number(id)} />):<></>}
//           {/* <FileUploader idChallenge={Number(id)} setImages={setImages}/> */}
//           <Grid container spacing={3}>
//             {ImagesOfChallenge.map((image) => (
//               <Grid item xs={12} sm={6} md={4} key={image.id}>
//                 <Paper sx={{ padding: 2, textAlign: "center", transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
//                   {/* <Grid item xs={12} sm={6} md={4} key={image.id}> */}
//                   {/* <Card sx={{ boxShadow: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}> */}
//                   <ImageViewer fileName={image.fileName} />
//                   {/* <CardContent> */}
//                   <Vote imageId={image.id} challengeId={image.challengeId} />
//                   <Typography variant="h6">{image.countVotes}</Typography>
//                   <IconButton
//                     sx={{
//                       backgroundColor: 'white',
//                       color: 'purple',
//                       '&:hover': {
//                         backgroundColor: 'lightgray',
//                       },
//                       '&:active': {
//                         backgroundColor: 'purple',
//                         color: 'white',
//                       },
//                     }}
//                     onClick={() => handleDownload(image.fileName)}
//                   >
//                     <DownloadIcon sx={{ fontSize: 30 }} />
//                   </IconButton>
//                   {/* </CardContent> */}
//                   {/* </Card> */}
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </>
//       ) : (
//         <Typography variant="h6" sx={{ textAlign: 'center' }}>
//           Loading challenge ...
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default ShowChallenge;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Grid, 
  Typography, 
  Box, 
  IconButton, 
  Paper,
  Container,
  Skeleton,
  Divider,
  Chip,
  useTheme,
  // useMediaQuery 
} from '@mui/material';
import { AppDispatch, RootState } from '../redux/store';
import { getImageByChallengeId } from '../redux/imageSlice';
import { useParams } from 'react-router';
import Vote from '../Pictures/vote';
import FileUploader from '../Pictures/fileUploader';
import { getChallengeById } from '../redux/challengeSlice';
import ImageViewer from '../Pictures/imageViewr';
import axios from 'axios';
import DownloadIcon from '@mui/icons-material/Download';
import CameraIcon from '@mui/icons-material/CameraAlt';
import ImageIcon from '@mui/icons-material/Image';
import SendPrompt from './sendPrompt';
const apiUrl = import.meta.env.VITE_APP_API_URL;

const ShowChallenge = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const ImagesOfChallenge = useSelector((state: RootState) => state.images.imagesByChallenge);
  const challenge = useSelector((state: RootState) => state.challenges.selectedChallenge);
  const isLoading = useSelector((state: RootState) => state.challenges.loading);
  
  useEffect(() => {
    dispatch(getChallengeById(Number(id)));
    dispatch(getImageByChallengeId(Number(id)));
  }, [id, dispatch]);
  
  const handleDownload = async (fileName: string) => {
    try {
      const response = await axios.get(`${apiUrl}/api/Image/getImageUrl`, {
        params: { fileName } 
      });
      const downloadUrl = response.data.url;

      if (!downloadUrl) {
        console.error("No URL returned from server!");
        return;
      }

      const fileResponse = await axios.get(downloadUrl, {
        responseType: 'blob' 
      });

      const blobUrl = URL.createObjectURL(fileResponse.data);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ padding: 4, mt: 6 }}>
          <Skeleton variant="rectangular" width="70%" height={60} sx={{ mx: 'auto', mb: 8 }} />
          <Skeleton variant="rectangular" width="100%" height={120} sx={{ mb: 4 }} />
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Skeleton variant="rectangular" height={250} />
                <Skeleton variant="text" width="60%" sx={{ mx: 'auto', mt: 1 }} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: { xs: 2, md: 4 }, mt: 4, mb: 8 }}>
        {challenge ? (
          <>
            <Box sx={{ position: 'relative', mb: 6, textAlign: 'center' }}>
              <Typography 
                variant="h3" 
                component="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2rem', md: '3rem' },
                  background: 'linear-gradient(45deg, #6a1b9a 30%, #4a148c 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2
                }}
              >
                {challenge.title}
              </Typography>
              
              <Chip 
                icon={<CameraIcon />} 
                label={challenge.status ? "Active Challenge" : "Challenge Ended"} 
                color={challenge.status ? "success" : "default"}
                sx={{ mb: 3 }}
              />
              
              <Typography 
                variant="body1" 
                sx={{ 
                  maxWidth: '800px', 
                  mx: 'auto', 
                  color: 'text.secondary',
                  mb: 4
                }}
              >
                {challenge.description}
              </Typography>
              
              <Divider sx={{ mb: 5, width: '80%', mx: 'auto' }} />
            </Box>

            <Box sx={{ mb: 5 }}>
              <SendPrompt 
                challengeTopic={challenge.title} 
                challengeDescription={challenge.description} 
              />
            </Box>

            {challenge.status && (
              <Box 
                sx={{ 
                  mb: 6, 
                  p: 3, 
                  background: 'rgba(106, 27, 154, 0.05)', 
                  borderRadius: 2,
                  border: '1px dashed rgba(106, 27, 154, 0.3)'
                }}
              >
                <FileUploader idChallenge={Number(id)} />
              </Box>
            )}

            {ImagesOfChallenge.length > 0 ? (
              <>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 3, 
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <ImageIcon /> Gallery ({ImagesOfChallenge.length})
                </Typography>
                
                <Grid container spacing={3}>
                  {ImagesOfChallenge.map((image) => (
                    <Grid item xs={12} sm={6} md={4} key={image.id}>
                      <Paper 
                        elevation={3}
                        sx={{ 
                          borderRadius: 2,
                          overflow: 'hidden',
                          transition: 'all 0.3s ease',
                          '&:hover': { 
                            transform: 'translateY(-8px)',
                            boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                          }
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <Box sx={{ 
                            height: 240, 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            backgroundColor: '#f5f5f5'
                          }}>
                            <ImageViewer fileName={image.fileName} />
                          </Box>
                          
                          <Box sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 2
                          }}>
                            <IconButton
                              aria-label="Download image"
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                color: theme.palette.primary.main,
                                '&:hover': {
                                  backgroundColor: theme.palette.primary.main,
                                  color: 'white',
                                },
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                              }}
                              onClick={() => handleDownload(image.fileName)}
                            >
                              <DownloadIcon />
                            </IconButton>
                          </Box>
                        </Box>
                        
                        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Vote imageId={image.id} challengeId={image.challengeId} />
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600,
                              color: theme.palette.primary.main
                            }}
                          >
                            {image.countVotes}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <Box sx={{ 
                textAlign: 'center', 
                py: 8, 
                color: 'text.secondary',
                backgroundColor: 'rgba(0,0,0,0.03)',
                borderRadius: 2
              }}>
                <ImageIcon sx={{ fontSize: 60, opacity: 0.5, mb: 2 }} />
                <Typography variant="h6">
                  No images submitted yet for this challenge
                </Typography>
                <Typography variant="body2">
                  Be the first to submit your creative work!
                </Typography>
              </Box>
            )}
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              Challenge not found or loading...
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ShowChallenge;
    // <Box sx={{ padding: 4 }}>
    // {challenge ? ( // Check if challenge is not null
    //     <>
    //         <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: 3 }}>
    //             {challenge.title} 
    //         </Typography>
    //         <FileUploader idChallenge={Number(id)} />
    //         <Grid container spacing={3}>
    //             {ImagesOfChallenge.map((image) => (
    //                 <Grid item xs={12} sm={6} md={4} key={image.id}>
    //                     <Card sx={{ boxShadow: 3 }}>
    //                             <ImageViewer fileName={image.fileName}/>
    //                         <CardContent>
    //                             <Typography variant="h6">תמונה #{image.id}</Typography>
    //                             <Vote imageId={image.id} challengeId={image.challengeId} />
    //                             <Typography variant="h6">count #{image.countVotes}</Typography>
    //                             <Button
    //                 variant="contained"
    //                 color="primary"
    //                 onClick={() => handleDownload(image.fileName)}
    //                 fullWidth
    //               >
    //                 Download
    //               </Button>

    //                         </CardContent>
    //                     </Card>
    //                 </Grid>
    //             ))}
    //         </Grid>
    //     </>
    // ) : (
    //     <Typography variant="h6" sx={{ textAlign: 'center' }}>
    //       Loading challenge ... {/* Loading message when challenge is null */}
    //     </Typography>
    // )}
    // </Box>

//     <div style={{ padding: '20px' }}>
//       <Typography variant="h4" gutterBottom>
//         אתגר {id}
//       </Typography>
// <FileUploader idChallenge={Number(id)}/>
//       <Grid container spacing={3}>
//         {ImagesOfChallenge.map((image) => (
//           <Grid item xs={12} sm={6} md={4} key={image.id}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={image.imageUrl}
//                 alt={`תמונה של אתגר ${id}`}
//               />
//               <CardContent>
//                 <Typography variant="h6">תמונה #{image.id}</Typography>
//                 <Vote imageId={image.id} challengeId={image.challengeId}/>
//                 <Typography variant="h6">count #{image.countVotes}</Typography>
//                 <Button
//                   variant="outlined"
//                   color="secondary"
//                   href={image.imageUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   fullWidth
//                 >
//                   הורד תמונה
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   const handleUpload = async () => {
//     if (!image) {
//       alert("אנא בחר תמונה להעלות");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', image);
//     formData.append('challengeId', challengeId);
//     formData.append('userId', userId);

//     setLoading(true);

//     try {
//       const response = await axios.post('/api/uploadImage', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       dispatch(addImage(response.data)); // עדכון ה-Redux עם התמונה החדשה
//       alert('התמונה הועלתה בהצלחה');
//     } catch (error) {
//       console.error(error);
//       alert('אירעה שגיאה בהעלאת התמונה');
//     } finally {
//       setLoading(false);
//     }
//   };

// שליפת התמונות של אתגר
//   useEffect(() => {
//     dispatch(fetchImages(challengeId)); // שליפה מ-Redux
//   }, [dispatch, challengeId]);
