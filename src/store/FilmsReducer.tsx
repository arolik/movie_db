import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, find_movie, mainpath } from "../path/pathes";

interface ResultsI {
    poster_path: string | null,
    abult: boolean,
    overview: string,
    release_date: string,
    genre_ids: Array<number>,
    id: number,
    original_title: string,
    original_language: string,
    title: string,
    backdrop_path: string | null,
    popularity: number,
    vote_count: number,
    video: boolean,
    vote_average: number
}

interface PageResponseI {
    page: number | null ,
    results: Array<ResultsI> | null ,
    total_results: number | null,
    total_pages: number | null,
}

/* trailer info interfaces */

interface TrailerItemI {
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    key: string,
    published_at: string,
    site: string,
    size: number,
    type: string,
    official: boolean,
    id: string
}

interface DetailsFilmI {
    id_film: number | null,
    budget_film?: number,
    genres_film?: Array<GenreI>,
    videos: Array<TrailerItemI>,
    backdrop_path?: string
    runtime?: number
}

interface GenreI {
    id: number,
    name: string
}

/* initial state interfaces */ 

interface PageI {
    page: number | null,
    results: Array<ResultsI> | null,
    total_results: number | null,
    total_pages: number | null,
    details: Array<DetailsFilmI>,
    slides: Array<ResultsI>,
    search_text: string,
    search_results: SearchMovieI,
    isShowFoundMovies: boolean,
    found_movies: Array<DetailsFilmI>
}

const initialState: PageI = {
    page:  null,
    results: [],
    total_results: null,
    total_pages: null,
    details: [],
    slides: [],
    search_text: '',
    search_results: {
        page: null,
        results: [],
        total_pages: null,
        total_results: null
    },
    isShowFoundMovies: false,
    found_movies: []
}

/* film item info interface */ 

interface FetchDeatailsFilmI {
    id: number,
    budget: number,
    genres: Array<GenreI>,
    videos: {
        results: Array<TrailerItemI>
    },
    backdrop_path: string,
    runtime: number
}

/* search movie interface */

interface SearchMovieI {
    page: number | null,
    results: Array<SearchMovieItemI>,
    total_pages: number | null,
    total_results: number | null
}

interface SearchMovieItemI {
    adult: boolean,
    backdrop_path: string,
    genre_ids: Array<number>,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

/* */ 

export const fetchFilms = createAsyncThunk<PageResponseI, {page:number}, { rejectValue: string }>(
    'films/fetchFilms',
    async function ({page}, { rejectWithValue, dispatch } ) {
        let path = `https://api.themoviedb.org/3/movie/popular?api_key=0d21d03fa55c1acdc8b0bc753a955437&language=en-US&page=${page}`;
        const response = await fetch(path);
        if(!response.ok){
            return rejectWithValue('oops')
        }
        const data = await response.json();
        return data;
    }
);

export const fetchMovieInfo = createAsyncThunk<FetchDeatailsFilmI, {id:number}, { rejectValue: string}> (
    'films/fetchMovieTrailer',
    async function({id}, {rejectWithValue}){
        
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`);
        if(!response.ok){
            return rejectWithValue('oops server error')
        }
        const data = await response.json();
        
        return data as FetchDeatailsFilmI;
    }
);

export const fetchSearchMovie = createAsyncThunk <SearchMovieI, {search_text?: string, pageFoundMovies: number}, {rejectValue: string}> (
    'films/fetchSearchMovie',
    async function({search_text, pageFoundMovies},{rejectWithValue, dispatch}){
        const response = await fetch(`${find_movie}&language=en-US&query=${search_text}&page=${pageFoundMovies}&include_adult=false`);
        if(!response.ok){
            return rejectWithValue('oops can not find movie')
        }
        dispatch(setText(search_text));
        return await response.json() as SearchMovieI ;
    }
);

    
const FilmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers:{
        setText(state, action){
            state.search_text = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchFilms.fulfilled, (state, action) => {
            state.page = action.payload.page;
            state.results = action.payload.results;
            state.total_pages = action.payload.total_pages;
            state.total_results = action.payload.total_results;
            if(action.payload.results){
                for(let i=0; i<action.payload.results?.length; i++){
                    state.details.push({id_film: action.payload.results[i].id, videos: []});
                    if(i <= 3 && state.slides.length < 4){
                        state.slides.push(action.payload.results[i]);
                    }
                }
            }
            state.isShowFoundMovies = false;
        })
        .addCase(fetchMovieInfo.fulfilled, (state, action) => {
            if(state.isShowFoundMovies){
                for(let i=0; i<state.found_movies.length; i++){
                    if(state.found_movies[i].id_film === action.payload.id){
                        state.found_movies[i].videos = action.payload.videos.results;
                        state.found_movies[i].budget_film = action.payload.budget;
                        state.found_movies[i].genres_film = action.payload.genres;
                        state.found_movies[i].backdrop_path = action.payload.backdrop_path;
                        state.found_movies[i].runtime = action.payload.runtime;
                    }
                }
            } else {
                for(let i=0; i<state.details.length; i++){
                    if(state.details[i].id_film === action.payload.id){
                        state.details[i].videos = action.payload.videos.results;
                        state.details[i].budget_film = action.payload.budget;
                        state.details[i].genres_film = action.payload.genres;
                        state.details[i].backdrop_path = action.payload.backdrop_path;
                        state.details[i].runtime = action.payload.runtime;
                    }
                }
            }
                
        })
        .addCase(fetchSearchMovie.fulfilled, (state, action) => {
            state.search_results.page = action.payload.page;
            state.search_results.total_pages = action.payload.total_pages;
            state.search_results.total_results = action.payload.total_results;
            state.search_results.results = action.payload.results;
            state.isShowFoundMovies = true;
            if(action.payload.results){
                for(let i=0; i<action.payload.results?.length; i++){
                    state.found_movies.push({id_film: action.payload.results[i].id, videos: []});
                }
            }
        })
    }
})


export const { setText } = FilmsSlice.actions

export default FilmsSlice.reducer;