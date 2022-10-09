import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, token} from "../../api";

const initialState = {
    popularMovies: [],
    popularTV: [],
    topRatedMovies: [],
    topRatedTV: [],
    page: 0,
}

export const getProposal = createAsyncThunk(
    'proposal/getProposal',
    async ({movieType, filterType, page = 1},) => {
        const response = await axios.get(BASE_URL + movieType + '/' + filterType + '?api_key=' + token + '&page=' + page)
        console.log({
            movieType,
            filterType,
            data: response.data.results,
            page: response.data.page,
        })
        return {
            movieType,
            filterType,
            data: response.data.results,
            page: response.data.page,
        }
    }
)

const getObjectKey = (movieType, filterType) => {
    if (movieType === 'movie') {
        switch (filterType) {
            case 'popular':
                return 'popularMovies';
            case 'top_rated':
                return 'topRatedMovies';
        }
    } else if (movieType === 'tv') {
        switch (filterType) {
            case 'popular':
                return 'popularTV';
            case 'top_rated':
                return 'topRatedTV';
        }
    }
}

const proposalSlice = createSlice({
    name: 'proposal',
    initialState,
    reducers: {
        clearProposal: (state) => {
            return initialState
        }
    },
    extraReducers: {
        [getProposal.fulfilled]: (state, action) => {
            state[getObjectKey(action.payload.movieType, action.payload.filterType)].push(...action.payload.data)
        }
    },
})

export const {clearProposal} = proposalSlice.actions
export default proposalSlice.reducer