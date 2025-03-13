// React Component
import React, { useState } from 'react';
import axios from 'axios';
import { getUserIdByToken } from '../store/getFromToken';

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
const token=sessionStorage.getItem('token')
      // שלב 1: קבלת Presigned URL מהשרת
      const response = await axios.get('http://localhost:5070/api/Image/presigned-url', {
        params: { 
            fileName: file.name,
            contentType: file.type // Add contentType to the request++++++++++++++++++
         }, headers: {
          'Content-Type': file.type,
 'Authorization': `Bearer ${token}`
        },
      });

      const presignedUrl = response.data.url;
console.log(presignedUrl);

      // שלב 2: העלאת הקובץ ישירות ל-S3
      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
 'Authorization': `Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percent);
        },
      });
      const imageData = {
        imageUrl: presignedUrl,
        userId:getUserIdByToken(),
       challengeId:0,//=??????????????????????????????????????
        // הוסף כאן שדות נוספים אם יש צורך
      };

      await axios.post('http://localhost:5070/api/Image/addImageToDB', imageData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert('הקובץ הועלה בהצלחה!');
    } catch (error) {
      console.error('שגיאה בהעלאה:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>העלה קובץ</button>
      {progress > 0 && <div>התקדמות: {progress}%</div>}
    </div>
  );
};

export default FileUploader;

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
