import { Outlet, isRouteErrorResponse, Link } from 'react-router'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const layout: React.FC = () => {
    return (
                <Outlet />
    )
}

export function ErrorBoundary({ error }: { error: unknown }) {
    let message = 'Oops!'
    let details = 'An unexpected error occurred from layout.'
    let stack: string | undefined

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? '404' : 'Error'
        details =
            error.status === 404
                ? 'The requested page could not be found.'
                : error.statusText || details
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message
        stack = error.stack
    }

    return (
        <>
            <Navbar />
            <main>
                <div className=" flex items-center justify-center bg-gray-100">
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
            </main>
            <Footer />
        </>
    )
}

export default layout
