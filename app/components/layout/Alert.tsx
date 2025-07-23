import { useContext } from 'react'
import AlertContext from '../../context/alert/AlertContext'

const Alert = () => {
    const alertContext = useContext(AlertContext)

    if (!alertContext) {
        throw new Error('Error from alertContext in Alert.tsx')
    }

    const { alert } = alertContext

    return (
        <div className="flex items-start mb-4 space-x-2">
            {alert && (
                <>
                    {alert.type === 'error' && (
                        <svg
                            className="w-6 h-6 flex-none mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="12" fill="#FECDD3" />
                            <path
                                d="M8 8l8 8M16 8l-8 8"
                                stroke="#B91C1C"
                                strokeWidth="2"
                            />
                        </svg>
                    )}
                    <p className={`flex-1 font-semibold leading-7 ${alert.type === 'error' ? 'text-red-700' : 'text-green-700'}`}>
                        <strong>{alert.msg}</strong>
                    </p>
                </>
            )}
            {<span className="invisible">invisible</span>}
        </div>
    )
}

export default Alert
