import { Box, Typography, IconButton } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
    return (
        <footer>
            <Box 
                sx={{
                    backgroundColor: 'white', // שינוי צבע הרקע ללבן
                    color: 'black', // שינוי צבע הטקסט לשחור כדי שיהיה קריא
                    textAlign: 'center',
                    padding: 2,
                    position: 'fixed', // שינוי ל-fixed כדי להדביק אותו לתחתית
                    bottom: 0,
                    left: 0, // הוספת left כדי להדביק את הפוטר לשמאל
                    right: 0, // הוספת right כדי להדביק את הפוטר לימין
                    width: '100%', // לוודא שהפוטר תופס 100% רוחב
                }}
            >
                <Typography variant="body1">
                    © {new Date().getFullYear()} Pick A Pic. All rights reserved.
                </Typography>
                <Box sx={{ marginTop: 1 }}>
                    <IconButton 
                        color="inherit" 
                        href="https://www.youtube.com" 
                        target="_blank"
                    >
                        <YouTubeIcon />
                    </IconButton>
                    <IconButton 
                        color="inherit" 
                        href="https://www.facebook.com" 
                        target="_blank"
                    >
                        <FacebookIcon />
                    </IconButton>
                    <IconButton 
                        color="inherit" 
                        href="https://www.twitter.com" 
                        target="_blank"
                    >
                        <TwitterIcon />
                    </IconButton>
                </Box>
            </Box>
        </footer>
    );
};

export default Footer;
