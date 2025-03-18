import { AppBar, Box,  Toolbar } from "@mui/material"
import { Link } from "react-router"
const NavBar=()=>{

return(<>
  <AppBar
      position="fixed"
      sx={{
        top: 5,
        right: 5,
        width: "auto",
        background: "linear-gradient(90deg,rgb(88, 242, 183),rgb(243, 96, 196))", // מעבר צבעים
        borderRadius: 2,
      }}
    >
      <Toolbar sx={{ padding: "0 10px" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link to='/' style={{ color: 'rgb(0, 0, 0)', margin: '0 10px' }}>Home</Link> |
          <Link to='/allChallenges' style={{ color: 'rgb(0, 0, 0)', margin: '0 10px' }}>Challenges</Link>|
          <Link to='/winners' style={{ color: 'rgb(0, 0, 0)', margin: '0 10px' }}>Winners</Link>
        </Box>
      </Toolbar>
    </AppBar>
</>)

}
export default NavBar