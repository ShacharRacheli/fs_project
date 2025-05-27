import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TopImagesType } from "../models/topImages";
import { ChallengeType } from "../models/challenge";
import { RootState } from "./store";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const getTopImagesByChallenge = createAsyncThunk('topImagesByChallenge/get', async (_, thunkApi) => {
    try {
        const res = await axios.get(`${apiUrl}/api/Challenge/notActiveChallenges`);
        const challenges = res.data as ChallengeType[];
        console.log(challenges); 
        const challengesWithImages = await Promise.all(challenges.map(async (challenge) => {
            const imageRes = await axios.get(`${apiUrl}/api/Image/topImageOfChallenge/${challenge.id}`);
            const topImage = imageRes.data; 

            return {
                title: challenge.title, 
                id: topImage.id, 
                userId: topImage.userId,
                imageUrl: topImage.imageUrl,
                countVotes: topImage.countVotes,
                fileName: topImage.fileName,
                userName: topImage.userName,
            } as TopImagesType; 
        }));
        return challengesWithImages;

    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

export const topImageSlice = createSlice({
    name: 'topImages',
    initialState: {
        topImages: [] as TopImagesType[],
        loading: true,
        error: null as string | null,
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getTopImagesByChallenge.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getTopImagesByChallenge.fulfilled, (state, action: PayloadAction<TopImagesType[]>) => {
                state.loading = false;
                state.error = null;
                state.topImages = action.payload; 
            })
            .addCase(getTopImagesByChallenge.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to load image "; 
            });
    },
});

export const selectTopImages = (state: RootState) => state.topImages.topImages;

export const { actions } = topImageSlice;
export default topImageSlice;