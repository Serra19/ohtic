import { put, call, throttle } from 'redux-saga/effects';
import { search } from '@/app/api';
import { setQuery, setResults } from '../slices/searchSlice';

export function* searching(action: any) {
  yield put(setQuery(action.text));
  const data: [] = yield call(search, action.text);
  yield put(setResults(data));
}

function* searchSaga() {
  yield throttle(500, 'SEARCH', searching);
}

export default searchSaga;