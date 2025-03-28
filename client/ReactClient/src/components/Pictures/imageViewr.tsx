import  { useEffect, useState } from 'react';
import axios from 'axios';
import {  CardMedia, CircularProgress, Box } from '@mui/material';
const apiUrl = import.meta.env.VITE_APP_API_URL;

const ImageViewer = ({ fileName }:{fileName:string}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // שלב 1: שלח בקשה ל-API לקבלת ה-Presigned URL
    const fetchImageUrl = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/Image/getImageUrl`, {
          params: { fileName } // שם הקובץ שאת רוצה להוריד

        });
        setImageUrl(response.data.url); // הגדרת ה-URL לקבלת התמונה
            setLoading(false); // סמן שהטעינה הסתיימה
  } catch (error) {
        console.error('שגיאה בהבאת ה-URL:', error);
        setLoading(false); // סמן שהטעינה הסתיימה
      }
    };

    fetchImageUrl();
  }, [fileName]); // מבצע את הקריאה כל פעם ששם הקובץ משתנה
// console.log(imageUrl);

  return (
  //   <Box sx={{ position: 'relative', width: '100%', height: '200px' }}>
  //   {loading ? (
  //     <CircularProgress
  //       size={50}
  //       sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
  //     />
  //   ) : (
  //     <Card>
  //       <CardMedia
  //         component="img"
  //         image={imageUrl || ''}
  //         alt="Uploaded"
  //         sx={{ height: '100%', objectFit: 'cover' }}
  //       />
  //     </Card>
  //   )}
  // </Box>
  <Box sx={{ position: 'relative', width: '100%', height: '250px' }}> {/* Fixed height */}
  {loading ? (
    <CircularProgress
      size={50}
      sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    />
  ) : (
    // <Card>
       <CardMedia 
        component="img"
        image={imageUrl || ''}
        alt="Uploaded"
        sx={{ height: '100%', width: '100%', objectFit: 'contain' }} // Fixed width and height
      />
    // </Card>
  )}
</Box>
  );
};

export default ImageViewer;

    // <div>
    //   {imageUrl ? (
    //     <img src={imageUrl} alt="Uploaded Image" style={{ width: '100%', borderRadius: '8px' }} />
    //   ) : (
    //     <p>טוען תמונה...</p>
    //   )}
    // </div>