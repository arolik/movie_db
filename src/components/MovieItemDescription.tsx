import { Button, Drawer, DrawerProps, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { API_KEY } from "../path/pathes";
import { fetchMovieInfo } from "../store/FilmsReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
const { Text } =Typography;


interface DescriptionI {
    date: string,
    title: string,
    id: number,
}

const MovieItemDescription: React.FC<DescriptionI> = ({date, title, id}) => {

    const dispatch = useAppDispatch();
    const [vissible, setVissible] = useState(false);
    const [size, setSize] = useState<DrawerProps['size']>();
    const [trailerId, setTrailerId] = useState('');
    const movies = useAppSelector(state => state.films.trailers.find((t) => {
        return t.id_film === id;
    }));
    
    
    
    useEffect(() => {
        dispatch(fetchMovieInfo({id}))
    }, [dispatch] )

    function showDetails () {
        setSize('large')
        setVissible(true);
        dispatch(fetchMovieInfo({id}));
    }

    function closeDetails () {
        setVissible(false);
    }

    function findTrailer (){
          let trailer = movies?.videos.find(t => t.name === 'Official Trailer');
          if(trailer){
            setTrailerId(trailer.key);
          }
          
    }

    return (
        <>
            <p><Text type="secondary">Release date: </Text><Text type="success">{date}</Text></p>
            <Space>
                <Button type="primary" shape="round" onClick={showDetails} >  show details</Button>
                <Drawer title={title} visible={vissible} size={size} onClose={closeDetails}>
                    <Button type="primary" onClick={findTrailer} >show trailer</Button>
                    <YouTube videoId={trailerId} />

                </Drawer>
            </Space>
        </>
    )
}

export default MovieItemDescription;