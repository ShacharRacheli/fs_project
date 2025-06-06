import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Box, Button, Modal, Typography, TextField, List, IconButton, Avatar, Paper, Divider, Fade,Fab,Tooltip, Zoom} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
const apiUrl = import.meta.env.VITE_APP_API_URL;
export default function SendPrompt({ challengeTopic, challengeDescription }: { challengeTopic: string; challengeDescription: string; }) {
    const [open, setOpen] = useState(false);
    const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const inputRef = useRef<null | HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [chat, open]);
    const handleOpen = async () => {
        setOpen(true);
        setChat([]); 
        await sendMessage("system", `You are a creative assistant on the Pic a Pick website, where users create AI images based on challenges and competing between themselves. Talk only about the website, challenges, inspiration, creativity, and ratings.`);
        await sendMessage("user", `The current challenge is: "${challengeTopic}". Challenge description: "${challengeDescription}". Give me prompt ideas.`);
    };
    const sendMessage = async (role: string, content: string) => {
        setChat((prev) => [...prev, {
            role, content
        }]
        );
        if (role === "user" || role === "system") {
            setLoading(true);
            try {
                const response = await axios.post(`${apiUrl}/api/OpenAiPrompt`,
                    { messages: [...chat, { role, content }] });
                const botReply = response.data.reply;
                setChat((prev) => [...prev, {
                    role: "assistant",
                    content: botReply,
                }]);
            } catch (err) {
                console.error("Error during chat:", err);
                setChat((prev) => [...prev, {
                    role: "assistant",
                    content: "Sorry, I encountered an error. Please try again.",
                }]);
            } finally {
                setLoading(false);
            }
        }
    };
    const handleSend = async () => {
        if (!input.trim()) return;
        await sendMessage("user", input.trim());
        setInput("");
    };
    const formatMessageContent = (content: string) => {
        return content.split('\n\n').map((paragraph, idx) => (
            <Typography key={idx} component="p" sx={{ mb: 1 }}>
                {paragraph}
            </Typography>
        ));
    };
    return (
        <>
        <Tooltip 
        title="Get Creative Ideas" 
        placement="left"
        TransitionComponent={Zoom}
        arrow
      >
        <Fab
          onClick={handleOpen}
          aria-label="chat"
          sx={{
            position: 'fixed',
            right: 30,
            bottom: 30,
            zIndex: 1000,
            background: 'linear-gradient(90deg, #9c27b0 0%, #7b1fa2 100%)',
            boxShadow: '0 4px 15px rgba(156, 39, 176, 0.4)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(90deg, #8e24aa 0%, #6a1b9a 100%)',
              boxShadow: '0 6px 20px rgba(156, 39, 176, 0.6)',
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          <ChatIcon />
        </Fab>
      </Tooltip>
<Modal
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Paper
                        elevation={24}
                        sx={{
                            width: { xs: '90%', sm: 550 },
                            maxHeight: '80vh',
                            margin: 'auto',
                            mt: { xs: 5, sm: 10 },
                            borderRadius: 4,
                            overflow: 'hidden',
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(128, 90, 213, 0.2)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                                p: 2,
                                background: 'linear-gradient(90deg, rgb(198 97 233) 0%, rgb(193 68 214) 100%)',
                                color: 'white',
                                borderBottom: '1px solid rgba(0,0,0,0.1)'
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                                <SmartToyIcon />
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={600}>Inspiration Assistant</Typography>
                                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                        Challenge: {challengeTopic}
                                    </Typography>
                                </Box>
                            </Box>
                            <IconButton onClick={() => setOpen(false)} sx={{ color: 'white' }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <List
                            sx={{
                                flexGrow: 1,
                                overflowY: 'auto',
                                p: 2,
                                background: '#f8f9fa',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {chat.filter(m => m.role !== 'system').map((message, i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: message.role === "user" ? "flex-end" : "flex-start",
                                        mb: 2,
                                        maxWidth: '100%'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            flexDirection: message.role === "user" ? 'row-reverse' : 'row',
                                            gap: 1,
                                            maxWidth: '85%'
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: message.role === "user" ? '#7B1FA2' : '#9575CD',
                                                width: 32,
                                                height: 32
                                            }}
                                        >
                                            {message.role === "user" ? <PersonIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
                                        </Avatar>

                                        <Box>
                                            <Paper
                                                elevation={1}
                                                sx={{
                                                    p: 2,
                                                    backgroundColor: message.role === "user" ? '#7B1FA2' : 'white',
                                                    color: message.role === "user" ? 'white' : '#212529',
                                                    borderRadius: message.role === "user"
                                                        ? '20px 20px 4px 20px'
                                                        : '20px 20px 20px 4px',
                                                    wordBreak: 'break-word'
                                                }}
                                            >
                                                {formatMessageContent(message.content)}
                                            </Paper>

                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    opacity: 0.7,
                                                    mt: 0.5,
                                                    display: 'block',
                                                    textAlign: message.role === "user" ? 'right' : 'left'
                                                }}
                                            >
                                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}

                            {loading && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        alignSelf: 'flex-start',
                                        ml: 6,
                                        mt: 1
                                    }}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        gap: 0.5,
                                        p: 1,
                                        borderRadius: 2,
                                        backgroundColor: 'white'
                                    }}>
                                        <Box sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            backgroundColor: '#9C27B0',
                                            animation: 'pulse 1s infinite ease-in-out',
                                            animationDelay: '0s',
                                            '@keyframes pulse': {
                                                '0%, 100%': { opacity: 0.5, transform: 'scale(0.8)' },
                                                '50%': { opacity: 1, transform: 'scale(1.2)' }
                                            }
                                        }} />
                                        <Box sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            backgroundColor: '#9C27B0',
                                            animation: 'pulse 1s infinite ease-in-out',
                                            animationDelay: '0.3s'
                                        }} />
                                        <Box sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            backgroundColor: '#9C27B0',
                                            animation: 'pulse 1s infinite ease-in-out',
                                            animationDelay: '0.6s'
                                        }} />
                                    </Box>
                                </Box>
                            )}
                            <div ref={messagesEndRef} />
                        </List>

                        <Divider />

                        <Box
                            display="flex"
                            gap={1}
                            p={2}
                            sx={{
                                backgroundColor: 'white',
                                borderTop: '1px solid rgba(0,0,0,0.08)'
                            }}
                        >
                            <TextField
                                fullWidth
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                                placeholder="Type your message..."
                                size="small"
                                inputRef={inputRef}
                                multiline
                                maxRows={3}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3,
                                        backgroundColor: '#f8f9fa',
                                        '& fieldset': {
                                            borderColor: 'rgba(0,0,0,0.1)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#9C27B0',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#9C27B0',
                                            borderWidth: 2
                                        },
                                    }
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                sx={{
                                    minWidth: 'unset',
                                    borderRadius: '50%',
                                    width: 40,
                                    height: 40,
                                    p: 0,
                                    background: input.trim() ? 'linear-gradient(90deg, rgb(156, 39, 176) 0%, rgb(186, 104, 200) 100%)' : '#e9ecef',
                                    color: input.trim() ? 'white' : '#adb5bd',
                                    '&:hover': {
                                        background: 'linear-gradient(90deg, rgb(171, 71, 188) 0%, rgb(142, 36, 170) 100%)',
                                    }
                                }}>
                                <SendIcon fontSize="small" />
                            </Button>
                        </Box>
                    </Paper>
                </Fade>
            </Modal>
        </>
    );
}