import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import ProjectForm from "../../Forms/ProjectForm";
import {editProject_THK, updateProject_THK} from "../../../redux/ducks/projects/editProject";
import Preloader from "../../UI/Preloader";
import './index.scss'

const EditProject = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const project = useSelector(state => state.projects.editProject.project)

    useEffect(() => {
        dispatch(editProject_THK(id))
    }, [])

    if (!project) {
        return <Preloader />
    }

    const handleSubmit = (e) => {
        dispatch(updateProject_THK(id, e))
        navigate(-1)
    }

    return (
        <section className={"section-edit-project"}>
            <ProjectForm
                initialValues={{
                    title: project.title,
                    tags: project.tags
                }}
                submitText={"Update"}
                handleSubmit={handleSubmit}
            />
        </section>
    );
};

export default EditProject;