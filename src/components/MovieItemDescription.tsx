import { Button, Col, Modal, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { fetchMovieInfo } from "../store/FilmsReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { FilmItemI } from './interfaces'
const { Text, Title, Paragraph } = Typography;

const MovieItemDescription: React.FC<FilmItemI> = ({ params }) => {

    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);
    const [trailerId, setTrailerId] = useState('');
    const movie = useAppSelector(state => state.films.details.find((t) => {
        return t.id_film === params.id;
    }));

    const found_movie = useAppSelector(state => state.films.found_movies.find((fm) => {
        return fm.id_film === params.id;
    }));

    const id = params.id;
    const is_found_movies = useAppSelector(state => state.films.isShowFoundMovies);

    
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

    function foundFindTrailer() {
        let trailer = found_movie?.videos.find(t => t.name === 'Official Trailer');
        if(trailer){
            setTrailerId(trailer.key);
        }
    }

    return (
        <>{
            is_found_movies 
            ? 
            <>
                <p><Text type="secondary">Release date: </Text><Text type="success">{params.release_date}</Text></p>
            <Space>
                <Button type="primary" shape="round" onClick={showInfo} >show details</Button>
                <Modal className="movie_modal" title={params.title} visible={showModal} onOk={closeInfo} onCancel={closeInfo} width={'auto'}>
                    <Button style={{ marginBottom: '20px' }} type="primary" onClick={foundFindTrailer} >show trailer</Button>
                    <Row justify="space-between">
                        <Col xs={{ span: 24 }} lg={{ span: 16 }} span={16} >
                            <YouTube videoId={trailerId} style={{ width: '100%', height: '100%' }} 
                            iframeClassName={'youtube_container'}   />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 7 }} span={7} >
                            <Title level={4}>{params.title}</Title>
                            <Paragraph><Text type="secondary">Original title: </Text><Text style={{ marginTop: '0.5rem' }} >{params.original_title}</Text></Paragraph>
                            <Paragraph><Text type="secondary" >Release Date: </Text><Text>{params.release_date}</Text></Paragraph>
                            <Title style={{ marginTop: '0.5rem' }} level={5} >{params.overview}</Title>
                            <Paragraph><Text type="secondary" >Budget: </Text><Text>{movie?.budget_film}</Text><Text> millions</Text></Paragraph>
                            <Paragraph><Text type="secondary" >Runtime: </Text><Text>{movie?.runtime}</Text><Text> min</Text></Paragraph>
                        </Col>
                    </Row>
                </Modal>
            </Space>
            </>
            :
            <> 
                <p><Text type="secondary">Release date: </Text><Text type="success">{params.release_date}</Text></p>
            <Space>
                <Button type="primary" shape="round" onClick={showInfo} >show details</Button>
                <Modal className="movie_modal" title={params.title} visible={showModal} onOk={closeInfo} onCancel={closeInfo} width={'auto'}>
                    <Button style={{ marginBottom: '20px' }} type="primary" onClick={findTrailer} >show trailer</Button>
                    <Row justify="space-between">
                        <Col xs={{ span: 24 }} lg={{ span: 16 }} span={16} >
                            <YouTube videoId={trailerId} style={{ width: '100%', height: '100%' }} 
                            iframeClassName={'youtube_container'}   />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 7 }} span={7} >
                            <Title level={4}>{params.title}</Title>
                            <Paragraph><Text type="secondary">Original title: </Text><Text style={{ marginTop: '0.5rem' }} >{params.original_title}</Text></Paragraph>
                            <Paragraph><Text type="secondary" >Release Date: </Text><Text>{params.release_date}</Text></Paragraph>
                            <Title style={{ marginTop: '0.5rem' }} level={5} >{params.overview}</Title>
                            <Paragraph><Text type="secondary" >Budget: </Text><Text>{movie?.budget_film}</Text><Text> millions</Text></Paragraph>
                            <Paragraph><Text type="secondary" >Runtime: </Text><Text>{movie?.runtime}</Text><Text> min</Text></Paragraph>
                        </Col>
                    </Row>
                </Modal>
            </Space>
            </>
        }
        </>
    )
}

export default MovieItemDescription;