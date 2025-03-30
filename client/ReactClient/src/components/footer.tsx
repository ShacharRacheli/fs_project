import { Box, Typography, IconButton } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
    return (
        <footer >
        <Box 
            sx={{
                backgroundColor: 'purple',
                color: 'white',
                textAlign: 'center',
                padding: 2,
                position: 'relative',
                bottom: 0,
                width: '100%',
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
