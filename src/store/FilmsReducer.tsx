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

interface PageResponseI {
    page: number | null ,
    results: Array<ResultsI> | null ,
    total_results: number | null,
    total_pages: number | null,
}

/**/

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

interface FilmTrailerI {
    id_film: number | null,
    videos: Array<TrailerItemI>
}

/**/ 

interface PageI {
    page: number | null,
    results: Array<ResultsI> | null,
    total_results: number | null,
    total_pages: number | null,
    trailers: Array<FilmTrailerI>
}

const initialState: PageI = {
    page:  null,
    results: [],
    total_results: null,
    total_pages: null,
    trailers: []
}

/**/ 

interface FetchTrailerI {
    id: number,
    videos: {
        results: Array<TrailerItemI>
    }
    
}

/**/ 

export const fetchFilms = createAsyncThunk<PageResponseI, undefined, { rejectValue: string }>(
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

export const fetchMovieInfo = createAsyncThunk<FetchTrailerI, {id:number}, { rejectValue: string}> (
    'films/fetchMovieTrailer',
    async function({id}, {rejectWithValue}){
        
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`);
        if(!response.ok){
            return rejectWithValue('oops server error')
        }
        const data = await response.json();
        
        return data as FetchTrailerI ;
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
            if(action.payload.results){
                for(let i=0; i<action.payload.results?.length; i++){
                    state.trailers.push({id_film: action.payload.results[i].id, videos: []});
                }
            }
        })
        .addCase(fetchMovieInfo.fulfilled, (state, action) => {
            for(let i=0; i<state.trailers.length; i++){
                if(state.trailers[i].id_film === action.payload.id){
                    state.trailers[i].videos = action.payload.videos.results;
                }
            }
            
        })
    }
})


export const { setCatalog } = FilmsSlice.actions

export default FilmsSlice.reducer;