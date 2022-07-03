import React from 'react';
import {Divider, Table} from "antd";
import {Link} from "react-router-dom";
import Text from "antd/es/typography/Text";
import "./index.scss"

const AssigneeIssues = ({assigneeIssues}) => {

    const columns = [
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
            width: "10%",
            render: (el, {project}) => <Link to={`/projects/${project._id}`}>{project.title}</Link>,
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            width: "20%",
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
    ];

    return (
        <section className={"section-assignee-issues"}>
            <Divider orientation="left">{`Issues assigned to me: ${assigneeIssues.length}`}</Divider>
            <Table columns={columns} dataSource={assigneeIssues} rowKey={row => row._id} pagination={{pageSize: 5}}/>
        </section>
    );
};

export default AssigneeIssues;