import { Card, Col } from "antd";
import Meta from "antd/lib/card/Meta";
import { large_logo } from "../path/pathes";
import MovieItemDescription from "./MovieItemDescription";
import { FilmItemI } from './interfaces'


const MovieItem: React.FC<FilmItemI> = ({ params }) => {

    return <Col style={{ marginBottom: '20px' }} xs={{ span: 12 }} sm={{ span: 8 }} md={{ span: 6 }} xl={{ span: 4 }}>
        <Card
            hoverable
            cover={<img alt="text" src={`${large_logo}${params.poster_path}`} />}
        >
            <Meta title={params.original_title} description={<MovieItemDescription params={params}/>}></Meta>
        </Card>
        <div>

        </div>
    </Col>
}

export default MovieItem;