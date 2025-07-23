import { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'
import { searchUsers } from '../../context/github/GithubActions'

// #Plan
// 1. Create a form with an input field and a submit button
// 2. On submit, the input field value is passed to the searchUsers function which calls the GitHub API to search for users
// 3. On success, dispatch an action to the reducer function to update the state
// 4. The userResults component will pull the state which will be displayed in the UserResults component

// #Implementation

// #Types

// Type for the handleChange function
interface HandleChange {
    (e: React.ChangeEvent<HTMLInputElement>): void
}

// Type for the handleSubmit function
interface HandleSubmit {
    (e: React.FormEvent<HTMLFormElement>): void
}

// #Component
// UserSearch component
const UserSearch: React.FC = () => {
    // State to hold the text input value
    const [text, setText] = useState<string>('')

    // pull the Context to access the users, dispatch, and searchUsers functions
    const githubContext = useContext(GithubContext)
    const alertContext = useContext(AlertContext)
    
    // Check if the context is defined
    if (!githubContext) {
        throw new Error(
            'Something wrong with the githubContext: UserSearch'
        )
    }

    if (!alertContext) {
        throw new Error(
            'Something wrong with the alertContext: UserSearch'
        )
    }

    // Destructure the githubContext object to access the users, dispatch, and searchUsers functions
    const { users, dispatch } = githubContext

    // Destructure the alertContext object to access the setAlert function
    const { setAlert, removeAlert } = alertContext


    // Function to handle the change event of the input field
    const handleChange: HandleChange = (e) => {
        setText(e.target.value)
    }

    // Function to handle the submit event of the form
    const handleSubmit: HandleSubmit = async (e) => {
        e.preventDefault()

        // Check if the input field is empty
        if (text === '') {
            setAlert({ msg: 'Please enter a username', type: 'error' })
            return
        }

        // Make an API call to the GitHub API to search for users
        const users = await searchUsers(text)

        // Dispatch an action to the reducer to set the loading state
        dispatch({ type: 'SET_LOADING' })

        // Dispatch an action to the reducer to update the state
        dispatch({ type: 'SET_USERS', payload: users })

        // Clear the input field
        setText('')

        // await new Promise(resolve => setTimeout(resolve, 1000))
    }



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 mb-8 gap-8">
            {/* Form to search for users */}
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative shadow-md">
                            <input
                                type="text"
                                className="w-full p-2.5 pr-40 bg-gray-200 rounded-lg outline-0"
                                placeholder="Search"
                                value={text}
                                onChange={handleChange}
                            />
                            <button
                                type="submit"
                                className="absolute top-0 right-0 rounded-l-none w-36 btn p-2.5 px-8 bg-gray-600 text-white rounded-r-lg font-bold cursor-pointer"
                            >
                                Go
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {/* If there are users, display the clear button */}
            {users?.length > 0 && (
                <div className="flex justify-end md:justify-start">
                    <button 
                    onClick={() => dispatch({ type: 'CLEAR_USERS' })}
                    className="btn p-2 px-8 border-2 border-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-black shadow-lg font-bold text-gray-600">
                        Clear
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserSearch
