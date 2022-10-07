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
        return response?.data?.results
    }
)

const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        clearMovieTrailer: (state) => {
            state.currentMovieTrailer = null
        }
    },
    extraReducers: {
        [getSlides.fulfilled]: (state, action) => {
            state.movies = action.payload
        },
        [getSliderTrailer.fulfilled]: (state, action) => {
            const trailer = action.payload.findIndex(item => item.name.toUpperCase().indexOf('TRAILER', 0) !== -1)
            if (trailer !== -1) state.currentMovieTrailer = action.payload[trailer].key
            else state.currentMovieTrailer = action.payload[0].key
        }
    }
})

export default sliderSlice.reducer
export const {clearMovieTrailer} = sliderSlice.actions