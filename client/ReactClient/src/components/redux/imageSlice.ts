import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ImageType } from "../models/images";
import { RootState } from "./store";
const apiUrl = import.meta.env.VITE_API_URL;

export const getImageByChallengeId=createAsyncThunk('imagesByChallengeId/get',async(challengeId:number,thunkApi)=>{
    try{
const res=await axios.get(`${apiUrl}/Image/challenge/${challengeId}`);
// const res=await axios.get(`http://localhost:5070/api/Image/challenge/${challengeId}`);
return res.data as ImageType[]
    }catch(error){
return thunkApi.rejectWithValue(error);
    }
})

// const res=await axios.post(`http://localhost:5070/api/Image/CountVotes/${imageId}`);
export const addVote=createAsyncThunk('postVote/post',async({ userId, imageId ,challengeId}: { userId: number; imageId: number,challengeId:number },thunkApi)=>{
    try {

    const token =sessionStorage.getItem('token')
        // const res = 
        await axios.post(`${apiUrl}/Vote`, {
        // const res = await axios.post(`http://localhost:5070/api/Vote`, {
            userId,
            imageId
        },{
            headers: {
                Authorization: `Bearer ${token}` // הוספת הטוקן ל-header
      }});
        // return res.data;
        const updatedImages = await thunkApi.dispatch(getImageByChallengeId(challengeId)).unwrap();
        return updatedImages; 
    }catch(error){
return thunkApi.rejectWithValue(error);
    }
})
export const deleteVote=createAsyncThunk('deleteVote/delete',async({ userId, imageId ,challengeId}: { userId: number; imageId: number ,challengeId:number},thunkApi)=>{
try{
    const token =sessionStorage.getItem('token')
    // const res = 
    await axios.delete(`${apiUrl}/Vote/deleteVote`, {
        // const res = await axios.delete(`http://localhost:5070/api/Vote/deleteVote`, {
        data: { userId, imageId } ,// Sending both values in the request body
        headers: {
            Authorization: `Bearer ${token}` // הוספת הטוקן ל-header
        }
    });
    // getImageByChallengeId(challengeId);
    // return res.data;
    const updatedImages = await thunkApi.dispatch(getImageByChallengeId(challengeId)).unwrap();
    return updatedImages;
}catch(error){
return thunkApi.rejectWithValue(error);
}
})
// http://localhost:5070/api/Vote/deleteVote

export const imageSlice=createSlice({
    name:'images',
    initialState:{
        imagesByChallenge:[]as ImageType[],
        loading: true,
        error: null as string | null,
        },reducers:{
        },
        extraReducers(builder){
            builder.addCase(getImageByChallengeId.pending, (state) => {
                state.loading = true,
                    state.error = null
            }).addCase(getImageByChallengeId.fulfilled, (state, action: PayloadAction<ImageType[]>) => {
                state.loading = false,
                    state.error = null,
                    state.imagesByChallenge = action.payload
            }).addCase(getImageByChallengeId.rejected, (state) => {
                state.loading = false,
                    state.error = "Failed to load images"
            }).addCase(addVote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addVote.fulfilled, (state, action: PayloadAction<ImageType[]>) => {
                state.loading = false;
                state.error = null;
                state.imagesByChallenge = action.payload; // עדכון התמונות לאחר הצבעה
            })
            .addCase(addVote.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to add vote";
            })
            .addCase(deleteVote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteVote.fulfilled, (state, action: PayloadAction<ImageType[]>) => {
                state.loading = false;
                state.error = null;
                state.imagesByChallenge = action.payload; // עדכון התמונות לאחר מחיקת הצבעה
            })
            .addCase(deleteVote.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to delete vote";
            });
        }
})

export const selectImagesByChallenge=(state:RootState)=>state.images.imagesByChallenge;
export const selectAddVote=(state:RootState)=>state.images.imagesByChallenge;
export const selectDeleteVote=(state:RootState)=>state.images.imagesByChallenge;
// export const selectImages(state:RootState)=>state.iamges.imagesByChallenge
export const{actions}=imageSlice;
export default imageSlice;
