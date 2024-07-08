import { takeEvery, put, call } from 'redux-saga/effects';
import { setTvSeriesDetails, setPopular, setPopularLoading, setTvSeriesCredits } from '../slices/tvSeriesSlice';
import { getTvSerieDetails, getPopularTvSeries, getTvSerieCredits } from '@/app/api';

export function* loadPopularTvSeries(action: any) {
  yield put(setPopularLoading())
  const data: [] = yield call(getPopularTvSeries, action.page);

  yield put(setPopular(data));
}

export function* loadTvShowDetails(action: any) {
  const data: {} = yield call(getTvSerieDetails, action.id);
  yield put(setTvSeriesDetails(data));
}

export function* loadTvShowCredits(action: any) {
  const data: {} = yield call(getTvSerieCredits, action.id);
  yield put(setTvSeriesCredits(data));
}

function* TvSeriesSaga() {
  yield takeEvery('LOAD_POPULAR_TVSERIES', loadPopularTvSeries);
  yield takeEvery('LOAD_TVSERIE_DETAILS', loadTvShowDetails);
  yield takeEvery('LOAD_TVSERIE_CREDITS', loadTvShowCredits);
}

export default TvSeriesSaga;