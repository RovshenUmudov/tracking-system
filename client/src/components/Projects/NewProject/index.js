import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import ProjectForm from "../../Forms/ProjectForm";
import {createProject_THK} from "../../../redux/ducks/projects/projects";
import './index.scss'

const NewProject = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        dispatch(createProject_THK(e))
        navigate(-1)
    }

    return (
        <section className={"section-new-project"}>
            <ProjectForm
                handleSubmit={handleSubmit}
                submitText={"Create"}
            />
        </section>
    );
};

export default NewProject;