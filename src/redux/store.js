import {configureStore} from "@reduxjs/toolkit";
import slidesReducer from './reducers/sliderSlice'

export default configureStore({
    reducer: {
        slides: slidesReducer,
    }
})