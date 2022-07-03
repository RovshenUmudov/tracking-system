import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";
import initializeReducer from "./ducks/initializeReducer";
import authReducer from "./ducks/account/authReducer";
import index from "./ducks/users";
import projects from "./ducks/projects";
import issuesReducer from "./ducks/Issues";
import alertReducer from "./ducks/Alert";

let reducers = combineReducers({
    initApp: initializeReducer,
    account: authReducer,
    projects: projects,
    users: index,
    issues: issuesReducer,
    alert: alertReducer
})

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store;