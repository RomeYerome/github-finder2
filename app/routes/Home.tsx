import type { Route } from './+types/Home'
import UserResults from '../components/users/UserResults'
import Spinner from '../components/shared/Spinner'
import { GithubProvider } from '../context/github/GithubContext'
import { AlertProvider } from '../context/alert/AlertContext'
import UserSearch from '../components/users/UserSearch'
import Alert from '../components/layout/Alert'

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Github Finder App' },
        { name: 'description', content: 'Welcome to React Router!' },
    ]
}

export async function clientLoader({}: Route.LoaderArgs) {
    // const response = await fetch(`${import.meta.env.VITE_GITHUB_URL}/users`, {
    //     headers: {
    //         Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    //     },
    // })
    // // await new Promise(resolve => setTimeout(resolve, 1000))
    // const users = (await response.json()) as User[]
    // return {
    //     users,
    // }
}

// // Render Spinner while the clientLoader is running
// export function HydrateFallback() {
//     return (
//         <div className="flex-1 container px-4 pb-12 mx-auto flex flex-col justify-center items-center">
//             <Spinner />
//         </div>
//     )
// }

export default function Home({ loaderData }: Route.ComponentProps) {
    // const { users } = loaderData

    return (
        <div className="flex-1 px-4 pb-12 flex flex-col justify-center">
            <GithubProvider
            // loaderUsers={users}
            >
                <AlertProvider>
                    <Alert />
                    <UserSearch />
                    <UserResults />
                </AlertProvider>
            </GithubProvider>
        </div>
    )
}
