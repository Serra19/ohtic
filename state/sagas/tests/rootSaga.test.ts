import { expectSaga, testSaga } from 'redux-saga-test-plan';
import rootSaga from '../rootSaga';
import moviesSaga from '../moviesSaga';
import TvSeriesSaga from '../tvSeriesSaga';
import searchSaga from '../searchSaga';
import { fork } from 'redux-saga-test-plan/matchers';

describe('rootSaga', () => {
  it('should fork all sagas', () => {
    testSaga(rootSaga)
      .next()
      .all([
        fork(moviesSaga),
        fork(TvSeriesSaga),
        fork(searchSaga)
      ])
      .finish();
  });

  it('should run root saga with all child sagas', () => {
    return expectSaga(rootSaga)
      .run();
  });
});
