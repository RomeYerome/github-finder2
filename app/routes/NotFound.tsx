import { isRouteErrorResponse, Link, useLocation } from 'react-router'
import type { Route } from './+types/NotFound'

const NotFound: React.FC = () => {
    const location = useLocation()
    throw new Response(`Page not found: ${location.pathname}`, { status: 404 })
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = 'Oops!'
    let details = 'An unexpected error occurred.'
    let stack: string | undefined

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? '404' : 'Error'
        details =
            error.status === 404
                ? error.data || 'The requested page could not be found.'
                : error.statusText || details
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message
        stack = error.stack
    }

    return (
        <div className="flex-1 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">
                    {message}
                </h1>
                <p className="text-xl text-gray-600 mb-8">{details}</p>
                {stack && (
                    <pre className="w-full p-4 overflow-x-auto">
                        <code>{stack}</code>
                    </pre>
                )}
                <Link
                    to="/"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Go Home
                </Link>
            </div>
        </div>
    )
}

export default NotFound
