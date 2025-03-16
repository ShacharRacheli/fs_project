import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getChallenges } from "../redux/challengeSlice";
import { useEffect } from "react";

const TopImageForChallenge=()=>{

    const dispatch=useDispatch<AppDispatch>();
    const challengesList=useSelector((state:RootState)=>state.challenges.list);
    useEffect(()=>{
        dispatch(getChallenges());
        // console.log(challengesList.values);        
    },[]);
return(<>




</>)
}
export default TopImageForChallenge