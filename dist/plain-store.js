(function () {
  function createStore(initialState) {
    let state = initialState;
    let listeners = [];

    function getState() {
      return state;
    }

    function set(partialState) {
      state = Object.assign({}, state, partialState);
      listeners.forEach((listener) => {
        try {
          listener(state);
        } catch (e) {
          console.error("[plain-store-js]", e);
        }
      });
    }

    function subscribe(listener) {
      listeners.push(listener);
      return function unsubscribe() {
        listeners = listeners.filter((l) => l !== listener);
      };
    }

    function select(selector) {
      return selector(state);
    }

    return {
      getState,
      set,
      subscribe,
      select,
    };
  }

  window.PlainStore = {
    createStore,
  };
})();
