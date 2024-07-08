import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { call, put } from 'redux-saga/effects';
import TvSeriesSaga, { loadPopularTvSeries, loadTvShowDetails, loadTvShowCredits } from '../tvSeriesSaga';
import { setTvSeriesDetails, setPopular, setPopularLoading, setTvSeriesCredits } from '../../slices/tvSeriesSlice';
import { getTvSerieDetails, getPopularTvSeries, getTvSerieCredits } from '@/app/api';

describe('TvSeriesSaga', () => {
  it('should load popular TV series', () => {
    const action = { type: 'LOAD_POPULAR_TVSERIES', page: 1 };
    const popularTvSeries = [{ id: 1, title: 'TV Series 1' }, { id: 2, title: 'TV Series 2' }];

    return expectSaga(loadPopularTvSeries, action)
      .provide([
        [call(getPopularTvSeries, action.page), popularTvSeries]
      ])
      .put(setPopularLoading())
      .put(setPopular(popularTvSeries))
      .run();
  });

  it('should load TV show details', () => {
    const action = { type: 'LOAD_TVSERIE_DETAILS', id: 1 };
    const tvSeriesDetails = { id: 1, title: 'TV Series 1' };

    return expectSaga(loadTvShowDetails, action)
      .provide([
        [call(getTvSerieDetails, action.id), tvSeriesDetails]
      ])
      .put(setTvSeriesDetails(tvSeriesDetails))
      .run();
  });

  it('should load TV show credits', () => {
    const action = { type: 'LOAD_TVSERIE_CREDITS', id: 1 };
    const tvSeriesCredits = { id: 1, cast: [] };

    return expectSaga(loadTvShowCredits, action)
      .provide([
        [call(getTvSerieCredits, action.id), tvSeriesCredits]
      ])
      .put(setTvSeriesCredits(tvSeriesCredits))
      .run();
  });

  it('should watch for saga actions', () => {
    testSaga(TvSeriesSaga)
      .next()
      .takeEvery('LOAD_POPULAR_TVSERIES', loadPopularTvSeries)
      .next()
      .takeEvery('LOAD_TVSERIE_DETAILS', loadTvShowDetails)
      .next()
      .takeEvery('LOAD_TVSERIE_CREDITS', loadTvShowCredits)
      .finish();
  });
});
