// import { useState } from "react"
// import { Box, Button, Modal, CircularProgress, Typography, List, ListItem } from "@mui/material"
// const apiUrl = import.meta.env.VITE_APP_API_URL;

// export default function SendPrompt({ challengeTopic ,challengeDescription}: { challengeTopic: string ,challengeDescription:string}) {
//   const [open, setOpen] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [suggestions, setSuggestions] = useState<string[]>([])

//   const handleClick = async () => {
//     setOpen(true)
//     setLoading(true)

//     try {
//       const response = await fetch(`${apiUrl}/api/OpenAiPrompt`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ topic: challengeTopic , description: challengeDescription})
//       })

//       const data = await response.json()
//       setSuggestions(data.prompts)
//     } catch (err) {
//       console.error("Error fetching prompts:", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <>
//       <Button onClick={handleClick} variant="outlined" sx={{
//         textTransform: 'none',
//         borderColor: 'pink',
//         color: 'black',
//         backgroundColor: 'transparent',
//         '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' }
//       }}>
//         צריך השראה?
//       </Button>

//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={{
//           padding: 4,
//           backgroundColor: 'white',
//           width: 400,
//           maxHeight: 500,
//           overflowY: 'auto',
//           margin: 'auto',
//           marginTop: 10,
//           borderRadius: 2
//         }}>
//           <Typography variant="h6" mb={2}>הצעות לפרומפטים לאתגר:</Typography>

//           {loading ? (
//             <Box display="flex" justifyContent="center"><CircularProgress /></Box>
//           ) : (
//             <List>
//               {suggestions.map((s, i) => (
//                 <ListItem key={i} sx={{ paddingLeft: 0 }}>{i + 1}. {s}</ListItem>
//               ))}
//             </List>
//           )}
//         </Box>
//       </Modal>
//     </>
//   )
// }
import { useState } from "react";
import axios from "axios"; 
import { Box, Button, Modal, CircularProgress, Typography,  TextField } from "@mui/material";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function SendPrompt() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>([]);
  const [userInput, setUserInput] = useState('');

  const handleUserInputSubmit = async () => {
    if (!userInput) return;

    setChatHistory([...chatHistory, { user: userInput, bot: '' }]);
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/api/OpenAiPrompt`, {
        userQuestion: userInput, // שלח את השאלה של המשתמש
      });

      const botResponse = response.data.prompts.join(', ');
      setChatHistory(prev => prev.map((chat, index) => index === chatHistory.length - 1 ? { ...chat, bot: botResponse } : chat));
      setUserInput('');
    } catch (err) {
      console.error("Error fetching prompts:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outlined">
        Start Chat
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          padding: 4,
          backgroundColor: 'white',
          width: 400,
          maxHeight: 500,
          overflowY: 'auto',
          margin: 'auto',
          marginTop: 10,
          borderRadius: 2
        }}>
          <Typography variant="h6" mb={2}>
            Chat with the bot:
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center"><CircularProgress /></Box>
          ) : (
            <Box>
              {chatHistory.map((chat, index) => (
                <div key={index}>
                  <Typography variant="body1"><strong>User:</strong> {chat.user}</Typography>
                  <Typography variant="body1"><strong>Bot:</strong> {chat.bot}</Typography>
                </div>
              ))}
            </Box>
          )}

          <TextField
            label="Ask something..."
            variant="outlined"
            fullWidth
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? handleUserInputSubmit() : null}
          />
          <Button onClick={handleUserInputSubmit} variant="contained" sx={{ marginTop: 2 }}>
            Send
          </Button>
        </Box>
      </Modal>
    </>
  );
}

// import { useState } from "react";
// import axios from "axios"; 
// import { Box, Button, Modal, CircularProgress, Typography, List, ListItem } from "@mui/material";

// const apiUrl = import.meta.env.VITE_APP_API_URL;

// export default function SendPrompt({ challengeTopic, challengeDescription }: { challengeTopic: string; challengeDescription: string; }) {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState<string[]>([]);

//   const handleClick = async () => {
//     setOpen(true);
//     setLoading(true);

//     try {
//       const response = await axios.post(`${apiUrl}/api/OpenAiPrompt`, {
//         topic: challengeTopic,
//         description: challengeDescription,
//       });

//       setSuggestions(response.data.prompts); // Access data from Axios response
//     } catch (err) {
//       console.error("Error fetching prompts:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Button onClick={handleClick} variant="outlined" sx={{
//         textTransform: 'none',
//         borderColor: 'pink',
//         color: 'black',
//         backgroundColor: 'transparent',
//         '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' }
//       }}>
// Need inspiration?
//       </Button>

//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={{
//           padding: 4,
//           backgroundColor: 'white',
//           width: 400,
//           maxHeight: 500,
//           overflowY: 'auto',
//           margin: 'auto',
//           marginTop: 10,
//           borderRadius: 2
//         }}>
//           <Typography variant="h6" mb={2}>
//           Suggestions for challenge prompts:
//             </Typography>

//           {loading ? (
//             <Box display="flex" justifyContent="center"><CircularProgress /></Box>
//           ) : (
//             <List>
//               {suggestions.map((s, i) => (
//                 <ListItem key={i} sx={{ paddingLeft: 0 }}>{i + 1}. {s}</ListItem>
//               ))}
//             </List>
//           )}
//         </Box>
//       </Modal>
//     </>
//   );
// }

