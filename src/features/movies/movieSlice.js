import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import movieApi from '../../common/apis/movieApi';
import { APIKey } from '../../common/apis/movieApiKey';

export const fetchMovies = createAsyncThunk('movies/fetchMovies',
    async (movie) => {
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${movie}&type=movie`);
        return response.data;
    }
);

export const fetchShows = createAsyncThunk('movies/fetchShows',
    async (show) => {
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${show}&type=series`);
        return response.data;
    }
);

export const fetchMovieOrShowDetail = createAsyncThunk('movies/fetchMovieOrShowDetail',
    async (id) => {
        const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
        return response.data;
    }
);

const initialState = {
    movies: {},
    shows: {},
    moviesOrShowsDetail: {},
    loading: false,
    error: null,
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.selectedMovieOrShow ={};
        }
    },
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
        })
        .addCase(fetchShows.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchShows.fulfilled, (state, action) => {
            state.loading = false;
            state.shows = action.payload;
        })
        .addCase(fetchShows.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(fetchMovieOrShowDetail.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchMovieOrShowDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.moviesOrShowsDetail = action.payload;
        })
        .addCase(fetchMovieOrShowDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { removeSelectedMovieOrShow} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getAllMoviesOrShowsDetails = (state) => state.movies.moviesOrShowsDetail;
export default movieSlice.reducer;