import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Box, IconButton, Paper } from '@mui/material';
import { AppDispatch, RootState } from '../redux/store';
import { getImageByChallengeId } from '../redux/imageSlice';
import { useParams } from 'react-router';
import Vote from '../Pictures/vote';
import FileUploader from '../Pictures/fileUploader';
import { getChallengeById } from '../redux/challengeSlice';
import ImageViewer from '../Pictures/imageViewr';
import axios from 'axios';
import DownloadIcon from '@mui/icons-material/Download';
import SendPrompt from './sendPrompt';
const apiUrl = import.meta.env.VITE_APP_API_URL;

const ShowChallenge = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const ImagesOfChallenge = useSelector((state: RootState) => state.images.imagesByChallenge);
  const challenge = useSelector((state: RootState) => state.challenges.selectedChallenge);
  useEffect(() => {
    dispatch(getChallengeById(Number(id)));
    dispatch(getImageByChallengeId(Number(id)))
  }, [id, dispatch])
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

      console.log("Download URL:", downloadUrl);
      const fileResponse = await axios.get(downloadUrl, {
        responseType: 'blob' 
      });

      const blobUrl = URL.createObjectURL(fileResponse.data);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", fileName); // שם הקובץ שישמר
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };
  return (

    <Box sx={{ padding: 4 }}>
      {challenge ? (
        <>
          <Typography variant="h3" gutterBottom sx={{
  margin: '70px 0px 110px', // השתמש ברווחים
  fontFamily: 'cursive', // השתמש במרכאות כפולות
  fontWeight: 450, 
  fontSize: '3rem', 
  lineHeight: 1.167, // אין צורך במרכאות
  letterSpacing: '0em', // השתמש במרכאות כפולות
  textAlign: 'center', // השתמש במרכאות כפולות
}}
>
            {challenge.title}
          </Typography>
        <SendPrompt challengeTopic={challenge.title} challengeDescription={challenge.description} />

        {challenge.status?(<FileUploader idChallenge={Number(id)} />):<></>}
          {/* <FileUploader idChallenge={Number(id)} setImages={setImages}/> */}
          <Grid container spacing={3}>
            {ImagesOfChallenge.map((image) => (
              <Grid item xs={12} sm={6} md={4} key={image.id}>
                <Paper sx={{ padding: 2, textAlign: "center", transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
                  {/* <Grid item xs={12} sm={6} md={4} key={image.id}> */}
                  {/* <Card sx={{ boxShadow: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}> */}
                  <ImageViewer fileName={image.fileName} />
                  {/* <CardContent> */}
                  <Vote imageId={image.id} challengeId={image.challengeId} />
                  <Typography variant="h6">{image.countVotes}</Typography>
                  <IconButton
                    sx={{
                      backgroundColor: 'white',
                      color: 'purple',
                      '&:hover': {
                        backgroundColor: 'lightgray',
                      },
                      '&:active': {
                        backgroundColor: 'purple',
                        color: 'white',
                      },
                    }}
                    onClick={() => handleDownload(image.fileName)}
                  >
                    <DownloadIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                  {/* </CardContent> */}
                  {/* </Card> */}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          Loading challenge ...
        </Typography>
      )}
    </Box>
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
