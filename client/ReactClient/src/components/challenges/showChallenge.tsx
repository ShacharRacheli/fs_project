import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { getChallengeById } from "../redux/challengeSlice";

const ShowChallenge=()=>{
const {id}=useParams();
const dispatch=useDispatch<AppDispatch>();
const challenge=useSelector((state:RootState)=>state.challenges.selectedChallenge);
useEffect(()=>{
    dispatch(getChallengeById(Number(id)));
},[])

return(<>

</>)
}
export default ShowChallenge