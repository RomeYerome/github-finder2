// #TYPES
// type for the alert state object
interface Alert {
    msg: string
    type: 'error' | 'success'
}

// type for the alert reducer state object
interface AlertReducerState {
    alert: Alert | null
}

// type for the alert reducer action object
type AlertReducerActionType =
    | { type: 'SET_ALERT'; payload: Alert }
    | { type: 'REMOVE_ALERT' }

// #REDUCER
const alertReducer = (
    state: AlertReducerState,
    action: AlertReducerActionType
): AlertReducerState => {
    switch (action.type) {
        case 'SET_ALERT':
            return { alert: action.payload }
        case 'REMOVE_ALERT':
            return { alert: null }
        default:
            return state
    }
}

export default alertReducer
