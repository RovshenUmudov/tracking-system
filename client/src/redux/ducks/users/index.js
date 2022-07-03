import {userAPI} from "../../../API/api";

const actions = {
    USERS_REQUEST: "USERS_REQUEST",
    USERS_SUCCESS: "USERS_SUCCESS",
    USERS_FAILURE: "USERS_FAILURE"
}

const initialState = {
    data: null,
    loading: false,
    error: null
}

const index = (state = initialState, {type, payload}) => {
    switch (type) {
        case actions.USERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actions.USERS_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: null
            }
        case actions.USERS_FAILURE:
            return {
                ...state,
                data: null,
                loading: false,
                error: payload
            }
        default: {
            return state
        }
    }
}

//fetch users
export const fetchUsers_THK = () => (dispatch) => {
    dispatch({type: actions.USERS_REQUEST})

    return userAPI.getUsers().then(data => {

        if (data.resultCode !== 0) {
            return dispatch({type: actions.USERS_FAILURE, payload: data.messages});
        }

        dispatch({type: actions.USERS_SUCCESS, payload: data.users})
    })
}

export default index