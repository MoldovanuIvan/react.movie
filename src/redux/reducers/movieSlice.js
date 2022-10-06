import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, token} from "../../api";

const initialState = {
    id: null,
    genres: [],
    overview: '',
    title: '',
    cast: [],
    trailers: [],
    similar: [],
    poster: '',
}

export const getMovieInfo = createAsyncThunk(
    'movie/getMovieInfo',
    async (id) => {
        const response = await axios.get(BASE_URL + 'movie/' + id + '?api_key=' + token)
        console.log(response.data)
        return response?.data
    }
)

export const getMovieCast = createAsyncThunk(
    'movie/getMovieCast',
    async (id) => {
        const response = await axios.get(BASE_URL + 'movie/' + id + '/credits' + '?api_key=' + token)
        return response?.data?.cast
    }
)

export const getMovieSimilar = createAsyncThunk(
    'movie/getMovieSimilar',
    async (id) => {
        const response = await axios.get(BASE_URL + 'movie/' + id + '/similar' + '?api_key=' + token)
        return response?.data?.results
    }
)

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {},
    extraReducers: {
        [getMovieCast.fulfilled]: (state, action) => {
            state.cast = [...action.payload]
        },
        [getMovieInfo.fulfilled]: (state, action) => {
            state.id = action.payload.id
            state.genres = action.payload.genres
            state.overview = action.payload.overview
            state.title = action.payload.title
            state.backdrop = action.payload.backdrop_path
            state.poster = action.payload.poster_path
        },
        [getMovieSimilar.fulfilled]: (state, action) => {
            state.similar = action.payload
        }
    }
})

export default movieSlice.reducer