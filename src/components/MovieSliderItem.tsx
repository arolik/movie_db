import { Rate, Typography } from "antd";
import { original_image_path } from "../path/pathes";

const { Title, Text } = Typography;

interface SlideInfo {
    url: string | null,
    title: string,
    original_title: string,
    release_date: string,
    vote_average: number
}



const MovieSliderItem: React.FC<SlideInfo> = ({url, title, original_title, release_date, vote_average}) => {

    return (
        <div className="movie_slide" style={{backgroundImage: `url('${original_image_path}${url}')`}} >
            <div style={{paddingLeft:'2rem', paddingTop:'2rem'}}>
            <Title level={3} >{title}</Title>
            <Title level={4} >{original_title}</Title>
            <Title level={5} >{release_date}</Title>
            <Rate allowHalf defaultValue={vote_average} count={10} disabled ></Rate>
            </div>  
        </div>
    )
}

export default MovieSliderItem;