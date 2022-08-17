import { Card, Col } from "antd";
import Meta from "antd/lib/card/Meta";
import { large_logo } from "../path/pathes";
import MovieItemDescription from "./MovieItemDescription";

interface FilmIParamsI {
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

interface FilmItemI {
    params: FilmIParamsI
}

const MovieItem: React.FC<FilmItemI> = ({ params }) => {
    
    return <Col style={{ marginBottom: '20px' }} key={params.id} xs={{ span: 10 }} sm={{ span: 8 }} md={{ span: 6 }} lg={{ span: 4 }}>
        <Card
            hoverable
            cover={<img alt="text" src={`${large_logo}${params.poster_path}`} />}
        >
            <Meta title={params.original_title}
                description={<MovieItemDescription date={params.release_date}
                    title={params.title} id={params.id}
                />}></Meta>
        </Card>
        <div>

        </div>
    </Col>
}

export default MovieItem;