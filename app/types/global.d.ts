declare interface User {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    user_view_type: string
    site_admin: boolean
}

declare interface UserDetails extends User {
    name: string
    company: string
    blog: string
    location: string
    email: string
    hireable: boolean
    bio: string
    twitter_username: string
    public_repos: number
    public_gists: number
    followers: number
    following: number
    created_at: string
    updated_at: string
}

declare interface Repo {
    id: number
    name: string
    description: string
    html_url: string
    forks: number
    open_issues: number
    watchers_count: number
    stargazers_count: number
}


// ######################################################### GITHUB CONTEXT TYPES #########################################################

// interface for the reducer state type, used to add type safety to the initial state
interface GithubReducerState {
    users: User[]
    user: UserDetails | {}
    repos: Repo[]
    loading: boolean
}

// interface for the context type, used to add type safety to the context object as well as the context value/data
interface GithubContext {
    users: User[]
    user: UserDetails | {}
    repos: Repo[]
    loading: boolean
    dispatch: React.Dispatch<GithubReducerActions>
    // searchUsers: (text: string) => void
    clearUsers: () => void
    getUser: (username: string) => Promise<void>
    getUserRepos: (username: string) => Promise<void>
}

// interface for the reducer action type - adds type safety to the action object passed to the dispatch function
type GithubReducerActions =
    | { type: 'SET_USERS'; payload: User[] }
    | { type: 'SET_USER'; payload: UserDetails }
    | { type: 'SET_REPOS'; payload: Repo[] }
    | { type: 'SET_LOADING' }
    | { type: 'CLEAR_USERS' }
