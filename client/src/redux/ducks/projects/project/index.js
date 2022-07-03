import {issuesAPI, projectsAPI} from "../../../../API/api";

const actions = {
    SINGLE_PROJECT_REQUEST: 'SINGLE_PROJECT_REQUEST',
    SINGLE_PROJECT_SUCCESS: 'SINGLE_PROJECT_SUCCESS',
    SINGLE_PROJECT_FAILURE: 'SINGLE_PROJECT_FAILURE',

    CLEAR_SINGLE_PROJECT: 'CLEAR_SINGLE_PROJECT',
}

let initialState = {
    data: null,
    loading: false,
    error: null
}

const singleProjectReducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case actions.SINGLE_PROJECT_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        case actions.SINGLE_PROJECT_SUCCESS: {
            return {
                ...state,
                data: payload,
                loading: false,
                error: null
            }
        }
        case actions.SINGLE_PROJECT_FAILURE: {
            return {
                ...state,
                data: null,
                loading: false,
                error: payload
            }
        }
        case actions.CLEAR_SINGLE_PROJECT: {
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

export const getSingleProject_THK = (id) => (dispatch) => {
    dispatch({type: actions.SINGLE_PROJECT_REQUEST})

    return projectsAPI.getSingleProject(id).then(data => {

        if (data.resultCode !== 0) {
            return dispatch({type: actions.SINGLE_PROJECT_FAILURE, payload: data.message})
        }

        dispatch({type: actions.SINGLE_PROJECT_SUCCESS, payload: {project: data.project, issues: data.issues}})
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Move task on board
//////////////////////////////////////////////////////////////////////////////////////////////////

export const moveIssue_THK = (issueId, projectId, boardId) => (dispatch) => {
    dispatch({type: actions.SINGLE_PROJECT_REQUEST})

    return issuesAPI.moveIssue(issueId, boardId).then(data => {
        if (data.resultCode !== 0) {
            return dispatch({type: actions.SINGLE_PROJECT_FAILURE, payload: data.message})
        }

        dispatch(getSingleProject_THK(projectId))
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Clear
//////////////////////////////////////////////////////////////////////////////////////////////////

export const clearSingleProject_THK = () => (dispatch) => {
    dispatch({type: actions.CLEAR_SINGLE_PROJECT})
}

export default singleProjectReducer