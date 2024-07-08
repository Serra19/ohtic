import reducer, { setPopular, setPopularLoading, setTvSeriesDetails, setTvSeriesCredits } from '../tvSeriesSlice';

describe('tvSeriesSlice reducer', () => {
  const initialState = {
    popular: {
      page: 1,
      results: [],
      loading: false
    },
    tvSeriesDetails: {}
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: "test" })).toEqual(initialState);
  });

  it('should handle setPopular for the first page', () => {
    const action = {
      type: setPopular.type,
      payload: {
        page: 1,
        results: [{ id: 1, title: 'TV Series 1' }]
      }
    };
    const expectedState = {
      ...initialState,
      popular: {
        ...initialState.popular,
        loading: false,
        page: 1,
        results: [{ id: 1, title: 'TV Series 1' }]
      }
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setPopular for subsequent pages', () => {
    const action = {
      type: setPopular.type,
      payload: {
        page: 2,
        results: [{ id: 2, title: 'TV Series 2' }]
      }
    };
    const modifiedState = {
      ...initialState,
      popular: {
        ...initialState.popular,
        results: [{ id: 1, title: 'TV Series 1' }]
      }
    };
    const expectedState = {
      ...initialState,
      popular: {
        ...initialState.popular,
        loading: false,
        page: 2,
        results: [{ id: 1, title: 'TV Series 1' }, { id: 2, title: 'TV Series 2' }]
      }
    };
    expect(reducer(modifiedState, action)).toEqual(expectedState);
  });

  it('should handle setPopularLoading', () => {
    const action = { type: setPopularLoading.type };
    const expectedState = {
      ...initialState,
      popular: {
        ...initialState.popular,
        loading: true
      }
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setTvSeriesDetails', () => {
    const action = {
      type: setTvSeriesDetails.type,
      payload: { id: 1, title: 'TV Series 1' }
    };
    const expectedState = {
      ...initialState,
      tvSeriesDetails: {
        1: { id: 1, title: 'TV Series 1' }
      }
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setTvSeriesCredits', () => {
    const action = {
      type: setTvSeriesCredits.type,
      payload: { id: 1, cast: [], crew: [] }
    };
    const modifiedState = {
      ...initialState,
      tvSeriesDetails: {
        1: { id: 1, title: 'TV Series 1' }
      }
    };
    const expectedState = {
      ...initialState,
      tvSeriesDetails: {
        1: { id: 1, title: 'TV Series 1', credits: { cast: [], crew: [] } }
      }
    };
    expect(reducer(modifiedState, action)).toEqual(expectedState);
  });
});
