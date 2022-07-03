import {projectsAPI} from "../../../../API/api";

const actions = {
    PROJECTS_REQUEST: 'PROJECTS_REQUEST',
    PROJECTS_SUCCESS: 'PROJECTS_SUCCESS',
    PROJECTS_FAILURE: 'PROJECTS_FAILURE',
}

let initialState = {
    data: [],
    loading: false,
    error: null,
}

const projectsReducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case actions.PROJECTS_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null,
            }
        }
        case actions.PROJECTS_SUCCESS: {
            return {
                ...state,
                data: payload,
                loading: false,
                error: null,
            }
        }
        case actions.PROJECTS_FAILURE: {
            return {
                ...state,
                data: [],
                loading: false,
                error: payload
            }
        }
        default: {
            return state
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Fetch projects
//////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchProject_THK = () => (dispatch) => {
    dispatch({type: actions.PROJECTS_REQUEST})

    projectsAPI.getProjects().then(data => {

        if (data.resultCode !== 0) {
            return dispatch({type: actions.PROJECTS_FAILURE, payload: data.message});
        }

        dispatch({type: actions.PROJECTS_SUCCESS, payload: data.projects})
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Create new project
//////////////////////////////////////////////////////////////////////////////////////////////////

export const createProject_THK = (payload) => (dispatch) => {
    dispatch({type: actions.PROJECTS_REQUEST})

    projectsAPI.createProject(payload).then(data => {
        if (data.resultCode !== 0) {
            return dispatch({type: actions.PROJECTS_FAILURE, payload: data.messages});
        }
    })

    dispatch(fetchProject_THK())
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Remove project
//////////////////////////////////////////////////////////////////////////////////////////////////

export const removeProject_THK = (id) => (dispatch) => {
    dispatch({type: actions.PROJECTS_REQUEST})

    projectsAPI.removeProject(id).then(data => {

        if (data.resultCode !== 0) {
            return dispatch({type: actions.PROJECTS_FAILURE, payload: data.messages});
        }

        dispatch(fetchProject_THK())
    })
}

export default projectsReducer