import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import movieApi from '../../common/apis/movieApi';
import { APIKey } from '../../common/apis/movieApiKey';

export const fetchMovies = createAsyncThunk('movies/fetchMovies',
    async (movie) => {
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${movie}&type=movie`);
        return response.data;
    }
);

const initialState = {
    movies: {},
    loading: false,
    error: null,
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = action.payload;
        })
        .addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const getAllMovies = (state) => state.movies.movies;
export default movieSlice.reducer;