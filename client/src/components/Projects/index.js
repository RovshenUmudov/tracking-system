import React, {useEffect} from 'react';
import {Button, Table, Tag, Modal, Space} from "antd";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProject_THK, removeProject_THK} from "../../redux/ducks/projects/projects";
import Preloader from "../UI/Preloader";
import Error from "../UI/Error";
import './index.scss'

const Projects = () => {

    const {loading, error, data} = useSelector(state => state.projects.projects)
    const dispatch = useDispatch()
    const {confirm} = Modal;

    //fake fetch projects
    useEffect(() => {
        dispatch(fetchProject_THK())
    }, [])

    if (loading) {
        return <Preloader />
    }

    const showDeleteConfirm = (id, title) => {
        confirm({
            title: `Are you sure delete ${title}?`,
            content: "This process will be irreversible",
            onOk() {
                dispatch(removeProject_THK(id))
            },
        });
    }

    const columns = [
        {
            title: 'Project',
            dataIndex: 'title',
            key: 'title',
            render: (title, {_id}) => <Link to={`${_id}`}>{title}</Link>,
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            width: "20%",
            render: tags => tags && tags.map(tag => <Tag key={tag}>{tag.toUpperCase()}</Tag>),
        },
        {
            title: 'Actions',
            key: 'action',
            width: "10%",
            render: ({_id, title}) => (
                <Space>
                    <Button><Link to={`/projects/edit/${_id}`}>Edit</Link></Button>
                    <Button onClick={() => showDeleteConfirm(_id, title)}>Remove</Button>
                </Space>
            ),
        },
    ];

    return (
        <section className={"section-projects-list"}>
            <div className="btn-wrap">
                <Link to={"/projects/new-project"}><Button type={"primary"}>Add new project</Button></Link>
            </div>
            {
                error ? (
                    <Error error={error}/>
                ) : (
                    <Table columns={columns} dataSource={data} rowKey={row => row._id} pagination={{pageSize: 5}}/>
                )
            }
        </section>
    );
};

export default Projects;