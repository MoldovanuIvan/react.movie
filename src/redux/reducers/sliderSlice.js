import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, token} from "../../api";

const initialState = {
    movies: []
}

export const getSlides = createAsyncThunk(
    'slider/getSlides',
    async () => {
        const response = await axios.get(BASE_URL + 'movie/popular?api_key=' + token + '&page=1')
        return response?.data?.results
    }
)

const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getSlides.fulfilled]: (state, action) => {
            state.movies = action.payload
        }
    }
})

export default sliderSlice.reducer
export const {} = sliderSlice.actions