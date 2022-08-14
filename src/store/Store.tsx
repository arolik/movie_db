import { configureStore } from "@reduxjs/toolkit";
import FilmsReducer from "./FilmsReducer";


const store = configureStore({
    reducer: {
        films: FilmsReducer
    }
})


export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;