import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    total_pages: number | null
}

const initialState: PageI = {
    page:  null,
    results: [],
    total_results: null,
    total_pages: null
}

export const fetchFilms = createAsyncThunk<PageI, undefined, { rejectValue: string }>(
    'films/fetchFilms',
    async function (_, { rejectWithValue, dispatch } ) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0d21d03fa55c1acdc8b0bc753a955437&language=en-US&page=1`);
        if(!response.ok){
            return rejectWithValue('oops')
        }
        const data = await response.json();
        return data;
    }
)

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
    }
})


export const { setCatalog } = FilmsSlice.actions

export default FilmsSlice.reducer;