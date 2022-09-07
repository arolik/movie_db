/* Movie item interfaces */ 
export  interface FilmIParamsI {
    poster_path: string | null,
    abult?: boolean,
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

export interface FilmItemI {
    params: FilmIParamsI
}

/* Movie item description interfaces */



/**/ 

