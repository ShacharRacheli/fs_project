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
      link.setAttribute("download", fileName);
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
            margin: '70px 0px 54px',
            fontFamily: 'cursive',
            fontWeight: 450,
            fontSize: '3rem',
            lineHeight: 1.167,
            letterSpacing: '0em',
            textAlign: 'center',
            background: "linear-gradient(45deg, #6a1b9a 30%, #9c27b0 90%)",
            backgroundClip: 'text',
            color: 'transparent',
          }}
          >
            {challenge.title}
          </Typography>
          <SendPrompt challengeTopic={challenge.title} challengeDescription={challenge.description} />

          {challenge.status ? (<FileUploader idChallenge={Number(id)} />) : <></>}
          <Grid container spacing={3}>
            {ImagesOfChallenge.map((image) => (
              <Grid
                item
                xs={12}
                sm={ImagesOfChallenge.length === 1 ? 8 : 6}
                md={ImagesOfChallenge.length === 1 ? 6 : ImagesOfChallenge.length === 2 ? 6 : 4}
                key={image.id}>
                <Paper sx={{ padding: 2, textAlign: "center", transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
                  <ImageViewer fileName={image.fileName} />
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
