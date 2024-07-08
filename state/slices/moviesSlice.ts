import { createSlice } from '@reduxjs/toolkit';

interface Movie {
  id: string;
  title: string;
  credits: {
    cast: {}[],
    crew: {}[]
  };
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    popular: {
      page: 1,
      results: [] as Movie[],
      loading: false
    },
    moviesDetails: {} as Movie[]
  },
  reducers: {
    setPopular: (state, action) => {
      state.popular.loading = false;
      state.popular.page = action.payload.page;
      if (action.payload.page === 1) {
        state.popular.results = action.payload.results;
      } else {
        state.popular.results = [...state.popular.results, ...action.payload.results];
      }
    },
    setPopularLoading: (state) => {
      state.popular.loading = true;
    },
    setMoviesDetails: (state, action) => {
      state.moviesDetails[action.payload.id] = action.payload;
    },
    setMoviesCredits: (state, action) => {
      state.moviesDetails[action.payload.id] = {
        ...state.moviesDetails[action.payload.id],
        credits: {
          cast: action.payload.cast,
          crew: action.payload.crew
        }
      };
    },
  },
});

export const { setPopular, setPopularLoading, setMoviesDetails, setMoviesCredits } = moviesSlice.actions;
export default moviesSlice.reducer;