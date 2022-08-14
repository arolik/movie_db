import { Col, Image, Row } from "antd";
import Search from "antd/lib/input/Search";
import { Header } from "antd/lib/layout/layout";


const MovieHeader: React.FC = () => {

    return (
        <Header className='movie_header' >
        <Row align='middle' justify='space-between' style={{padding:'5px'}} >
          <Col xs={{span:12}}  sm={{span:12}} >
            <Image width={150} src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg" ></Image> 
          </Col>
          <Col xs={{span:24}} sm={{span:12}} lg={{span:8}} >
            <Row align='middle'>
            <Search enterButton="Search" ></Search>
            </Row>
          </Col>
        </Row>
      </Header>
        
    )
}

export default MovieHeader;