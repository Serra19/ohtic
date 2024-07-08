import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import moviesSaga, { loadPopularMovies, loadMovieDetails, loadMovieCredits } from '../moviesSaga';
import { setMoviesDetails, setPopular, setPopularLoading, setMoviesCredits } from '../../slices/moviesSlice';
import { getMovieDetails, getPopularMovies, getMovieCredits } from '@/app/api';

describe('moviesSaga', () => {
  it('should load popular movies', () => {
    const action = { type: 'LOAD_POPULAR_MOVIES', page: 1 };
    const popularMovies = [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }];

    return expectSaga(loadPopularMovies, action)
      .provide([
        [call(getPopularMovies, action.page), popularMovies]
      ])
      .put(setPopularLoading())
      .put(setPopular(popularMovies))
      .run();
  });

  it('should load movie details', () => {
    const action = { type: 'LOAD_MOVIE_DETAILS', id: 1 };
    const movieDetails = { id: 1, title: 'Movie 1' };

    return expectSaga(loadMovieDetails, action)
      .provide([
        [call(getMovieDetails, action.id), movieDetails]
      ])
      .put(setMoviesDetails(movieDetails))
      .run();
  });

  it('should load movie credits', () => {
    const action = { type: 'LOAD_MOVIE_CREDITS', id: 1 };
    const movieCredits = { id: 1, cast: [] };

    return expectSaga(loadMovieCredits, action)
      .provide([
        [call(getMovieCredits, action.id), movieCredits]
      ])
      .put(setMoviesCredits(movieCredits))
      .run();
  });

  it('should watch for saga actions', () => {
    testSaga(moviesSaga)
      .next()
      .takeEvery('LOAD_POPULAR_MOVIES', loadPopularMovies)
      .next()
      .takeEvery('LOAD_MOVIE_DETAILS', loadMovieDetails)
      .next()
      .takeEvery('LOAD_MOVIE_CREDITS', loadMovieCredits)
      .finish();
  });
});
