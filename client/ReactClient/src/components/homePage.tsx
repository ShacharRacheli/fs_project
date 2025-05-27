import './homePage.css'
import { Typography, Box, Container, Paper, Button, Grid, Divider } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import BoltIcon from '@mui/icons-material/Bolt';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
      navigate('/allChallenges'); 
  };

  return (
    <>
      <Box className="hero-section">
        <div className="backgroundImage">
          <img src="./bg.jpg" alt="Background" />
          <Box className="hero-content">
            <Typography variant="h1" className="hero-title">
              Pick a Pic
            </Typography>
            <Typography variant="h2" className="hero-subtitle">
              AI Image Challenge Community
            </Typography>
            <Box mt={4} className="cta-buttons">
              <Button 
                variant="contained" 
                className="main-cta"
                size="large"
                startIcon={<ImageIcon />}
                onClick={handleNavigate} 
              >
                Explore Challenges
              </Button>
            </Box>
          </Box>
        </div>
      </Box>

      <Container maxWidth="lg" className="about-section">
        <Box textAlign="center" mb={8}>
          <Typography variant="h3" className="section-title">
            How It Works
          </Typography>
          <Divider className="title-divider" />
        </Box>

        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper elevation={3} className="feature-card">
              <Box className="feature-icon-container">
                <BoltIcon className="feature-icon" />
              </Box>
              <Typography variant="h5" className="feature-title">
                Weekly Challenges
              </Typography>
              <Typography className="feature-description">
                Every week, a new AI image generation challenge is presented to the community.
                Get inspired and put your creativity to work!
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} className="feature-card">
              <Box className="feature-icon-container">
                <ImageIcon className="feature-icon" />
              </Box>
              <Typography variant="h5" className="feature-title">
                Create & Share
              </Typography>
              <Typography className="feature-description">
                Generate amazing AI images based on the challenge theme and share
                your unique creations with the community.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} className="feature-card">
              <Box className="feature-icon-container">
                <HowToVoteIcon className="feature-icon" />
              </Box>
              <Typography variant="h5" className="feature-title">
                Vote & Win
              </Typography>
              <Typography className="feature-description">
                Vote for your favorite images created by other members and
                get votes for your own creation to win the challenge!
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Rules Section */}
      <Box className="rules-section">
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" className="section-title">
                Community Guidelines
              </Typography>
              <Divider className="title-divider" sx={{ mb: 4 }} />
              
              <Box className="rule-item">
                <Typography variant="h6" className="rule-title">
                  Stay On Theme
                </Typography>
                <Typography className="rule-description">
                  Your image must follow the current challenge theme to be eligible.
                </Typography>
              </Box>
              
              <Box className="rule-item">
                <Typography variant="h6" className="rule-title">
                  One Entry Per Challenge
                </Typography>
                <Typography className="rule-description">
                  No duplicate uploads – only one submission per user for each challenge.
                </Typography>
              </Box>
              
              <Box className="rule-item">
                <Typography variant="h6" className="rule-title">
                  Fair Voting
                </Typography>
                <Typography className="rule-description">
                  You can't vote twice for the same image or vote for your own submission.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box className="trophy-container">
                <EmojiEventsIcon className="trophy-icon" />
                <Typography variant="h4" className="trophy-text">
                  Winners receive special recognition and exclusive perks!
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="cta-section">
        <Container component="div"  maxWidth="md"  style={{ textAlign:"center"}}>
          <Typography variant="h3" className="cta-title">
            Ready to showcase your creativity?
          </Typography>
          <Typography variant="h6" className="cta-subtitle">
            Join our community of AI artists and participate in exciting weekly challenges!
          </Typography>
          
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
