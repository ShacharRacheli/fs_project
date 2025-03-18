import { Box, Button } from "@mui/material"
import { getUserIdByToken } from "../store/getFromToken"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addVote, deleteVote } from "../redux/imageSlice";

const Vote=({imageId,challengeId}:{imageId:number,challengeId:number})=>{
const userId=getUserIdByToken()
const dispatch=useDispatch<AppDispatch>();
const vote=useSelector((state:RootState)=>state.images.imagesByChallenge);
// const deleteVote=useSelector((state:RootState)=>state.iamges.imagesByChallenge);
const clickAddVote=()=>{
    dispatch(addVote({userId,imageId,challengeId}))
}
const clickDeleteVote=()=>{
    dispatch(deleteVote({userId,imageId,challengeId}))
}
return(<>

<Button onClick={clickAddVote}>☝️</Button>
<Box></Box>
<Button onClick={clickDeleteVote}>👇</Button>
</>)
}
export default Vote