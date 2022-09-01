import { Carousel } from "antd";
import { useAppSelector } from "../store/hooks";
import MovieSliderItem from "./MovieSliderItem";



const MovieSlider: React.FC = () => {

    const sliderItems = useAppSelector(state => state.films.slides);

    const changeSlide = (currentSlide: number) => {
    }

    return (

        <Carousel style={{marginBottom: '2rem'}} afterChange={changeSlide} >
        {sliderItems?.map((film) => {
          return <MovieSliderItem key={film.id} url={film.backdrop_path} 
          title={film.title} original_title={film.original_title} release_date={film.release_date} vote_average={film.vote_average} />
        })}
      </Carousel>
    )
}

export default MovieSlider;