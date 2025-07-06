import { useState, useEffect, useContext } from 'react'
import GithubContext from '../../context/GithubContext'
import UserItem from './UserItem'

// type UserResultsProps = {
//     users: User[] | []
// }

const UserResults: React.FC = () => {
    const context = useContext(GithubContext)
    const users = context?.users || []

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {users && users.length > 0 ? (
                users.map((user) => <UserItem key={user.id} user={user} />)
            ) : (
                <h3 className="text-center text-3xl">No users found</h3>
            )}
        </div>
    )
}

export default UserResults
