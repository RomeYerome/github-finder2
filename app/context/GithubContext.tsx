import { createContext, useState, useReducer } from 'react'


interface GithubContextType {
    users: User[]
    // repos: Repo[]
}

const GithubContext = createContext<GithubContextType | undefined>(undefined)


export const GithubProvider: React.FC<{ children: React.ReactNode, loaderUsers?: User[] }> = ({
    children,
    loaderUsers,
}) => {
    const [users, setUsers] = useState<User[]>(loaderUsers || [])
    // const [repos, setRepos] = useState<Repo[]>([])

    const contextData = {
        users,
        // repos: [],
    }

    return (
        <GithubContext.Provider value={contextData}>
            {children}
        </GithubContext.Provider>
    )
}

export default GithubContext
