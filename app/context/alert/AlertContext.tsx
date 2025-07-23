import { createContext, useReducer } from "react";
import alertReducer from "./AlertReducer";

// #TYPES
// type for the alert state object
interface Alert {
    msg: string;
    type: 'error' | 'success';
}

// type for the alert reducer state object
interface AlertReducerState {
    alert: Alert | null
}


// type for the alert context object
interface AlertContextType {
    alert: Alert | null;
    setAlert: (alert: Alert) => void;
    removeAlert: () => void;
}


// #CONTEXT
const AlertContext = createContext<AlertContextType | null>(null);

// #PROVIDER FUNCTION COMPONENT
export const AlertProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    // #INITIAL STATE
    const initialState: AlertReducerState = {
        alert: null
    }

    const [state, dispatch] = useReducer(alertReducer, initialState);

    // #ALERT FUNCTIONS
    const setAlert: AlertContextType['setAlert'] = (alert: Alert) => {
        dispatch({type: 'SET_ALERT', payload: alert})

        // remove the alert after 3 seconds
        setTimeout(() => {
            removeAlert()
        }, 3000)
    }

    const removeAlert: AlertContextType['removeAlert'] = () => {
        dispatch({type: 'REMOVE_ALERT'})
    }

    // #CONTEXT DATA
    const contextData: AlertContextType = {
        alert: state.alert,
        setAlert,
        removeAlert
    }

    return <AlertContext.Provider value={contextData}>{children}</AlertContext.Provider>
}





export default AlertContext;