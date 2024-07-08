import { takeEvery, put, call } from 'redux-saga/effects';
import { setMoviesDetails, setPopular, setPopularLoading, setMoviesCredits } from '../slices/moviesSlice';
import { getMovieDetails, getPopularMovies, getMovieCredits } from '@/app/api';

export function* loadPopularMovies(action: any) {
  yield put(setPopularLoading())
  const data: [] = yield call(getPopularMovies, action.page);

  yield put(setPopular(data));
}

export function* loadMovieDetails(action: any) {
  const data: {} = yield call(getMovieDetails, action.id);
  yield put(setMoviesDetails(data));
}

export function* loadMovieCredits(action: any) {
  const data: {} = yield call(getMovieCredits, action.id);
  yield put(setMoviesCredits(data));
}

function* moviesSaga() {
  yield takeEvery('LOAD_POPULAR_MOVIES', loadPopularMovies);
  yield takeEvery('LOAD_MOVIE_DETAILS', loadMovieDetails);
  yield takeEvery('LOAD_MOVIE_CREDITS', loadMovieCredits);
}

export default moviesSaga;