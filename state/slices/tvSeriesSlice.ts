import { createSlice } from '@reduxjs/toolkit';

interface TvSerie {
  id: string;
  title: string;
  credits: {
    cast: {}[],
    crew: {}[]
  };
}

const tvSeriesSlice = createSlice({
  name: 'tvSeries',
  initialState: {
    popular: {
      page: 1,
      results: [] as TvSerie[],
      loading: false
    },
    tvSeriesDetails: {} as TvSerie[]
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
    setTvSeriesDetails: (state, action) => {
      state.tvSeriesDetails[action.payload.id] = action.payload;
    },
    setTvSeriesCredits: (state, action) => {
      state.tvSeriesDetails[action.payload.id] = {
        ...state.tvSeriesDetails[action.payload.id],
        credits: {
          cast: action.payload.cast,
          crew: action.payload.crew
        }
      };
    },
  },
});

export const { setPopular, setPopularLoading, setTvSeriesDetails, setTvSeriesCredits } = tvSeriesSlice.actions;
export default tvSeriesSlice.reducer;