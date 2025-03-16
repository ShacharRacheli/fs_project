// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router"
// import { AppDispatch, RootState } from "../redux/store";
// import { useEffect } from "react";
// import { getImageByChallengeId } from "../redux/imageSlice";
// import { Box } from "@mui/material";

// const ShowChallenge=()=>{
// const {id}=useParams();
// const dispatch=useDispatch<AppDispatch>();
// const ImagesOfChallenge=useSelector((state:RootState)=>state.iamges.imagesByChallenge);
// useEffect(()=>{
//     dispatch(getImageByChallengeId(Number(id)));
// },[])

// return(<>
// {ImagesOfChallenge.map(i=>(
//     <Box key={i.challengeId}>
//         {i.challengeId} 
//         {i.countVotes} 
//         {i.userId} 
//          {i.imageUrl}</Box>
// ))}

// </>)
// }
// export default ShowChallenge

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
import { Button, Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { AppDispatch, RootState } from '../redux/store';
import { getImageByChallengeId } from '../redux/imageSlice';
import { useParams } from 'react-router';
import Vote from '../Pictures/vote';

const ShowChallenge = () => {
//   const dispatch = useDispatch();
//   const images = useSelector((state) => state.);
const {id}=useParams();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch<AppDispatch>();
  const ImagesOfChallenge=useSelector((state:RootState)=>state.iamges.imagesByChallenge);
  useEffect(()=>{
      dispatch(getImageByChallengeId(Number(id)));
  },[id])
  
  // פונקציה להעלאת תמונה
  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        אתגר {id}
      </Typography>

      <Box mb={4}>
        <input type="file" onChange={handleImageChange} />
        <Button
          variant="contained"
          color="primary"
        //   onClick={handleUpload}
          disabled={loading}
          style={{ marginLeft: '10px' }}
        >
          {loading ? 'העלאה...' : 'העלה תמונה'}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {ImagesOfChallenge.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={image.imageUrl}
                alt={`תמונה של אתגר ${id}`}
              />
              <CardContent>
                <Typography variant="h6">תמונה #{image.id}</Typography>
                <Vote imageId={image.id} challengeId={image.challengeId}/>
                <Typography variant="h6">count #{image.countVotes}</Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  href={image.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                >
                  הורד תמונה
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ShowChallenge;
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
