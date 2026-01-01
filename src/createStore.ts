export function createStore<T>(initialState: T) {
  let state = initialState;

  return {
    getState: () => state,
  };
}
