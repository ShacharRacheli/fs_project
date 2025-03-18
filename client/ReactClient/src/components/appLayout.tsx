import { Outlet } from "react-router"
import HomePage from "./homePage"
import NavBar from "./navBar"

const AppLayout=()=>{
return(<>
<HomePage/>
<NavBar/>
<Outlet/>
</>)
}
export default AppLayout