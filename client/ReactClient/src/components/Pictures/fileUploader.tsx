// React Component
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { getUserIdByToken } from '../store/getFromToken';
import { Box, Button, Card, CardMedia, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { getImageByChallengeId } from '../redux/imageSlice';
const apiUrl = import.meta.env.VITE_APP_API_URL;


// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

const FileUploader = ({ idChallenge }: { idChallenge: number }) => {
  // const FileUploader = ({idChallenge,setImages}:{idChallenge:number,setImages: React.Dispatch<SetStateAction<any[]>>}) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(selectedFile)); // יצירת URL לתצוגה מקדימה
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    let presignedUrl;
    try {
      const token = sessionStorage.getItem('token')
      try {
      const response = await axios.get(`${apiUrl}/api/Image/presigned-url`, {
        params: {
          fileName: file.name,
          contentType: file.type,
          challengeId: idChallenge,
        }, headers: {
          'Content-Type': file.type,
          'Authorization': `Bearer ${token}`
        },
      });
       presignedUrl = response.data.url;
    }catch(error){
      const axiosError = error as AxiosError;
      alert(axiosError.response?.data);
      return;
    }

    try{
      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percent);
        },
      });
    }catch(error){
      const axiosError = error as AxiosError;
      alert(axiosError.response?.data);
      return;
    }
      const imageUrl = presignedUrl.split('?')[0];
      const imageData = {
        imageUrl: imageUrl, // Use the base URL here
        userId: getUserIdByToken(),
        challengeId: idChallenge,
        fileName: file.name,
      };
      //  const res=
      await axios.post(`${apiUrl}/api/Image/addImageToDB`, imageData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // const newImage= res.data.newImage;
      // console.log(newImage);      
      // setImages((prevImages) => [...prevImages, newImage]);     
      alert('File uploaded successfully!');
      dispatch(getImageByChallengeId(idChallenge));
    } catch (error) {
      console.error('שגיאה בהעלאה:', error);
      alert('There was an error while uploading plese try later');
    }
  };
  // const HiddenInput = styled('input')({
  //   display: 'none',
  // });

  {/* <input type="file" onChange={handleFileChange} />
  <button onClick={handleUpload}>העלה קובץ</button>
  {progress > 0 && <div>התקדמות: {progress}%</div>}
*/}
  return (
    <Box>
      <label htmlFor="file-upload">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          sx={{
            backgroundColor: 'purple',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgb(210 118 214)',
            },
          }}
        // disabled={!token}
        >
          {file ? file.name : 'Select a file'}
        </Button>
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        onClick={(event) => {
          event.stopPropagation();
        }}
        style={{ display: 'none' }} // Hidden input
      />
      <Button
        onClick={handleUpload}
        variant="outlined"
        disabled={!file}
        sx={{
          borderColor: 'purple',
          color: 'purple',
          '&:hover': {
            backgroundColor: 'purple',
            color: 'white',
          },
        }}
      >
        upload file
      </Button>
      {progress > 0 && (
        <Typography sx={{ color: 'purple', fontWeight: 'bold' }}>
          progress: {progress}%
        </Typography>
      )}
      {imagePreview && (
         <Card sx={{ maxWidth: 250 }}>
         <CardMedia component="img" height="140" image={imagePreview} alt="Preview" />
       </Card>
        // <img src={imagePreview} alt="Preview" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />
      )}
    </Box>
  );
};

export default FileUploader;
//     <div>
// <div>
//       <label htmlFor="file-upload">
//         <Button
//           variant="contained"
//           component="span"
//           startIcon={<CloudUploadIcon />}
//         >
//           {file ? file.name : 'בחר קובץ'}
//         </Button>
//       </label>
//       <HiddenInput
//         id="file-upload"
//         type="file"
//         onChange={handleFileChange}
//         onClick={(event) => {
//           event.stopPropagation();
//         }}
//       />
//       <Button onClick={handleUpload} variant="outlined" disabled={!file}>
//         העלה קובץ
//       </Button>
//       {progress > 0 && <div>התקדמות: {progress}%</div>}
//     </div>
//     </div>
//     <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
//     <Typography variant="h6" gutterBottom>
//       העלאת קובץ לאתגר {idChallenge}
//     </Typography>
//     <input type="file" onChange={handleFileChange} style={{ marginBottom: '10px' }} />
//     <Button variant="contained" color="primary" onClick={handleUpload} disabled={!file}>
//       העלה קובץ
//     </Button>
//     {progress > 0 && (
//       <Typography variant="body2" sx={{ marginTop: 2 }}>
//         התקדמות: {progress}%
//       </Typography>
//     )}
//   </Box>

// import React, { useRef, useState } from 'react';
// import axios from 'axios';

// const UploadImage = () => {
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const [challengeId, setChallengeId] = useState('');

//     const handleUpload = async (e:any) => {
//         e.preventDefault();
//         const file = fileInputRef.current?.files?.[0];
//         if (!file) {
//             alert("Please select a file to upload.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append('File', file);
//         formData.append('ChallengeId', challengeId);

//         try {
//             const response = await axios.post('http://localhost:5070/api/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             console.log('File uploaded successfully:', response.data);
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             alert('Error uploading file');
//         }
//     };

//     return (
//         <form onSubmit={handleUpload}>
//             <input type="file" ref={fileInputRef} />
//             <input
//                 type="text"
//                 placeholder="Challenge ID"
//                 value={challengeId}
//                 onChange={(e) => setChallengeId(e.target.value)}
//             />
//             <button type="submit">Upload</button>
//         </form>
//     );
// };

// export default UploadImage;
