import { Outlet } from "react-router"
import NavBar from "./navBar"
import Footer from "./footer"
// import HomePage from "./homePage"

const AppLayout=()=>{
return(<>
{/* <HomePage/> */}
<NavBar/>
<Outlet/>
<Footer/>
</>)
}
export default AppLayout