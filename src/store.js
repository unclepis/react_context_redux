export function CreateStore(themeReducer) {
    let state = null;
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state;
    const dispatch = (action) => {
        state = themeReducer(state, action);
        listeners.forEach(listener => listener());
    }
    dispatch({});
    return { getState, dispatch, subscribe };
}