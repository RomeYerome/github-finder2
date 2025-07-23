import { useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import UserItem from './UserItem'
import Spinner from '../shared/Spinner'

// type UserResultsProps = {
//     users: User[] | []
// }

const UserResults: React.FC = () => {
    const context = useContext(GithubContext)
    let users: User[] = context?.users || []
    let loading: boolean = context?.loading || false

    if (loading) {
        return <Spinner />
    }

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {users &&
                users.length > 0 &&
                users.map((user) => <UserItem key={user.id} user={user} />)}
        </div>
    )
}

export default UserResults
