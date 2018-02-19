export const Reducer = (state, action) => {
    if (!state) {
        return {
            themeColor: 'red'
        }
    }
    switch (action.type) {
        case 'change_color':
            return {
                ...state,
                themeColor: action.themeColor
            }
        default:
            return state;
    }
}
