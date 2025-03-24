import {  IconButton } from "@mui/material"
import { getUserIdByToken } from "../store/getFromToken"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addVote, deleteVote } from "../redux/imageSlice";
import {  useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
const apiUrl = import.meta.env.VITE_API_URL;

const Vote=({imageId,challengeId}:{imageId:number,challengeId:number})=>{
const userId=getUserIdByToken();
const dispatch=useDispatch<AppDispatch>();
const vote=useSelector((state:RootState)=>state.images.imagesByChallenge);
  const challenge = useSelector((state: RootState) => state.challenges.selectedChallenge);
  const [isVote,setIsVote]=useState(true);
  const [token,setToken]=useState<string|null>(sessionStorage.getItem('token'))
  const isTokenPresent = !!token;
//   useEffect(()=>{
// //       dispatch(getChallengeById(challengeId));
// setToken(sessionStorage.getItem('token') || null);
// },[token])
const clickAddVote=()=>{
    dispatch(addVote({userId,imageId,challengeId}))
    setIsVote(false)
}
const clickDeleteVote=()=>{
    dispatch(deleteVote({userId,imageId,challengeId}))
    setIsVote(true)
}
const isChallengeActive = challenge?.status ? true : false;
console.log(isChallengeActive);
console.log(challenge);


return(<>
 <IconButton 
                onClick={clickAddVote} 
                sx={{ color: "purple", opacity: isVote ? 1 : 0.5 }} 
                // disabled={!isVote}
                disabled={!isVote || !isChallengeActive||!token} 
            >
                <AddIcon />
            </IconButton>
            <IconButton 
                onClick={clickDeleteVote} 
                sx={{ color: "purple", opacity: isVote ? 0.5 : 1 }} 
                // disabled={isVote}
                disabled={isVote || !isChallengeActive||!token} 
            >
                <HorizontalRuleIcon />
            </IconButton>
            {/* <Box></Box> */}
  {/* {isVote ? (
                <IconButton onClick={clickAddVote} sx={{color:"purple"}}>
                    <AddIcon />
                </IconButton>
            ) : (
                <IconButton onClick={clickDeleteVote} sx={{color:"purple"}} >
                    <HorizontalRuleIcon />
                </IconButton>
            )}
            <Box></Box> */}
</>)
}
export default Vote

{/* {isVote&&
<Button onClick={clickAddVote}>☝️</Button>
}
<Box></Box>
{!isVote&&
<Button onClick={clickDeleteVote}>👇</Button>
} */}