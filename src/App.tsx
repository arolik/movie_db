import { Card, Col, Image, Layout, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Search from 'antd/lib/input/Search';
import { Content, Header } from 'antd/lib/layout/layout';
import React, { useEffect } from 'react';
import './App.css';
import MovieHeader from './components/MovieHeader';
import MovieItem from './components/MovieItem';

import { fetchFilms } from './store/FilmsReducer';
import { useAppDispatch, useAppSelector } from './store/hooks';



function App() {

  const dispatch = useAppDispatch();
  const catalog = useAppSelector(state => state.films.results);
  const a = useAppSelector(state => state.films);
  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);
  


  
  

  return (
    <Col  xs={{span:22, offset:1}} md={{span:22}} >
      <MovieHeader/>
      <Content>
        
         <Row justify='space-between' gutter={{ xs: 8, sm: 16, md: 22, lg: 32 }} >
          {catalog?.map((film) => {
            return <MovieItem key={film.id} params={film} />
          })}
        </Row> 
        
      </Content>
    </Col>


  );
}

export default App;
