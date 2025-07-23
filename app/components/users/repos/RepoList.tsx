import { useContext } from 'react'
import GithubContext from '../../../context/github/GithubContext'
import RepoItem from './RepoItem'

const RepoList = () => {
    const context = useContext(GithubContext)

    if (!context) {
        throw new Error('RepoList must be used within a GithubProvider')
    }

    const { repos } = context
    return (
        <div className="rounded-lg shadow-lg card bg-base-100">
            <div className="card-body">
                <h2 className="text-3xl my-4 font-bold card-title">
                    Latest Repositories
                </h2>
                {repos.map((repo) => (
                    <RepoItem key={repo.id} {...repo} />
                ))}
            </div>
        </div>
    )
}

export default RepoList
