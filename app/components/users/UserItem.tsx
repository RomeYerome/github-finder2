import { Link } from 'react-router'

type UserItemProps = {
    user: User
}

const UserItem: React.FC<UserItemProps> = ({ user: { login, avatar_url } }) => {
    return (
        <div className="card shadow-md bg-gray-300">
            <div className="flex items-center space-x-4 card-body">
                <div>
                    <div className="avatar">
                        <div className="rounded-full shadow w-14 h-14">
                            <img
                                src={avatar_url}
                                alt="Profile"
                                className="rounded-full"
                            />
                        </div>
                    </div>
                </div>
                <div className="leading-tight">
                    <h2 className="card-title font-bold text-lg">{login}</h2>
                    <Link
                        to={`/user/${login}`}
                        className="text-gray-500 text-opacity-40 text-xs"
                    >
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserItem
