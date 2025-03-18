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
// // export default DownloadImage;
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const ChallengeDetails = () => {
//     const { id } = useParams();
//     const [challenge, setChallenge] = useState(null);
//     const [images, setImages] = useState([]);

//     useEffect(() => {
//         const fetchChallengeData = async () => {
//             try {
//                 const { data: challengeData } = await axios.get(`http://your-api.com/challenges/${id}`);
//                 const { data: imagesData } = await axios.get(`http://your-api.com/challenges/${id}/images`);

//                 setChallenge(challengeData);
//                 setImages(imagesData);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchChallengeData();
//     }, [id]);

//     if (!challenge) return <p>טוען...</p>;

//     return (
//         <div>
//             <h2>{challenge.title}</h2>
//             <p>{challenge.instructions}</p>
//             <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//                 {images.map((url, index) => (
//                     <img key={index} src={url} alt={Challenge ${id}} width="200" />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ChallengeDetails;

//==========
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const ChallengeDetails = () => {
//     const { id } = useParams();
//     const [challenge, setChallenge] = useState(null);
//     const [images, setImages] = useState([]);

//     useEffect(() => {
//         const fetchChallengeData = async () => {
//             try {
//                 const { data: challengeData } = await axios.get(`http://your-api.com/challenges/${id}`);
//                 const { data: imagesData } = await axios.get(`http://your-api.com/challenges/${id}/images`);

//                 setChallenge(challengeData);
//                 setImages(imagesData);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchChallengeData();
//     }, [id]);

//     // פונקציה להורדת תמונה
//     const downloadImage = async (imageUrl) => {
//         try {
//             const response = await axios.get(imageUrl, { responseType: "blob" });
//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement("a");
//             link.href = url;
//             link.setAttribute("download", image-${id}.jpg); // שם הקובץ שיורד
//             document.body.appendChild(link);
//             link.click();
//             link.parentNode.removeChild(link);
//         } catch (error) {
//             console.error("Error downloading image:", error);
//         }
//     };

//     if (!challenge) return <p>טוען...</p>;

//     return (
//         <div>
//             <h2>{challenge.title}</h2>
//             <p>{challenge.instructions}</p>
//             <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//                 {images.map((url, index) => (
//                     <div key={index} style={{ textAlign: "center" }}>
//                         <img src={url} alt={Challenge ${id}} width="200" />
//                         <br />
//                         <button onClick={() => downloadImage(url)}>📥 הורד</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ChallengeDetails;

// import { useParams } from "react-router";
// import { useSelector } from "react-redux";

// const ChallengeDetails = () => {
//     const { id } = useParams();
    
//     // נשלוף את רשימת האתגרים מ-Redux
//     const challenges = useSelector((state) => state.challenges);
    
//     // נמצא את האתגר הרלוונטי לפי ה-ID
//     const challenge = challenges.find((ch) => ch.id === Number(id));

//     if (!challenge) return <p>🔄 טוען...</p>;

//     return (
//         <div>
//             <h2>{challenge.title}</h2>
//             <p>{challenge.instructions}</p>
//             <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//                 {challenge.images.map((url, index) => (
//                     <div key={index} style={{ textAlign: "center" }}>
//                         <img src={url} alt={Challenge ${id}} width="200" />
//                         <br />
//                         <a href={url} download={image-${id}.jpg} target="_blank" rel="noopener noreferrer">
//                             📥 הורד
//                         </a>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ChallengeDetails;