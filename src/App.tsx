import { Button, Col, Pagination, PaginationProps, Row, Tabs } from 'antd';
import Search from 'antd/lib/input/Search';
import { Content } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import './App.css';
import FoundFilms from './components/FoundFilms';
import HanddleFoundFilms from './components/HanddleFoundFilms';
import MovieHeader from './components/MovieHeader';
import MovieItem from './components/MovieItem';
import MovieSlider from './components/MovieSlider';
import { fetchFilms, fetchSearchMovie } from './store/FilmsReducer';
import { useAppDispatch, useAppSelector } from './store/hooks';
const { TabPane } = Tabs;

function App() {

  const dispatch = useAppDispatch();
  const catalog = useAppSelector(state => state.films.results);
  const total_pages_popular_films = useAppSelector(state => state.films.total_pages);
  const is_found_movies = useAppSelector(state => state.films.isShowFoundMovies);
  const [page, setPage] = useState(1);
  const [pageFoundMovies, setPageFoundMovies] = useState(1);
 
  

  useEffect(() => {
    dispatch(fetchFilms({ page }));
  }, [dispatch]);

  const changePage: PaginationProps['onChange'] = page => {
    setPage(page)
    dispatch(fetchFilms({ page }))
  };

  function changeTabs(key: string) {
  };

  function searchMovie(value: string) {
    const search_text = value;
    dispatch(fetchSearchMovie({ search_text, pageFoundMovies }));
  };

  return (
    <Col xs={{ span: 22, offset: 1 }} md={{ span: 22 }} >
      <MovieHeader />
      <MovieSlider />
      <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24 }} >
        <Row align='middle' justify='space-between' style={{ marginBottom: '1rem' }} >
          <Col>
            <Button type='primary' onClick={() => { dispatch(fetchFilms({ page })) }} >Back</Button>
          </Col>
          <Col>
            <Search enterButton="Search" onSearch={searchMovie} allowClear   ></Search>
          </Col>

        </Row>
      </Col>
      {
        is_found_movies
          ?
          <HanddleFoundFilms />
          :
          <Tabs defaultActiveKey='1' onChange={changeTabs} onTabClick={() => { dispatch(fetchFilms({ page })) }} >
            <TabPane tab="Popular movies" key="1">
              {total_pages_popular_films ?
                <Pagination current={page} onChange={changePage} total={total_pages_popular_films} ></Pagination> :
                <Pagination current={page} onChange={changePage} total={50} ></Pagination>
              }

              <Content className='movie_content aaa' >
                <Row justify='space-between' gutter={{ xs: 8, sm: 16, md: 22, lg: 32 }} >
                  {catalog?.map((film) => { return <MovieItem key={film.id} params={film} /> })}
                </Row>
              </Content>
            </TabPane>
          </Tabs>
      }
    </Col>
  );
}

export default App;
