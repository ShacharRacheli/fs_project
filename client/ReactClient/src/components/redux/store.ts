import {  combineSlices, configureStore } from "@reduxjs/toolkit";
import challengeSlice from "./challengeSlice";
import imageSlice from "./imageSlice";

const store=configureStore({
    reducer:combineSlices(
        challengeSlice,
        imageSlice
    )
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export default store;
