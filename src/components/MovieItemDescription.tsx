import { Button, Drawer, DrawerProps, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { API_KEY } from "../path/pathes";
import { fetchMovieInfo } from "../store/FilmsReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
const { Text, Title, Paragraph } = Typography;

interface DescriptionI {
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

interface InfoMovieI {
    info: DescriptionI
}

const MovieItemDescription: React.FC<InfoMovieI> = ({ info }) => {

    const dispatch = useAppDispatch();
    const [vissible, setVissible] = useState(false);
    const [size, setSize] = useState<DrawerProps['size']>();
    const [trailerId, setTrailerId] = useState('');
    const movie = useAppSelector(state => state.films.details.find((t) => {
        return t.id_film === info.id;
    }));
    const id = info.id;

    useEffect(() => {
        dispatch(fetchMovieInfo({ id }))
    }, [dispatch])

    function showDetails() {
        setSize('large')
        setVissible(true);
        dispatch(fetchMovieInfo({ id }));
    }

    function closeDetails() {
        setVissible(false);
    }

    function findTrailer() {
        let trailer = movie?.videos.find(t => t.name === 'Official Trailer');
        if (trailer) {
            setTrailerId(trailer.key);
        }
    }

    return (
        <>
            <p><Text type="secondary">Release date: </Text><Text type="success">{info.release_date}</Text></p>
            <Space>
                <Button type="primary" shape="round" onClick={showDetails} >  show details</Button>
                <Drawer title={info.title} visible={vissible} size={size}  onClose={closeDetails}>
                    <Button style={{marginBottom:'20px'}} type="primary" onClick={findTrailer} >show trailer</Button>
                    <YouTube videoId={trailerId} />
                    <Title level={4}>{info.title}</Title>
                    <Paragraph><Text type="secondary">Original title: </Text><Text style={{marginTop:'0.5rem'}} >{info.original_title}</Text></Paragraph>
                    <Paragraph><Text type="secondary" >Release Date: </Text><Text>{info.release_date}</Text></Paragraph>
                    <Title style={{marginTop:'0.5rem'}} level={5} >{info.overview}</Title>
                    <Paragraph><Text type="secondary" >Budget: </Text><Text>{movie?.budget_film}</Text><Text> millions</Text></Paragraph>
                    <Paragraph><Text type="secondary" >Runtime: </Text><Text>{movie?.runtime}</Text><Text> min</Text></Paragraph>
                </Drawer>
            </Space>
        </>
    )
}

export default MovieItemDescription;