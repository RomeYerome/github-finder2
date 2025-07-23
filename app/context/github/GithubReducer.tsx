


// The reducer function of the GithubReducer
const githubReducer = (
    state: GithubReducerState,
    action: GithubReducerActions
): GithubReducerState => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload,
                loading: false,
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                loading: false,
            }
        case 'SET_REPOS':
            return {
                ...state,
                repos: action.payload,
                loading: false,
            }
        case 'CLEAR_USERS':
            return {
                ...state,
                users: [],
                loading: false,
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }
}

export default githubReducer
