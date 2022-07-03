import {issuesAPI, userAPI} from "../../../API/api";
import {alert_THK} from "../Alert";

const actions = {
    ISSUES_REQUEST: 'ISSUES_REQUEST',
    ISSUES_SUCCESS: 'ISSUES_SUCCESS',
    ISSUES_FAILURE: 'ISSUES_FAILURE',

    CLEAR_ISSUES: 'CLEAR_ISSUES',
}

let initialState = {
    data: null,
    loading: false,
    error: null,
}

const issuesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actions.ISSUES_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        case actions.ISSUES_SUCCESS: {
            return {
                ...state,
                data: payload,
                loading: false,
                error: null
            }
        }
        case actions.ISSUES_FAILURE: {
            return {
                ...state,
                data: null,
                loading: false,
                error: payload
            }
        }
        case actions.CLEAR_ISSUES: {
            return {...initialState}
        }
        default: {
            return state
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Create issue
//////////////////////////////////////////////////////////////////////////////////////////////////

export const createIssue_THK = (id, payload) => (dispatch) => {
    dispatch({type: actions.ISSUES_REQUEST})

    return issuesAPI.createIssue(id, payload).then(data => {

        if (data.resultCode !== 0) {
            return dispatch({type: actions.ISSUES_FAILURE, payload: data.message})
        }
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Get issue
//////////////////////////////////////////////////////////////////////////////////////////////////

export const getIssue_THK = (id) => (dispatch) => {
    dispatch({type: actions.ISSUES_REQUEST})
    dispatch({type: actions.CLEAR_ISSUES})

    return issuesAPI.getIssue(id).then(data => {

        if (data.resultCode !== 0) {
            return dispatch({type: actions.ISSUES_FAILURE, payload: data.message})
        }

        dispatch({type: actions.ISSUES_SUCCESS, payload: data.issue})
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Get issues
//////////////////////////////////////////////////////////////////////////////////////////////////

export const getIssues_THK = () => (dispatch) => {
    dispatch({type: actions.ISSUES_REQUEST})
    dispatch({type: actions.CLEAR_ISSUES})

    return issuesAPI.getIssues().then(data => {

        if (data.resultCode !== 0) {
            return dispatch({type: actions.ISSUES_FAILURE, payload: data.message})
        }

        dispatch({type: actions.ISSUES_SUCCESS, payload: data.issues})
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Update issue
//////////////////////////////////////////////////////////////////////////////////////////////////

export const updateIssue_THK = (id, payload) => (dispatch) => {
    dispatch({type: actions.ISSUES_REQUEST})

    return issuesAPI.updateIssue(id, payload).then(data => {

        if (data.resultCode !== 0) {
            return dispatch({type: actions.ISSUES_FAILURE, payload: data.message})
        }

        dispatch(getIssue_THK(id))
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Remove issue
//////////////////////////////////////////////////////////////////////////////////////////////////

export const removeIssue_THK = (id) => (dispatch) => {
    dispatch({type: actions.ISSUES_REQUEST})

    return issuesAPI.removeIssue(id).then(data => {
        if (data.resultCode !== 0) {
            return dispatch({type: actions.ISSUES_FAILURE, payload: data.message})
        }
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Update issue item
//////////////////////////////////////////////////////////////////////////////////////////////////

export const updateIssueItem_THK = (issueId, item) => (dispatch) => {
    dispatch({type: actions.ISSUES_REQUEST})

    return issuesAPI.updateIssueItem(issueId, item).then(data => {
        if (data.resultCode !== 0) {
            return dispatch({type: actions.ISSUES_FAILURE, payload: data.message})
        }

        dispatch(getIssue_THK(issueId))
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Log Time
//////////////////////////////////////////////////////////////////////////////////////////////////

export const logTime_THK = (issueID, payload) => (dispatch, getState) => {
    const {account} = getState()

    return userAPI.logTime(account.authData.id, issueID, payload).then(data => {
        if (data.resultCode !== 0) {
            console.log("error", data);
        }

        dispatch(getIssue_THK(issueID))
        dispatch(alert_THK(data.message))
    })
}

export default issuesReducer