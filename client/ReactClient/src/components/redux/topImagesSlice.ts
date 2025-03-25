import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TopImagesType } from "../models/topImages";
import { ChallengeType } from "../models/challenge";
import { RootState } from "./store";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const getTopImagesByChallenge = createAsyncThunk('topImagesByChallenge/get', async (_, thunkApi) => {
    try {
        const res = await axios.get(`${apiUrl}/Challenge/notActiveChallenges`);
        // const res = await axios.get(`http://localhost:5070/api/Challenge/notActiveChallenges`);
        const challenges = res.data as ChallengeType[];
        console.log(challenges); 
        // Step 2: Fetch images for each challenge
        const challengesWithImages = await Promise.all(challenges.map(async (challenge) => {
            const imageRes = await axios.get(`${apiUrl}/Image/topImageOfChallenge/${challenge.id}`);
            // const imageRes = await axios.get(`http://localhost:5070/api/Image/topImageOfChallenge/${challenge.id}`);
            const topImage = imageRes.data; // Assuming this is of type TopImageDTO

            // Return the mapped object to TopImagesType
            return {
                title: challenge.title, // Assuming challenge has a title
                id: topImage.id, // Use the id from the top image
                userId: topImage.userId,
                imageUrl: topImage.imageUrl,
                countVotes: topImage.countVotes,
                fileName: topImage.fileName,
                userName: topImage.userName,
            } as TopImagesType; // Ensure the returned object matches TopImagesType
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
                state.topImages = action.payload; // עדכון המידע עם התמונות המתקבלות
            })
            .addCase(getTopImagesByChallenge.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to load image "; // טיפול בשגיאות
            });
    },
});

export const selectTopImages = (state: RootState) => state.topImages.topImages;

export const { actions } = topImageSlice;
export default topImageSlice;