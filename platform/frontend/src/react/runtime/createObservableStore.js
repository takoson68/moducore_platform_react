export function createObservableStore(initialState) {
  let state = initialState
  const listeners = new Set()

  function emit() {
    listeners.forEach((listener) => listener())
  }

  return {
    getState() {
      return state
    },

    setState(nextState) {
      state = typeof nextState === 'function' ? nextState(state) : nextState
      emit()
    },

    patch(partial) {
      state = {
        ...state,
        ...(typeof partial === 'function' ? partial(state) : partial)
      }
      emit()
    },

    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    }
  }
}
