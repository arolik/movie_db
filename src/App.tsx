import { Card, Col, Image, Layout, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Search from 'antd/lib/input/Search';
import { Content, Header } from 'antd/lib/layout/layout';
import React, { useEffect } from 'react';
import './App.css';
import MovieHeader from './components/MovieHeader';
import { fetchFilms } from './store/FilmsReducer';
import { useAppDispatch, useAppSelector } from './store/hooks';


function App() {

  const dispatch = useAppDispatch();
  const catalog = useAppSelector(state => state.films.results);
  useEffect(() => {
    dispatch(fetchFilms())
  }, [dispatch])


console.log(catalog)


  return (
    <Col  xs={{span:22, offset:1}} md={{span:22}} >
      <MovieHeader/>
      <Content>
        <Row justify='center' gutter={{ xs: 8, sm: 16, md: 22, lg: 32 }} >
          {catalog?.map((film) => {
            return <Col key={film.id} span={6}>
              <Card  hoverable
              cover={<img alt="text" src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}/>}
              >
                <Meta title={film.original_title} description={film.overview} ></Meta>
              </Card>
            </Col>
          })}
          {/* <Col span={6} >
            <Card 
            hoverable 
            cover={<img alt="text" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" ></img>}
            
            > 
            <Meta title="text" description="second text" ></Meta>
            </Card>
          </Col> */}
          

          
        </Row>
        
      </Content>
    </Col>


  );
}

export default App;
