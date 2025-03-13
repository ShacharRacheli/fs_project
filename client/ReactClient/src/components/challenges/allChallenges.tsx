import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { useEffect } from "react";
import { getChallenges } from "../redux/challengeSlice";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const AllChallenges=()=>{
const dispatch=useDispatch<AppDispatch>();
const challengesList=useSelector((state:RootState)=>state.challenges.list);


useEffect(()=>{
    dispatch(getChallenges());
},[]);


return(<>
 <Typography variant="h4" sx={{ margin: 2 }}>
                Challenges List
            </Typography>
            <List>
                {Array.isArray(challengesList) && challengesList.length > 0 ? (
                    challengesList.map((challenge) => (
                        <ListItem key={challenge.challengeId}>
                            <ListItemText primary={challenge.title} secondary={challenge.description} />
                        </ListItem>
                    ))
                ) : (
                    <Typography sx={{ padding: 2 }}>No challenges available.</Typography>
                )}
            </List>
</>)
}
export default AllChallenges