export const Reducer = (state, action) => {
    if (!state) {
        return {
            themeColor: 'red',
            comments: []
        }
    }
    switch (action.type) {
        case 'change_color':
            return {
                ...state,
                themeColor: action.themeColor
            }
        case 'add_comment':
            return {
                ...state,
                comments: action.comments
            }
        default:
            return state;
    }
}
