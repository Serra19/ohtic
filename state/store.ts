import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import moviesReducer from './slices/moviesSlice';
import tvSeriesReducer from './slices/tvSeriesSlice';
import searchReducer from './slices/searchSlice';

import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['movies', 'tvSeries', 'search'],
};

const rootReducer = combineReducers({
  movies: moviesReducer,
  tvSeries: tvSeriesReducer,
  search: searchReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };