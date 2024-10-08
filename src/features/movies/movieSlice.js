import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import movieApi from '../../common/apis/movieApi';
import { APIKey } from '../../common/apis/movieApiKey';

// export const fetchMovies = createAsyncThunk('movies/fetchMovies',
//     async ({ movie, page, genres }) => {
//         console.log('Fetching Movies with:', { movie, page });
//         const genreQuery = genres.length ? `&genre=${genres.join(",")}` : "";
//         const response = await movieApi.get(`?apiKey=${APIKey}&s=${movie}&type=movie&page=${page}${genreQuery}`);
//         return response.data;
//     }
// );

export const fetchMovies = createAsyncThunk('movies/fetchMovies',
    async ({ movie, page }) => {
        console.log('Fetching Movies with:', { movie, page });
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${movie}&type=movie&page=${page}&Plot=full`);
        console.log(response.data);
        return response.data;
    }
);

export const fetchShows = createAsyncThunk('movies/fetchShows',
    async ({ show, page }) => {
        console.log('Fetching Movies with:', { show, page });
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${show}&type=series&page=${page}`);
        console.log(response);
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
    currentPage: 1, 
    totalPages: 1   
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.selectedMovieOrShow ={};
        },
        setPage: (state, action) => { 
            state.currentPage = action.payload;
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
            state.totalPages = action.payload.totalResults ? Math.ceil(action.payload.totalResults / 10): 1;
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
            state.totalPages = action.payload.totalResults ? Math.ceil(action.payload.totalResults / 10): 1;
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

export const { removeSelectedMovieOrShow, setPage } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getAllMoviesOrShowsDetails = (state) => state.movies.moviesOrShowsDetail;
export const getCurrentPage = (state) => state.movies.currentPage;  
export const getTotalPages = (state) => state.movies.totalPages;    
export default movieSlice.reducer;