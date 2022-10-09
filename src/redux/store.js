import {configureStore} from "@reduxjs/toolkit";
import slidesReducer from './reducers/sliderSlice'
import movieReducer from './reducers/movieSlice'
import proposalSlice from "./reducers/proposalSlice";

export default configureStore({
    reducer: {
        slides: slidesReducer,
        movie: movieReducer,
        proposal: proposalSlice,
    }
})