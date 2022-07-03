import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router";
import IssueForm from "../../Forms/IssueForm";
import './index.scss'
import {createIssue_THK} from "../../../redux/ducks/Issues";

const NewIssue = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        dispatch(createIssue_THK(params.id, e))
        navigate(-1)
    }

    return (
        <section className={"section-new-issue"}>
            <IssueForm handleSubmit={handleSubmit} />
        </section>
    );
};

export default NewIssue;