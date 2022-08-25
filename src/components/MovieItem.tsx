import { Card, Col } from "antd";
import Meta from "antd/lib/card/Meta";
import { useEffect } from "react";
import { large_logo } from "../path/pathes";
import { fetchMovieInfo } from "../store/FilmsReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
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

    const dispatch = useAppDispatch();
    const id = params.id;

    return <Col style={{ marginBottom: '20px' }} key={params.id} xs={{ span: 12 }} sm={{ span: 8 }} md={{ span: 6 }} lg={{ span: 4 }}>
        <Card
            hoverable
            cover={<img alt="text" src={`${large_logo}${params.poster_path}`} />}
        >
            <Meta title={params.original_title}
                description={<MovieItemDescription info={params}
                />}></Meta>
        </Card>
        <div>

        </div>
    </Col>
}

export default MovieItem;