import { Box, Typography, IconButton } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
    return (
        <footer style={{
            textAlign: 'center',
            backgroundColor: 'white',
            color: 'black', // צבע טקסט שחור כדי שיהיה קריא על רקע לבן
            padding: '20px 20px',
            // position: 'fixed', // דבק את הפוטר לתחתית
            // bottom: 0,
            // left: 0,
            // right: 0,
            fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif',
        }}>
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
        </footer>
    );
};

export default Footer;
