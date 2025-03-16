import { Outlet } from "react-router"
import NavBar from "./navBar"
import HomePage from "./homePage"

const AppLayout=()=>{
return(<>
<HomePage/>
<NavBar/>
<Outlet/>
</>)
}
export default AppLayout