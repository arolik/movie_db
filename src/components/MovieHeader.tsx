import { Col, Image, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import { logopath } from "../path/pathes";

const MovieHeader: React.FC = () => {

    return (
        <Header className='movie_header' >
        <Row align='middle' justify='space-between' style={{padding:'5px'}} >
          <Col xs={{span:12}}  sm={{span:12}} >
            <Image  width={150} src={logopath} ></Image> 
          </Col>
        </Row>
      </Header> 
    )
}

export default MovieHeader;