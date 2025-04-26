// import { Typography } from "@mui/material";
import './homePage.css'
// import Footer from "./footer";
// const HomePage=()=>{
//   const images = [
// './pic1.jpg',
// ];
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [succeed, setSucceed] = useState(false)
    // const LoginSucceed = () => setSucceed(true)  
    // const IsToken=()=>{
    //     const token = sessionStorage.getItem('token');
    //     if (token) {
    //         setIsAuthenticated(true);
    //         console.log(isAuthenticated);            
    //     }
    // }
    //   useEffect(() => {
    //     const token = sessionStorage.getItem('token');
    //     if (token) {
    //         setIsAuthenticated(true);
    //         console.log(isAuthenticated);            
    //     }
    // }, []);
    // const handleLogout = () => {
    //     sessionStorage.removeItem('token');
    //     setIsAuthenticated(false);
    //     console.log("hghghghghgh");
        
    // };
    // const [currentIndex, setCurrentIndex] = useState(0);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    //     }, 3000); // Change image every 3 seconds

    //     return () => clearInterval(interval); // Cleanup on unmount
    // }, [images.length]);
    // const divStyle = {
    //   backgroundImage: 'url(./pickbg.png)',
    //   backgroundSize: 'cover', // Change to contain to avoid cutting
    //   backgroundPosition: 'center',
    //   height: '100vh', // Full height of the viewport
    //   width: '100%', // Full width
    //   backgroundRepeat: 'no-repeat', // Prevent the image from repeating

    // };
import { Typography, Box, Container, Paper, Button, Grid, Divider } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import BoltIcon from '@mui/icons-material/Bolt';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
      navigate('/allChallenges'); // Specify the path you want to navigate to
  };

  return (
    <>
      {/* Hero Section with Background Image */}
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
              {/* <Button 
                variant="outlined" 
                className="secondary-cta"
                size="large"
              >
                Join Now
              </Button> */}
            </Box>
          </Box>
        </div>
      </Box>

      {/* About Section */}
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
{/*               
              <Box mt={4}>
                <Button variant="contained" className="secondary-button">
                  View Full Guidelines
                </Button>
              </Box> */}
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

      {/* Call to Action */}
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
// return(<>
//  <div className="backgroundImage">
//                 <img src="./bg.jpg" alt="" />
//                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
//                 <Typography sx={{ fontSize: '5.6rem',
//                     fontWeight: 'bold',
//                     color: 'purple',
//                     textShadow: '0 0 5px purple, 0 0 10px #f798ff;',
//                     animation: 'glow 1.5s infinite alternate',
//                     fontFamily:'cursive',
//                 }}>
//                     Welcome to Pick A Pic!!
//                 </Typography>
//             </div>
//             </div>
//  <div style={{textAlign:'center'}}>
//   <Typography sx={{ fontSize: '3.4rem', mb: 3, fontFamily:'cursive',color: '#a621b1' }}>
//     About us:
//   </Typography>
//  <Typography variant="body1" sx={{ fontSize: '1.5rem', mb: 3, color: '#333' }}>
//             Every week, a new AI image challenge is presented.  
//             <br />Registered users can share their AI-generated creations.  
//             <br />Vote for your favorite images and help decide the winner!  
//             <br />The winning image will be announced, and the winner will receive a special email notification!
//           </Typography>

//           <Typography variant="body1" sx={{ fontSize: '1.6rem', fontWeight: 'bold',fontFamily:'cursive', color: '#f798ff' }}>
//             Rules to keep it going!  
//           </Typography>

//           <Typography variant="body2" sx={{ fontSize: '1.2rem', color: '#333' }}>
//              Your image must follow the challenge theme.  
//             <br /> No duplicate uploads – only one entry per user.  
//             <br /> You can't vote twice for the same image!  
//             <br/>You can't vote for your own image!
//           </Typography>
//         </div>
// </>)
// }
// export default HomePage
///////////////////////////=============================
{/* <img src='./pickbg.png' alt="Slider" style={{ width: '100%', height: '100%' }} /> */}
{/* <img src="./pic1.jpg"/> */}
{/* <Box> */}
{/* every week we have different challenges  */}
{/* </Box> */}
{/* <Footer/> */}
 {/* <Typography sx={{ fontSize: '2.9rem',
                fontWeight: 'bold',
                color: 'purple',
                textShadow: '0 0 5px purple, 0 0 10px #f798ff;',
                animation: 'glow 1.5s infinite alternate',
              
                }}>Welcome to Pick A Pic!!</Typography> */}