import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { CardMedia, Grid, Paper, Typography } from "@mui/material";
import ImageViewer from "../Pictures/imageViewr";
import { getTopImagesByChallenge } from "../redux/topImagesSlice";

const Winners=()=>{

    const dispatch=useDispatch<AppDispatch>();
    const winnersList=useSelector((state:RootState)=>state.topImages.topImages);
    useEffect(()=>{
        dispatch(getTopImagesByChallenge());
        // console.log(challengesList.values);   
//     console.log("in winnerrrrrr1111");
// console.log(winnersList.map(r=>{
//     r.fileName+"   "+r.title
// }));

    },[dispatch]);

    console.log("in winnerrrrrr1111");
    
return(<>

<Typography variant="h4" component="h2" align="center" gutterBottom>
                Our Winners
            </Typography>

   <Grid container spacing={2}>
            {winnersList.map((winner) => (
                // <Grid item xs={12} sm={4} md={4} key={winner.id}> {/* Adjusted to 4 for 3 cards per row */}
                //     <Card sx={{ width: '100%', boxShadow: 3 }}> {/* Set width to 100% */}
                <Grid item xs={12} sm={6} md={4} key={winner.id}>
                            <Paper sx={{ padding: 2, textAlign: "center", width:'100%'}}>
                        <CardMedia
                            component={ImageViewer}
                            fileName={winner.fileName}
                            sx={{ height: 200 }} // Adjust height as needed
                        />
                        {/* <CardContent> */}
                            <Typography variant="h6" component="div" gutterBottom>
                                {winner.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Winner: {winner.userName}
                            </Typography>
                        {/* </CardContent> */}
                    {/* </Card> */}
                    </Paper>
                </Grid>
            ))}
        </Grid>
</>)
}
export default Winners

{/* <Grid container spacing={2}>
            {winnersList.map((winner) => (
                <Grid item xs={12} sm={6} md={4} key={winner.id}>
                    <Typography variant="h6">{winner.title}</Typography>
                    <Typography variant="h6">{winner.userName}</Typography>
                    <ImageViewer fileName={winner.fileName} />
                </Grid>
            ))}
        </Grid> */}