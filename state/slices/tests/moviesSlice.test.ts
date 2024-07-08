import reducer, { setPopular, setPopularLoading, setMoviesDetails, setMoviesCredits } from '../moviesSlice';

describe('moviesSlice reducer', () => {
  const initialState = {
    popular: {
      page: 1,
      results: [],
      loading: false
    },
    moviesDetails: {}
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setPopular for the first page', () => {
    const action = {
      type: setPopular.type,
      payload: {
        page: 1,
        results: [{ id: 1, title: 'Movie 1' }]
      }
    };
    const expectedState = {
      ...initialState,
      popular: {
        ...initialState.popular,
        loading: false,
        page: 1,
        results: [{ id: 1, title: 'Movie 1' }]
      }
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setPopular for subsequent pages', () => {
    const action = {
      type: setPopular.type,
      payload: {
        page: 2,
        results: [{ id: 2, title: 'Movie 2' }]
      }
    };
    const modifiedState = {
      ...initialState,
      popular: {
        ...initialState.popular,
        results: [{ id: 1, title: 'Movie 1' }]
      }
    };
    const expectedState = {
      ...initialState,
      popular: {
        ...initialState.popular,
        loading: false,
        page: 2,
        results: [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }]
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

  it('should handle setMoviesDetails', () => {
    const action = {
      type: setMoviesDetails.type,
      payload: { id: 1, title: 'Movie 1' }
    };
    const expectedState = {
      ...initialState,
      moviesDetails: {
        1: { id: 1, title: 'Movie 1' }
      }
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setMoviesCredits', () => {
    const action = {
      type: setMoviesCredits.type,
      payload: { id: 1, cast: [], crew: [] }
    };
    const modifiedState = {
      ...initialState,
      moviesDetails: {
        1: { id: 1, title: 'Movie 1' }
      }
    };
    const expectedState = {
      ...initialState,
      moviesDetails: {
        1: { id: 1, title: 'Movie 1', credits: { cast: [], crew: [] } }
      }
    };
    expect(reducer(modifiedState, action)).toEqual(expectedState);
  });
});
