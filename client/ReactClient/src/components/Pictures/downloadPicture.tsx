// import React, { useState } from 'react';
// import axios from 'axios';

// const DownloadImage = () => {
//     const [fileName, setFileName] = useState('');
//     const [downloadUrl, setDownloadUrl] = useState('');

//     const handleGetDownloadUrl = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5070/api/Image/getUrl`);
//             setDownloadUrl(response.data.Url);
//         } catch (error) {
//             console.error("Error fetching download URL", error);
//         }
//     };

//     return (
//         <div>
//             <input 
//                 type="text" 
//                 value={fileName} 
//                 onChange={(e) => setFileName(e.target.value)} 
//                 placeholder="Enter file name" 
//             />
//             <button onClick={handleGetDownloadUrl}>Get Download URL</button>
//             {downloadUrl && (
//                 <div>
//                     <a href={downloadUrl} target="_blank" rel="noopener noreferrer">Download Image</a>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DownloadImage;
