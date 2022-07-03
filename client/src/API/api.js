import * as axios from "axios";

const instance = () => {
    return axios.create({
        baseURL: "/api/",
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("jwtToken"))
        }
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// PROJECTS API
//////////////////////////////////////////////////////////////////////////////////////////////////

export const projectsAPI = {
    //get projects
    getProjects: () => instance().get(`projects`).then(response => response.data).catch(error => error.response.data),

    //create project
    createProject: (project) => instance().post(`projects/create`, project).then(response => response.data).catch(error => error.response.data),

    //get project by id
    getSingleProject: (id) => instance().get(`projects/${id}`).then(response => response.data).catch(error => error.response.data),

    //remove project
    removeProject: (id) => instance().delete(`projects/${id}`).then(response => response.data).catch(error => error.response.data),

    //get project for edit
    editProject: (id) => instance().get(`projects/${id}`).then(response => response.data).catch(error => error.response.data),

    //update project
    updateProject: (id, payload) => instance().put(`projects/${id}`, {data: payload}).then(response => response.data).catch(error => error.response.data),
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// ISSUE API
//////////////////////////////////////////////////////////////////////////////////////////////////

export const issuesAPI = {
    //create issue
    createIssue: (id, payload) => instance().post(`issues`, {
        id,
        payload
    }).then(response => response.data),

    //update
    updateIssue: (issueId, payload) => instance().put(`issues/${issueId}`, {payload}).then(response => response.data).catch(error => error.response.data),

    //move
    moveIssue: (issueId, board) => instance().put(`issues/move/${issueId}`, {board}).then(response => response.data).catch(error => error.response.data),

    //get issue by id
    getIssue: (id) => instance().get(`issues/${id}`).then(response => response.data).catch(error => error.response.data),

    //remove
    removeIssue: (id) => instance().delete(`issues/${id}`).then(response => response.data).catch(error => error.response.data),

    //update issue item
    updateIssueItem: (issueId, item) => instance().put(`issues/item/${issueId}`, {item}).then(response => response.data).catch(error => error.response.data),

    //get issues
    getIssues: () => instance().get(`issues`).then(response => response.data).catch(error => error.response.data),
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// USER API
//////////////////////////////////////////////////////////////////////////////////////////////////

export const userAPI = {
    //login
    auth: (email, password, type) => {
        return (
            instance().post(`user/${type}`, {
                email: email,
                password: password,
            })
                .then(response => response.data)
                .catch(error => error.response.data)
        )
    },
    //check if user is logged
    isAuth: () => {
        return (
            instance().get(`user/check`).then(response => response.data).catch(error => error.response.data)
        )
    },
    //logout
    logout: () => {
        return (
            instance().delete(`user/logout`).then(response => response.data).catch(error => error.response.data)
        )
    },
    //log time
    logTime: (userID, issueID, payload) => {
        return (
            instance().put(`user/${userID}`, {
                issueID,
                payload
            }).then(response => response.data).catch(error => error.response.data)
        )
    },
    //get users
    getUsers: () => instance().get(`user/all`).then(response => response.data).catch(error => error.response.data),

    //get authorized user data
    getAuthorizedUserData: () => instance().get(`user`).then(response => response.data).catch(error => error.response.data),
}