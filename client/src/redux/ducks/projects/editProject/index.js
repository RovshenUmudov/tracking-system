import {projectsAPI} from "../../../../API/api";

const actions = {
    EDIT_PROJECT_REQUEST: 'EDIT_PROJECT_REQUEST',
    EDIT_PROJECT_SUCCESS: 'EDIT_PROJECT_SUCCESS',
    EDIT_PROJECT_FAILURE: 'EDIT_PROJECT_FAILURE',

    CLEAR_EDIT_PROJECT: 'CLEAR_EDIT_PROJECT',
}

let initialState = {
    data: null,
    loading: false,
    error: null
}

const editProjectReducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case actions.EDIT_PROJECT_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        case actions.EDIT_PROJECT_SUCCESS: {
            return {
                ...state,
                data: payload,
                loading: false,
                error: null
            }
        }
        case actions.EDIT_PROJECT_FAILURE: {
            return {
                ...state,
                data: null,
                loading: false,
                error: payload
            }
        }
        case actions.CLEAR_EDIT_PROJECT: {
            return {
                ...initialState
            }
        }
        default: {
            return state
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Get project by id
//////////////////////////////////////////////////////////////////////////////////////////////////

export const editProject_THK = (id) => (dispatch) => {
    dispatch({type: actions.EDIT_PROJECT_REQUEST})

    return projectsAPI.editProject(id).then(data => {

        if (data.resultCode !== 0) {
            return dispatch({type: actions.EDIT_PROJECT_FAILURE, payload: data.message})
        }

        dispatch({type: actions.EDIT_PROJECT_SUCCESS, payload: data.project})
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Update project
//////////////////////////////////////////////////////////////////////////////////////////////////

export const updateProject_THK = (id, payload) => (dispatch) => {
    dispatch({type: actions.EDIT_PROJECT_REQUEST})

    return projectsAPI.updateProject(id, payload).then(data => {

        if (data.resultCode !== 0) {
            return dispatch({type: actions.EDIT_PROJECT_FAILURE, payload: data.message})
        }

        dispatch({type: actions.CLEAR_EDIT_PROJECT})
    })
}

export default editProjectReducer