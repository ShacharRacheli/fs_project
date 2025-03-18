import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import ImageViewer from "../Pictures/imageViewr";
import { getTopImagesByChallenge } from "../redux/topImagesSlice";

const Winners=()=>{

    const dispatch=useDispatch<AppDispatch>();
    const winnersList=useSelector((state:RootState)=>state.topImages.topImages);
    useEffect(()=>{
        dispatch(getTopImagesByChallenge());
        // console.log(challengesList.values);   
    console.log("in winnerrrrrr1111");
console.log(winnersList.map(r=>{
    r.fileName+"   "+r.title
}));

    },[dispatch]);

    console.log("in winnerrrrrr1111");
    
return(<>


<Grid container spacing={2}>
            {winnersList.map((winner) => (
                <Grid item xs={12} sm={6} md={4} key={winner.id}>
                    <Typography variant="h6">{winner.title}</Typography>
                    <Typography variant="h6">{winner.userName}</Typography>
                    <ImageViewer fileName={winner.fileName} />
                </Grid>
            ))}
        </Grid>

</>)
}
export default Winners