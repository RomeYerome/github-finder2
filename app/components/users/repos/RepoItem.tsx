import { Link } from 'react-router'
import { FaEye, FaInfo, FaLink, FaStar, FaUtensils } from 'react-icons/fa'

const RepoItem: React.FC<Repo> = ({
    name,
    description,
    html_url,
    forks,
    open_issues,
    watchers_count,
    stargazers_count,
}) => {
    return (
        <div className="mb-2 rounded-md card bg-gray-800 hover:bg-gray-900 text-white">
            <h3 className="mb-2 text-xl font-semibold">
                <a href={html_url}>
                    <FaLink className="mr-1 inline" /> {name}
                </a>
            </h3>
            <p className="mb-3">{description}</p>
            <div className='flex'>
                <div className="mr-2 badge badge-info badge-lg  flex px-8 py-2 rounded-lg">
                    <FaEye className='mr-2' /> {watchers_count}
                </div>
                <div className="mr-2 badge badge-success badge-lg  flex px-8 py-2 rounded-lg">
                    <FaStar className='mr-2' /> {stargazers_count}
                </div>
                <div className="mr-2 badge badge-error badge-lg  flex px-8 py-2 rounded-lg">
                    <FaInfo className='mr-2' /> {watchers_count}
                </div>
                <div className="mr-2 badge badge-warning badge-lg  flex px-8 py-2 rounded-lg">
                    <FaUtensils className='mr-2' /> {forks}
                </div>
            </div>
        </div>
    )
}

export default RepoItem
