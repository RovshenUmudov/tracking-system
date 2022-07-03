import {combineReducers} from "redux";
import projectsReducer from "./projects";
import singleProjectReducer from "./project";
import editProjectReducer from "./editProject";

const projects = combineReducers({
    projects: projectsReducer,
    singleProject: singleProjectReducer,
    editProject: editProjectReducer
})

export default projects