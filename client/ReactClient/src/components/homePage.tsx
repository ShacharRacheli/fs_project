import { Typography } from "@mui/material";
import './homePage.css'
// import Footer from "./footer";
const HomePage=()=>{
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
return(<>
 <div className="backgroundImage">
                <img src="./bg.jpg" alt="" />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '5.6rem',
                    fontWeight: 'bold',
                    color: 'purple',
                    textShadow: '0 0 5px purple, 0 0 10px #f798ff;',
                    animation: 'glow 1.5s infinite alternate',
                    fontFamily:'cursive',
                }}>
                    Welcome to Pick A Pic!!
                </Typography>
            </div>
            </div>
 <div style={{textAlign:'center'}}>
  <Typography sx={{ fontSize: '3.4rem', mb: 3, fontFamily:'cursive',color: '#a621b1' }}>
    About us:
  </Typography>
 <Typography variant="body1" sx={{ fontSize: '1.5rem', mb: 3, color: '#333' }}>
            Every week, a new AI image challenge is presented.  
            <br />Registered users can share their AI-generated creations.  
            <br />Vote for your favorite images and help decide the winner!  
            <br />The winning image will be announced, and the winner will receive a special email notification!
          </Typography>

          <Typography variant="body1" sx={{ fontSize: '1.6rem', fontWeight: 'bold',fontFamily:'cursive', color: '#f798ff' }}>
            Rules to keep it going!  
          </Typography>

          <Typography variant="body2" sx={{ fontSize: '1.2rem', color: '#333' }}>
             Your image must follow the challenge theme.  
            <br /> No duplicate uploads – only one entry per user.  
            <br /> You can't vote twice for the same image!  
            <br/>You can't vote for your own image!
          </Typography>
        </div>
            {/* <img src='./pickbg.png' alt="Slider" style={{ width: '100%', height: '100%' }} /> */}
  {/* <img src="./pic1.jpg"/> */}
        {/* <Box> */}
          {/* every week we have different challenges  */}
        {/* </Box> */}
     {/* <Footer/> */}
</>)
}
export default HomePage
 {/* <Typography sx={{ fontSize: '2.9rem',
                fontWeight: 'bold',
                color: 'purple',
                textShadow: '0 0 5px purple, 0 0 10px #f798ff;',
                animation: 'glow 1.5s infinite alternate',
              
                }}>Welcome to Pick A Pic!!</Typography> */}