import { Carousel } from "antd";
import { url } from "inspector";
import { large_logo, original_image_path } from "../path/pathes";
import { useAppSelector } from "../store/hooks";
import MovieSliderItem from "./MovieSliderItem";

interface SlidesItemI {
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

interface Items {
    params: SlidesItemI
}

const MovieSlider: React.FC = () => {

    const sliderItems = useAppSelector(state => state.films.slides);

    const changeSlide = (currentSlide: number) => {
    }

    return (

        <Carousel style={{marginBottom: '2rem'}} afterChange={changeSlide} >
        {sliderItems?.map((film) => {
          return <MovieSliderItem key={film.id} url={film.backdrop_path} />
        })}
      </Carousel>
        // <div className="movie_slide" style={{backgroundImage: `url('${original_image_path}${params.backdrop_path}')`}} >
            
        // </div>
    )
}

export default MovieSlider;