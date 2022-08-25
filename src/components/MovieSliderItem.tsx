import { original_image_path } from "../path/pathes";

interface UrlI {
    url: string | null
}

const MovieSliderItem: React.FC<UrlI> = ({url}) => {

    return (
        <div className="movie_slide" style={{backgroundImage: `url('${original_image_path}${url}')`}} >
        </div>
    )
}

export default MovieSliderItem;