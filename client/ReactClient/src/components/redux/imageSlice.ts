import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ImageType } from "../models/images";
import { RootState } from "./store";

export const getImageByChallengeId=createAsyncThunk('imagesByChallengeId/get',async(challengeId:number,thunkApi)=>{
    try{
const res=await axios.get(`http://localhost:5070/api/Image/challenge/${challengeId}`);
return res.data as ImageType[]
    }catch(error){
return thunkApi.rejectWithValue(error);
    }
})

export const imageSlice=createSlice({
    name:'iamges',
    initialState:{
        imagesByChallenge:[]as ImageType[],
        loading: true,
        error: null as string | null,
        },reducers:{

        },extraReducers(builder){
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
            })
        }
})

export const selectImagesByChallenge=(state:RootState)=>state.iamges.imagesByChallenge
// export const selectImages(state:RootState)=>state.iamges.imagesByChallenge
export const{actions}=imageSlice;
export default imageSlice;
