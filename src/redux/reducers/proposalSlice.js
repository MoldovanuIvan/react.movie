import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, token} from "../../api";

var _ = require('lodash');

const initialState = {
    popularMovies: [],
    popularTV: [],
    topRatedMovies: [],
    topRatedTV: [],
    page: 0,

}

export const getProposal = createAsyncThunk(
    'proposal/getProposal',
    async ({movieType, filterType, page = 1}) => {
        const response = await axios.get(BASE_URL + movieType + '/' + filterType + '?api_key=' + token + '&page=' + page)
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
        clearProposal: () => {
            return initialState
        }
    },
    extraReducers: {
        [getProposal.fulfilled]: (state, action) => {
            state[getObjectKey(action.payload?.movieType, action.payload?.filterType)] = [...[...state[getObjectKey(action.payload?.movieType, action.payload?.filterType)], ...action.payload?.data]]
            state[getObjectKey(action.payload?.movieType, action.payload?.filterType)] = [...new Map(state[getObjectKey(action.payload?.movieType, action.payload?.filterType)].map(item => [item['backdrop_path'], item])).values()]
            state.page = action.payload?.page
        }
    },
})

export const {clearProposal} = proposalSlice.actions
export default proposalSlice.reducer