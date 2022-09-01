import { Col, Pagination, PaginationProps, Row, Tabs } from 'antd';
import Search from 'antd/lib/input/Search';
import { Content } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import './App.css';
import FoundFilms from './components/FoundFilms';
import MovieHeader from './components/MovieHeader';
import MovieItem from './components/MovieItem';
import MovieSlider from './components/MovieSlider';
import { fetchFilms, fetchSearchMovie } from './store/FilmsReducer';
import { useAppDispatch, useAppSelector } from './store/hooks';
const { TabPane } = Tabs;

function App() {

  const dispatch = useAppDispatch();
  const catalog = useAppSelector(state => state.films.results);
  const total_pages = useAppSelector(state => state.films.total_pages);
  const search_results = useAppSelector(state => state.films.search_results.results);
  const found_movie = useAppSelector(state => state.films.isShowSearchMovies);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchFilms({ page }));
  }, [dispatch]);

  const changePage: PaginationProps['onChange'] = page => {
    setPage(page)
    dispatch(fetchFilms({ page }))
  };

  function changeTabs(key: string) {
  };

  function searchMovie (value: string) {
    const searchText = value;
    dispatch(fetchSearchMovie({searchText}));
  };


  return (
    <Col xs={{ span: 22, offset: 1 }} md={{ span: 22 }} >
      <MovieHeader />
      <MovieSlider />
      <Col xs={{span:24, offset:0}} sm={{span:12, offset:12}} lg={{span:8, offset:16}} >
            <Row align='middle'>
            <Search enterButton="Search" onSearch={searchMovie}  allowClear ></Search>
            </Row>
          </Col>
      <Tabs defaultActiveKey='1' onChange={changeTabs} onTabClick={() => { dispatch(fetchFilms({ page })) }} >
        <TabPane tab="Popular movies" key="1">
          {total_pages ?
            <Pagination current={page} onChange={changePage} total={total_pages} ></Pagination> :
            <Pagination current={page} onChange={changePage} total={50} ></Pagination>
          }
          
          <Content className='movie_content' >
            <Row justify='space-between' gutter={{ xs: 8, sm: 16, md: 22, lg: 32 }} >
              {
                found_movie ? 
                search_results.map((f) => { return <FoundFilms key={f.id} id={f.id} original_title={f.original_title} /> }) :
                catalog?.map((film) => { return <MovieItem key={film.id} params={film} /> })
              }
            </Row>
          </Content>
        </TabPane>
        
        <TabPane tab="Tab 1" key="2">
          text 2
        </TabPane>
      </Tabs>
    </Col>
  );
}

export default App;
