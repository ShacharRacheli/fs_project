import  { useEffect, useState } from 'react';
import axios from 'axios';
import {  CardMedia, CircularProgress, Box } from '@mui/material';
const apiUrl = import.meta.env.VITE_APP_API_URL;

const ImageViewer = ({ fileName }:{fileName:string}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/Image/getImageUrl`, {
          params: { fileName } 
        });
        setImageUrl(response.data.url); 
            setLoading(false); 
  } catch (error) {
        setLoading(false); 
        alert('An error occured while downloading')
      }
    };

    fetchImageUrl();
  }, [fileName]); 
  return (
  <Box sx={{ position: 'relative', width: '100%', height: '250px' }}> 
  {loading ? (
    <CircularProgress
      size={50}
      sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    />
  ) : (
       <CardMedia 
        component="img"
        image={imageUrl || ''}
        alt="Uploaded"
        sx={{ height: '100%', width: '100%', objectFit: 'contain' }} 
      />
  )}
</Box>
  );
};

export default ImageViewer;