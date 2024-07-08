import { all, fork } from 'redux-saga/effects';
import moviesSaga from './moviesSaga';
import TvSeriesSaga from './tvSeriesSaga';
import searchSaga from './searchSaga';

export default function* rootSaga() {
  yield all([
    fork(moviesSaga),
    fork(TvSeriesSaga),
    fork(searchSaga),
  ]);
}