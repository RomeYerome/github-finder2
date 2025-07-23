import type { Route } from './+types/User'
import { redirect } from 'react-router'
import { Link } from 'react-router'
import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa'
import { GithubProvider } from '../context/github/GithubContext'
import RepoList from '../components/users/repos/RepoList'
import {getUser, getUserRepos} from '../context/github/GithubActions'


export async function clientLoader({ params }: Route.LoaderArgs) {
    const { username } = params
    const searchParams = new URLSearchParams({
        sort: 'created',
        per_page: '10',
    })
    
    const [userResponse, reposResponse] = await Promise.all([
        fetch(
            `${import.meta.env.VITE_GITHUB_URL}/users/${username}`,
            {
                headers: {
                    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
                },
            }
        ),
        fetch(
            `${import.meta.env.VITE_GITHUB_URL}/users/${username}/repos?${searchParams}`,
            {
                headers: {
                    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
                },
            }
        ),
    ])

    if (!userResponse.ok || !reposResponse.ok) {
        throw redirect('/notfound')
    }

    const data = await userResponse.json()
    const repos = await reposResponse.json()


    return { user: data, repos }

    // const response = await fetch(
    //     `${import.meta.env.VITE_GITHUB_URL}/users/${username}`,
    //     {
    //         headers: {
    //             Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    //         },
    //     }
    // )

    // const reposResponse = await fetch(
    //     `${import.meta.env.VITE_GITHUB_URL}/users/${username}/repos`,
    //     {
    //         headers: {
    //             Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    //         },
    //     }
    // )

    // if (!response.ok) {
    //     throw redirect('/notfound')
    // }

    // const data = await response.json()
    // return { user: data }
}

export async function clientAction({}: Route.ActionArgs) {
    return null
}

// export function HydrateFallback() {
//     return <div>Loading...</div>
// }

const User = ({ loaderData }: Route.ComponentProps) => {
    const { user, repos } = loaderData

    

    if (!user.login) {
        throw new Error('User not found in loaderData: User.tsx')
    }

    const {
        name,
        type,
        avatar_url,
        location,
        bio,
        blog,
        twitter_username,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
    } = user

    return (
        <GithubProvider loaderUser={user} loaderRepos={repos}>
            <>
                <div className="w-full mx-auto lg:w-10/12">
                    <div className="mb-4">
                        <Link to="/" className="btn font-medium text-sm">
                            Back to Search
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 mb-8 md:gap-8">
                        {/* Profile Picture Card */}
                        <div className="rounded-lg mb-6 md:mb-0 custom-card-image relative before:absolute before:inset-0 before:bg-black/50 before:rounded-lg">
                            <div className="rounded-lg shadow-xl image-full">
                                <figure>
                                    <img
                                        src={avatar_url}
                                        alt="Profile Picture"
                                        className="w-full h-full object-cover"
                                    />
                                </figure>
                                <div className="absolute bottom-0 inset-x-0 card-body justify-end z-10 text-white ml-8 mb-8">
                                    <h2 className="card-title mb-0 font-semibold text-xl leading-5">
                                        {name}
                                    </h2>
                                    <p className="text-xs">{login}</p>
                                </div>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="col-span-2 text-gray-800">
                            <div className="mb-6">
                                <h1 className="text-3xl card-title font-bold mb-2 inline-block">
                                    {name}
                                </h1>
                                <div className="ml-2 mr-1 badge badge-success ">
                                    {type}
                                </div>
                                {hireable && (
                                    <div className="mx-1 badge badge-info">
                                        Hireable
                                    </div>
                                )}
                                <p className="text-sm">{bio}</p>

                                <div className="mt-8 card-actions">
                                    <a
                                        href={html_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-ghost"
                                    >
                                        Visit Github Profile
                                    </a>
                                </div>
                            </div>

                            {/* Profile Contact Info */}

                            <div className="w-full rounded-lg shadow-md stats flex flex-wrap gap-4 divide-x-2 divide-gray-200 p-4">
                                {location && (
                                    <div className="stat p-4">
                                        <div className="stat-title text-sm">
                                            Location
                                        </div>
                                        <div className="stat-value text-lg font-medium">
                                            {location}
                                        </div>
                                    </div>
                                )}

                                {blog && (
                                    <div className="stat p-4">
                                        <div className="stat-title text-sm">
                                            Website
                                        </div>
                                        <div className="stat-value text-lg font-medium">
                                            <a
                                                href={`https://${blog}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {blog}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {twitter_username && (
                                    <div className="stat p-4">
                                        <div className="stat-title text-sm">
                                            Twitter
                                        </div>
                                        <div className="stat-value text-lg font-medium">
                                            {twitter_username}
                                        </div>
                                        <a
                                            href={`https://x.com/${twitter_username}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {twitter_username}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Github Stats */}
                    <div className="w-full py-5 mb-6 rounded-lg shadow-md stats px-4 flex gap-4 divide-x-2 divide-gray-200 justify-between text-gray-600">
                        <div className="stat flex-1 flex justify-between items-center flex-row-reverse px-4">
                            <div className="stat-figure">
                                <FaUsers className="text-3xl md:text-5xl text-pink-500" />
                            </div>
                            <div>
                                <div className="stat-title pr-5 text-sm">
                                    Followers
                                </div>
                                <div className="stat-value text-3xl md:text-4xl font-bold pr-5">
                                    {followers}
                                </div>
                            </div>
                        </div>

                        <div className="stat flex flex-1 justify-between items-center flex-row-reverse px-4">
                            <div className="stat-figure">
                                <FaUserFriends className="text-3xl md:text-5xl text-pink-500" />
                            </div>
                            <div>
                                <div className="stat-title pr-5 text-sm">
                                    Following
                                </div>
                                <div className="stat-value text-3xl md:text-4xl font-bold pr-5">
                                    {following}
                                </div>
                            </div>
                        </div>

                        <div className="stat flex flex-1 justify-between items-center flex-row-reverse px-4">
                            <div className="stat-figure">
                                <FaCodepen className="text-3xl md:text-5xl text-pink-500" />
                            </div>
                            <div>
                                <div className="stat-title pr-5 text-sm">
                                    Public Repos
                                </div>
                                <div className="stat-value text-3xl md:text-4xl font-bold pr-5">
                                    {public_repos}
                                </div>
                            </div>
                        </div>

                        <div className="stat flex flex-1 justify-between items-center flex-row-reverse px-4">
                            <div className="stat-figure">
                                <FaStore className="text-3xl md:text-5xl text-pink-500" />
                            </div>
ed                            <div>
                                <div className="stat-title pr-5 text-sm">
                                    Public Gists
                                </div>
                                <div className="stat-value text-3xl md:text-4xl font-bold pr-5">
                                    {public_gists}
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Repo List */}
                    <RepoList />
                </div>
            </>
        </GithubProvider>
    )
}

export default User
