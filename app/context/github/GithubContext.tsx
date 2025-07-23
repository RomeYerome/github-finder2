import { createContext, useReducer, useEffect } from 'react'
import githubReducer from './GithubReducer'

// ######################################################### CONTEXT OBJECT #########################################################

// create the context object. This is the object that will be used to provide the context data to the components that need it.
const GithubContext = createContext<GithubContext | undefined>(undefined)

// ######################################################### PROVIDER FUNCTION COMPONENT #########################################################

// create the provider function component
export const GithubProvider: React.FC<{
    children: React.ReactNode
    loaderUsers?: User[]
    loaderUser?: UserDetails
    loaderRepos?: Repo[]
}> = ({ children, loaderUsers, loaderUser, loaderRepos }) => {
    // ######################################################### INITIALSTATE #########################################################

    // define the initial state for the reducer function
    const initialState: GithubReducerState = {
        users: loaderUsers || [],
        user: loaderUser || {},
        repos: loaderRepos || [],
        loading: false,
    }

    // ######################################################### USEREDUCER HOOK #########################################################
    // useReducer hook to create the state and dispatch function
    const [state, dispatch] = useReducer(githubReducer, initialState)

    // // use dispatch function to Update users when loaderUsers prop changes - for updating the users state when the loaderUsers prop changes
    // useEffect(() => {
    //     if (loaderUsers) {
    //         dispatch({ type: 'SET_USERS', payload: loaderUsers })
    //     }
    // }, [loaderUsers])

    // ######################################################### FUNCTIONS #########################################################



    // Get Single User by username
    const getUser = async (username: string): Promise<void> => {
        dispatch({ type: 'SET_LOADING' })
        const response = await fetch(
            `${import.meta.env.VITE_GITHUB_URL}/users/${username}`,
            {
                headers: {
                    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
                },
            }
        )
        if (!response.ok) {
            throw new Error('User not found')
        }
        const user = await response.json()
        dispatch({ type: 'SET_USER', payload: user })
    }

    // Get Repos by username
    const getUserRepos = async (username: string): Promise<void> => {
        dispatch({ type: 'SET_LOADING' })
        const response = await fetch(
            `${import.meta.env.VITE_GITHUB_URL}/users/${username}/repos`,
            {
                headers: {
                    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
                },
            }
        )
        const { items: repos } = await response.json()

        dispatch({ type: 'SET_REPOS', payload: repos })
    }

    // Clear Users state
    const clearUsers = (): void => {
        dispatch({ type: 'CLEAR_USERS' })
    }

    // data to be passed into the Context Object - for use in the components that need it
    const contextData: GithubContext = {
        ...state,
        dispatch,
        clearUsers,
        getUser,
        getUserRepos,
    }

    // return the provider component with the context data
    return (
        <GithubContext.Provider value={contextData}>
            {children}
        </GithubContext.Provider>
    )
}

export default GithubContext
