import {  combineSlices, configureStore } from "@reduxjs/toolkit";
import challengeSlice from "./challengeSlice";
import imageSlice from "./imageSlice";
import topImageSlice from "./topImagesSlice";

const store=configureStore({
    reducer:combineSlices(
        challengeSlice,
        imageSlice,
        topImageSlice
    )
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export default store;
