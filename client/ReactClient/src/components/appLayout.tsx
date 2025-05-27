import { Outlet } from "react-router"
import NavBar from "./navBar"
const AppLayout=()=>{
return(<>
<NavBar/>
<Outlet/>
</>)
}
export default AppLayout