import { Button, Col, Drawer, DrawerProps, Modal, Row, Space, Typography } from "antd";
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
    const [showModal, setShowModal] = useState(false);
    const [trailerId, setTrailerId] = useState('');
    const movie = useAppSelector(state => state.films.details.find((t) => {
        return t.id_film === info.id;
    }));
    const id = info.id;

    useEffect(() => {
        dispatch(fetchMovieInfo({ id }))
    }, [dispatch]);

    function showInfo() {
        setShowModal(true);
    }

    function closeInfo() {
        setShowModal(false);
    }

    function findTrailer() {
        let trailer = movie?.videos.find(t => t.name === 'Official Trailer');
        if (trailer) {
            setTrailerId(trailer.key);
        }
    };

    return (
        <>
            <p><Text type="secondary">Release date: </Text><Text type="success">{info.release_date}</Text></p>
            <Space>
                <Button type="primary" shape="round" onClick={showInfo} >show details</Button>
                <Modal className="movie_modal" title={info.title} visible={showModal} onOk={closeInfo} onCancel={closeInfo} width={'auto'}>
                    <Button style={{ marginBottom: '20px' }} type="primary" onClick={findTrailer} >show trailer</Button>
                    <Row justify="space-between">
                        <Col xs={{ span: 24 }} lg={{ span: 16 }} span={16} >
                            <YouTube videoId={trailerId} style={{ width: '100%', height: '100%' }} iframeClassName={'youtube_container'} />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 7 }} span={7} >
                            <Title level={4}>{info.title}</Title>
                            <Paragraph><Text type="secondary">Original title: </Text><Text style={{ marginTop: '0.5rem' }} >{info.original_title}</Text></Paragraph>
                            <Paragraph><Text type="secondary" >Release Date: </Text><Text>{info.release_date}</Text></Paragraph>
                            <Title style={{ marginTop: '0.5rem' }} level={5} >{info.overview}</Title>
                            <Paragraph><Text type="secondary" >Budget: </Text><Text>{movie?.budget_film}</Text><Text> millions</Text></Paragraph>
                            <Paragraph><Text type="secondary" >Runtime: </Text><Text>{movie?.runtime}</Text><Text> min</Text></Paragraph>
                        </Col>
                    </Row>
                </Modal>
            </Space>
        </>
    )
}

export default MovieItemDescription;