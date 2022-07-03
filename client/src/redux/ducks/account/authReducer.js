import {userAPI} from "../../../API/api";

const actions = {
    AUTH_REQUEST: 'AUTH_REQUEST',
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    AUTH_FAILURE: 'AUTH_FAILURE',

    USER_DATA: 'USER_DATA',

    SET_AUTH_DATA: 'SET_AUTH_DATA',
    CLEAR_AUTH_DATA: 'CLEAR_AUTH_DATA'
}

const initialState = {
    authData: null,
    userData: {
        assigneeIssues: null
    },
    loading: false,
    error: null,
    isAuth: false,
}

const accountLogin = (state = initialState, {type, payload}) => {
    switch (type) {
        case actions.AUTH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actions.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            }
        case actions.AUTH_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case actions.SET_AUTH_DATA:
            return {
                ...state,
                authData: payload,
                loading: false,
                error: null,
                isAuth: true,
            }
        case actions.USER_DATA: {
            return {
                ...state,
                userData: payload,
                loading: false,
            }
        }
        case actions.CLEAR_AUTH_DATA: {
            return {...initialState}
        }
        default:
            return state
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// check is user is logged
//////////////////////////////////////////////////////////////////////////////////////////////////

export const isAuthMe_THK = () => (dispatch) => {
    dispatch({type: actions.AUTH_REQUEST})

    return userAPI.isAuth().then(data => {

        if (data.resultCode !== 0) {
            return dispatch({type: actions.AUTH_FAILURE, payload: null})
        }

        dispatch({type: actions.AUTH_SUCCESS})
        localStorage.setItem("jwtToken", JSON.stringify(data.token))

        dispatch({
            type: actions.SET_AUTH_DATA,
            payload: {
                email: data.email,
                id: data.id
            }
        })
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Login & Register
//////////////////////////////////////////////////////////////////////////////////////////////////

export const auth_THK = ({email, password, type}) => (dispatch) => {
    dispatch({type: actions.AUTH_REQUEST})

    return userAPI.auth(email, password, type).then((data) => {

        if (data.resultCode !== 0) {
            return dispatch({type: actions.AUTH_FAILURE, payload: data.errors ? data.errors[0].msg : data.message})
        }

        localStorage.setItem("jwtToken", JSON.stringify(data.token))

        dispatch(isAuthMe_THK())
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Logout
//////////////////////////////////////////////////////////////////////////////////////////////////

export const logout_THK = () => (dispatch) => {
    return userAPI.logout().then(data => {
        if (data.resultCode === 0) {
            dispatch({type: actions.CLEAR_AUTH_DATA});
            localStorage.removeItem("jwtToken")
        }
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// get user data
//////////////////////////////////////////////////////////////////////////////////////////////////

export const getUserData_THK = () => (dispatch) => {
    dispatch({type: actions.AUTH_REQUEST})

    return userAPI.getAuthorizedUserData().then(data => {

        if (data.resultCode !== 0) {
            console.log(data);
        }
        dispatch({type: actions.USER_DATA, payload: data.data})
    })
}

export default accountLogin