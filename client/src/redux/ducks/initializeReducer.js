import {isAuthMe_THK} from "./account/authReducer";

const INITIALIZE = "INITIALIZE"

let initialState = {
    initialize: false,
}

const initializeReducer = (state = initialState, action) => {

    switch (action.type) {
        case INITIALIZE: {
            return {
                ...state,
                initialize: true
            }
        }
        default: {
            return state
        }
    }
}

//thunks
export const initialize_THK = () => (dispatch) => {
    let isAuth = dispatch(isAuthMe_THK())
    Promise.all([isAuth]).then(() => dispatch({type: INITIALIZE}))
}

export default initializeReducer