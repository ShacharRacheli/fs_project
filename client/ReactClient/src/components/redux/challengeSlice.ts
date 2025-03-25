import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ChallengeType } from "../models/challenge";
import { RootState } from "./store";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const getChallenges = createAsyncThunk('challenges/get', async (_, thunkApi) => {
    try {
        const res = await axios.get(`${apiUrl}/api/Challenge/getAllChallenges`);
        // const res = await axios.get(`http://localhost:5070/api/Challenge/getAllChallenges`);
        return res.data as ChallengeType[];
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

export const getChallengeById = createAsyncThunk('challengeId/get', async (challengeId: number, thunkApi) => {
    try {
        const res = await axios.get(`${apiUrl}/api/Challenge/getChallengeById/${challengeId}`)
        // const res = await axios.get(`http://localhost:5070/api/Challenge/getChallengeById/${challengeId}`)
        return res.data as ChallengeType;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

export const challengeSlice = createSlice({
    name: 'challenges',
    initialState: {
        list: [] as ChallengeType[],
        loading: true,
        error: null as string | null,
        selectedChallenge: null as ChallengeType | null, // New property
    },
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(getChallenges.pending, (state) => {
            state.loading = true,
                state.error = null
        }).addCase(getChallenges.fulfilled, (state, action: PayloadAction<ChallengeType[]>) => {
            state.loading = false,
                state.error = null,
                state.list = action.payload
        }).addCase(getChallenges.rejected, (state) => {
            state.loading = false,
                state.error = "Failed to load challenges"
        }).addCase(getChallengeById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(getChallengeById.fulfilled, (state, action: PayloadAction<ChallengeType>) => {
                state.loading = false;
                state.error = null;
                state.selectedChallenge = action.payload; 
            })
            .addCase(getChallengeById.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to load challenge by ID";
            });
    }
})
export const selectSelectedChallenge = (state: RootState) => state.challenges.selectedChallenge;
export const selectChallenges = (state: RootState) => state.challenges;
export const { actions } = challengeSlice;
export default challengeSlice;