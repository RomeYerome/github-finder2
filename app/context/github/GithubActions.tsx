const GITHUB_URL = import.meta.env.VITE_GITHUB_URL
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN



// ######################################### FUNCTIONS #########################################

// Search Users by username
export const searchUsers = async (text: string): Promise<User[]> => {
    // dispatch({ type: 'SET_LOADING' })

    const params = new URLSearchParams({ q: text })
    const response = await fetch(
        `${import.meta.env.VITE_GITHUB_URL}/search/users?${params}`,
        {
            headers: {
                Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
        }
    )

    const { items: users } = await response.json()
    // dispatch({ type: 'SET_USERS', payload: users })
    return users
}



// Get Single User by username
    export const getUser = async (username: string): Promise<UserDetails> => {
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

        return user
    }


    // Get Repos by username
    export const getUserRepos = async (username: string): Promise<Repo[]> => {
        const response = await fetch(
            `${import.meta.env.VITE_GITHUB_URL}/users/${username}/repos`,
            {
                headers: {
                    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
                },
            }
        )
        const repos = await response.json()

        return repos

    }



    // Get user and repos
    export const getUserAndRepos = async (username: string): Promise<{user: UserDetails, repos: Repo[]}> => {
        const [user, repos] = await Promise.all([
            getUser(username),
            getUserRepos(username),
        ])

        return { user, repos }
    }