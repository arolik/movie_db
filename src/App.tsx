import { Card, Col, Image, Layout, Pagination, PaginationProps, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Search from 'antd/lib/input/Search';
import { Content, Header } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import './App.css';
import MovieHeader from './components/MovieHeader';
import MovieItem from './components/MovieItem';
import { fetchFilms } from './store/FilmsReducer';
import { useAppDispatch, useAppSelector } from './store/hooks';


function App() {

  const dispatch = useAppDispatch();
  const catalog = useAppSelector(state => state.films.results);
  const total_pages = useAppSelector(state => state.films.total_pages);
  const [page, setPage] = useState(1)


  useEffect(() => {
    dispatch(fetchFilms({ page }));
  }, [dispatch]);

  const changePage: PaginationProps['onChange'] = page => {
    setPage(page)
    dispatch(fetchFilms({ page }))
  }


  return (
    <Col xs={{ span: 22, offset: 1 }} md={{ span: 22 }} >
      <MovieHeader />
      {total_pages ?
        <Pagination current={page} onChange={changePage} total={total_pages} ></Pagination> :
        <Pagination current={page} onChange={changePage} total={50} ></Pagination>
      }
      <Content className='movie_content' >
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
