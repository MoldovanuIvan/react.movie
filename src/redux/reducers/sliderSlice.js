import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, token} from "../../api";

const initialState = {
    movies: [],
    currentMovieTrailer: null,
}

export const getSlides = createAsyncThunk(
    'slider/getSlides',
    async () => {
        const response = await axios.get(BASE_URL + 'movie/popular?api_key=' + token + '&page=1')
        return response?.data?.results
    }
)

export const getSliderTrailer = createAsyncThunk(
    'slider/getSliderTrailer',
    async (id) => {
        const response = await axios.get(BASE_URL + 'movie/' + id + '/videos?api_key=' + token)
        console.log(response)
        return response?.data?.results
    }
)

const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        clearMovieTrailer: (state, action) => {
            state.currentMovieTrailer = null
        }
    },
    extraReducers: {
        [getSlides.fulfilled]: (state, action) => {
            state.movies = action.payload
        },
        [getSliderTrailer.fulfilled]: (state, action) => {
            state.currentMovieTrailer = action.payload[0].key
        }
    }
})

export default sliderSlice.reducer
export const {clearMovieTrailer} = sliderSlice.actions