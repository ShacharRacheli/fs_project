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
const apiUrl = import.meta.env.VITE_APP_API_URL;

const ShowChallenge = () => {
  //   const dispatch = useDispatch();
  //   const images = useSelector((state) => state.);
  const { id } = useParams();

  // const [image, setImage] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [creation,setCreation]=useState()
  // const [images, setImages] = useState<ImageType[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const ImagesOfChallenge = useSelector((state: RootState) => state.images.imagesByChallenge);
  const challenge = useSelector((state: RootState) => state.challenges.selectedChallenge);
  useEffect(() => {
    //  const newImages= dispatch(getImageByChallengeId(Number(id)));
    //  setImages(newImages!)
    // console.log(images);
    // const fetchImages = async () => {
    //   console.log(images);
    //   const result = await dispatch(getImageByChallengeId(Number(id))) 
    //   console.log(result);  
    //   if (getImageByChallengeId.fulfilled.match(result)) {
    //     setImages(result.payload); // עדכון הסטייט עם התוצאה
    //   console.log(result.payload);
    //   }      
    //   dispatch(getChallengeById(Number(id)));
    // };
    // fetchImages();
    dispatch(getChallengeById(Number(id)));
    dispatch(getImageByChallengeId(Number(id)))
  }, [id, dispatch])
  const handleDownload = async (fileName: string) => {
    try {
      const response = await axios.get(`${apiUrl}/api/Image/getImageUrl`, {
        params: { fileName } // שם הקובץ שאת רוצה להוריד
      });
      const downloadUrl = response.data.url;

      if (!downloadUrl) {
        console.error("No URL returned from server!");
        return;
      }

      console.log("Download URL:", downloadUrl);

      // בקשה לקבלת הקובץ בפורמט blob
      const fileResponse = await axios.get(downloadUrl, {
        responseType: 'blob' // גורם להחזרת קובץ במקום להציג אותו
      });

      // יצירת כתובת URL לנתונים
      const blobUrl = URL.createObjectURL(fileResponse.data);

      // יצירת קישור להורדה
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", fileName); // שם הקובץ שישמר
      document.body.appendChild(link);
      link.click();

      // ניקוי הזיכרון
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };
  return (

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
    <Box sx={{ padding: 4 }}>
      {challenge ? (
        <>
          <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', marginBottom: 3 }}>
            {challenge.title}
          </Typography>
        {challenge.status?(<FileUploader idChallenge={Number(id)} />):<></>}
          {/* <FileUploader idChallenge={Number(id)} setImages={setImages}/> */}
          <Grid container spacing={3}>
            {ImagesOfChallenge.map((image) => (
              <Grid item xs={12} sm={6} md={4} key={image.id}>
                <Paper sx={{ padding: 2, textAlign: "center" }}>
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
