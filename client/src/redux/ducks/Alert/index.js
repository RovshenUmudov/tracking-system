const actions = {
    ALERT: "ALERT",
    CLEAR_ALERT: 'CLEAR_ALERT',
}

let initialState = {
    data: null,
}

const alertReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actions.ALERT: {
            return {
                data: payload
            }
        }
        case actions.CLEAR_ALERT: {
            return {...initialState}
        }
        default: {
            return state
        }
    }
}

export const alert_THK = (payload) => (dispatch) => {
    dispatch({type: actions.ALERT, payload: payload})
    
    setTimeout(() => {
        dispatch({type: actions.CLEAR_ALERT})
    }, 4000)
}

export default alertReducer