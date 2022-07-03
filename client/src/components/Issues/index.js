import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getIssues_THK} from "../../redux/ducks/Issues";
import {Table} from "antd";
import Preloader from "../UI/Preloader";
import Error from "../UI/Error";
import {Link} from "react-router-dom";
import Text from "antd/es/typography/Text";
import moment from "moment";

const Issues = () => {

    const dispatch = useDispatch()
    const {data, loading, error} = useSelector(state => state.issues)

    useEffect(() => {
        dispatch(getIssues_THK())
    }, [])

    if (loading || !data || !Array.isArray(data)) {
        return <Preloader/>
    }

    if (error) {
        return <Error error={error}/>
    }

    const columns = [
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
            render: (el, {project}) => <Link to={`/projects/${project._id}`}>{project.title}</Link>,
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            render: (el, {_id, subject}) => <Link to={`${_id}`}>{subject}</Link>,
        },
        {
            title: 'Status',
            dataIndex: 'board',
            key: 'status',
            width: "5%",
            render: (el, {board}) => <Text>{board}</Text>,
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            width: "5%",
            render: (el, {priority}) => <Text>{priority}</Text>,
        },
        {
            title: 'Assignee',
            dataIndex: 'assignee',
            key: 'assignee',
            width: "15%",
            render: (el, {assignee}) => <Link to={`/users/${assignee._id}`}>{assignee.email}</Link>,
        },
        {
            title: 'Updated',
            dataIndex: 'updated',
            key: 'updated',
            width: "10%",
            render: (el, {updated}) => <Text>{moment(updated).format('YYYY/MM/DD')}</Text>,
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            width: "10%",
            render: (el, {startDate}) => <Text>{moment(startDate).format('YYYY/MM/DD')}</Text>,
        },
        {
            title: 'Estimated Time',
            dataIndex: 'estimatedTime',
            key: 'estimatedTime',
            width: "10%",
            render: (el, {estimatedTime}) => <Text>{estimatedTime}</Text>,
        },
        {
            title: 'Spent Time',
            dataIndex: 'spentTime',
            key: 'spentTime',
            width: "10%",
            render: (el, {spentTime}) => <Text>{spentTime}</Text>,
        },

    ];

    return (
        <section className={"section-issues"}>
            <Table columns={columns} dataSource={data} rowKey={row => row._id} pagination={{pageSize: 5}}/>
        </section>
    );
};

export default Issues;