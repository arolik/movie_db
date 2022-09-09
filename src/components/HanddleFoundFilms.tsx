import { Pagination, PaginationProps, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useState } from "react";
import { fetchSearchMovie } from "../store/FilmsReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import FoundFilms from "./FoundFilms";


const HanddleFoundFilms: React.FC = () => {
    
    const dispatch = useAppDispatch();
    const total_pages_found_movies = useAppSelector(state => state.films.search_results.total_pages);
    const search_results = useAppSelector(state => state.films.search_results.results);
    const search_text = useAppSelector(state => state.films.search_text);
    const [pageFoundMovies, setPageFoundMovies] = useState(1);

    const found_movies = useAppSelector(state => state.films.found_movies);


    const changePage: PaginationProps['onChange'] = page => {
      const pageFoundMovies = page;
      setPageFoundMovies(page);

      dispatch(fetchSearchMovie({search_text, pageFoundMovies}));
    }

    return (
        <Content className='movie_content'>
            <Row style={{marginBottom:'1rem'}}>
              {total_pages_found_movies ?
              <Pagination current={pageFoundMovies} onChange={changePage} total={total_pages_found_movies * 10} ></Pagination> :
              <Pagination current={pageFoundMovies} onChange={changePage} total={3} ></Pagination>
              }
            </Row>
            <Row justify='space-between' gutter={{ xs: 8, sm: 16, md: 22, lg: 32 }} >
              {search_results.map((film) => { return <FoundFilms key={film.id} params={film} /> })}
            </Row>
          </Content>
    )
}

export default HanddleFoundFilms;









