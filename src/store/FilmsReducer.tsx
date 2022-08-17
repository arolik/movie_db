import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, mainpath } from "../path/pathes";


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

interface PageI {
    page: number | null ,
    results: Array<ResultsI> | null ,
    total_results: number | null,
    total_pages: number | null,
    film_info: FilmVideosI
}

interface VideoItemInfoI {
    id: string,
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    key: string,
    published_at: string,
    site: string,
    size: number,
    type: string,
    official: boolean,
}

interface FilmVideosI {
    results: Array<VideoItemInfoI>
}

const initialState: PageI = {
    page:  null,
    results: [],
    total_results: null,
    total_pages: null,
    film_info: {
            results: []
    }
}

export const fetchFilms = createAsyncThunk<PageI, undefined, { rejectValue: string }>(
    'films/fetchFilms',
    async function (_, { rejectWithValue, dispatch } ) {
        const response = await fetch(mainpath);
        if(!response.ok){
            return rejectWithValue('oops')
        }
        const data = await response.json();
        return data;
    }
);

export const fetchMovieInfo = createAsyncThunk<FilmVideosI, {id:number}, { rejectValue: string}> (
    'films/fetchMovieTrailer',
    async function({id}, {rejectWithValue, dispatch }){
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`);
        if(!response.ok){
            return rejectWithValue('oops server error')
        }
        const data = await response.json();
        return data.videos;
    }
);
    


const FilmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers:{
        setCatalog(state, action){
            
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchFilms.fulfilled, (state, action) => {
            state.page = action.payload.page;
            state.results = action.payload.results;
            state.total_pages = action.payload.total_pages;
            state.total_results = action.payload.total_results;
        })
        .addCase(fetchMovieInfo.fulfilled, (state, action) => {
            state.film_info = action.payload;
        })
    }
})


export const { setCatalog } = FilmsSlice.actions

export default FilmsSlice.reducer;