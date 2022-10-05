import {configureStore} from "@reduxjs/toolkit";
import slidesReducer from './reducers/sliderSlice'
import movieReducer from './reducers/movieSlice'

export default configureStore({
    reducer: {
        slides: slidesReducer,
        movie: movieReducer,
    }
})