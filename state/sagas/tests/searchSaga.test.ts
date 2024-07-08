import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { call, put } from 'redux-saga/effects';
import searchSaga, { searching } from '../searchSaga';
import { search } from '@/app/api';
import { setQuery, setResults } from '../../slices/searchSlice';

describe('searchSaga', () => {
  it('should handle searching', () => {
    const action = { type: 'SEARCH', text: 'test' };
    const searchResults = [{ id: 1, name: 'Result 1' }, { id: 2, name: 'Result 2' }];

    return expectSaga(searching, action)
      .provide([
        [call(search, action.text), searchResults]
      ])
      .put(setQuery(action.text))
      .put(setResults(searchResults))
      .run();
  });

  it('should throttle search actions', () => {
    testSaga(searchSaga)
      .next()
      .throttle(500, 'SEARCH', searching)
      .finish();
  });
});
