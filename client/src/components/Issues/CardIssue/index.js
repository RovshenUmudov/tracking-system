import React from 'react';
import {Card} from "antd";
import {Link} from "react-router-dom";
import Meta from "antd/es/card/Meta";
import Text from "antd/es/typography/Text";
import {UserOutlined} from "@ant-design/icons";
import Avatar from "antd/es/avatar/avatar";
import './index.scss'

const CardIssue = ({subject, _id, priority, spentTime, estimatedTime, setCurrentIssueId, assignee}) => {

    const handleDragStart = (e, issueID) => {
        setCurrentIssueId(issueID)
    }

    const handleDrop = (e) => {
        e.preventDefault()
    }

    return (
        <Card
            hoverable
            extra={<Text type={"secondary"}>{`${spentTime} / ${estimatedTime} h`}</Text>}
            className={`card-issue ${priority}`}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, _id)}
            onDrop={(e) => handleDrop(e, _id)}
        >
            <Link to={`/issues/${_id}`} className={"main-link"} draggable={false}><span hidden>main link</span></Link>
            <Meta title={subject}/>
            {
                assignee &&
                <div className="user-data">
                    <Avatar size="small" icon={<UserOutlined/>}/>
                    <Link to={`/users/${assignee._id}`}
                          className={"user-name"}
                          draggable={false}
                    >
                        {assignee.email}
                    </Link>
                </div>
            }
        </Card>
    );
};

export default CardIssue;