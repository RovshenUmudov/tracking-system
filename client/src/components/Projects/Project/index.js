import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "antd";
import {Link} from "react-router-dom";
import CardIssue from "../../Issues/CardIssue";
import {getSingleProject_THK, moveIssue_THK} from "../../../redux/ducks/projects/project";
import Preloader from "../../UI/Preloader";
import Error from "../../UI/Error";
import './index.scss'

const Project = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const {loading, error, data} = useSelector(state => state.projects.singleProject)
    const [currentIssueId, setCurrentIssueId] = useState(null)
    const projectId = params.id

    useEffect(() => {
        dispatch(getSingleProject_THK(projectId))
    }, [params])

    if (loading || !data) {
        return <Preloader/>
    }

    if (error) {
        return <Error error={error} />
    }

    const handleOnDrop = (e, boardId) => {
        e.preventDefault()
        dispatch(moveIssue_THK(currentIssueId, projectId, boardId))
        setCurrentIssueId(null)
    }

    const handleOnDragOver = (e) => {
        e.preventDefault();
    }

    return (
        <section className={"section-single-project"}>
            <div className="head-wrap">
                <div className={"title"}>{data?.project.title}</div>

                <div className="btn-wrap">
                    <Link to={"new-issue"}><Button type={"primary"}>Add new task</Button></Link>
                </div>
            </div>
            <div className="boards-wrap">
                {
                    data.project.boards.map(board => (
                        <div
                            className="board"
                            id={board.id} key={board.id}
                            onDrop={(e) => handleOnDrop(e, board.id)}
                            onDragOver={(e) => handleOnDragOver(e)}
                        >
                            <div className="board-header">{board.title}</div>
                            <div className="board-body">
                                {
                                    data.issues.map(el => (
                                        el.board === board.id &&
                                        <CardIssue
                                            key={el._id}
                                            setCurrentIssueId={setCurrentIssueId}
                                            {...el}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default Project;