import reducer, { setQuery, setResults } from '../searchSlice';

describe('searchSlice reducer', () => {
  const initialState = {
    query: "",
    results: [],
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setQuery', () => {
    const action = {
      type: setQuery.type,
      payload: 'test query'
    };
    const expectedState = {
      ...initialState,
      query: 'test query',
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setResults', () => {
    const action = {
      type: setResults.type,
      payload: [{ id: 1, title: 'Result 1' }, { id: 2, title: 'Result 2' }]
    };
    const expectedState = {
      ...initialState,
      results: [{ id: 1, title: 'Result 1' }, { id: 2, title: 'Result 2' }],
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
