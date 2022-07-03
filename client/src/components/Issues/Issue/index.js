import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {
    clearIssues_AC,
    getIssue_THK,
    logTime_THK,
    removeIssue_THK,
    updateIssue_THK,
    updateIssueItem_THK
} from "../../../redux/ducks/Issues";
import {Alert, Button, Checkbox, List, Space} from "antd";
import IssueForm from "../../Forms/IssueForm";
import Modal from "antd/es/modal/Modal";
import moment from "moment";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import SpentTimeForm from "../../Forms/SpentTimeForm";
import Preloader from "../../UI/Preloader";
import Error from "../../UI/Error";
import './index.scss'

const Issue = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {data, loading, error} = useSelector(state => state.issues)
    const {alert} = useSelector(state => state.alert)
    const [isModalVisible, setModalVisible] = useState({
        editModal: false,
        logTimeModal: false
    })
    const formRef = useRef()
    const logTimeFormRef = useRef()
    const now = moment()

    useEffect(() => {
        dispatch(getIssue_THK(params.id))
    }, [])

    if (loading || !data || Array.isArray(data)) {
        return <Preloader/>
    }

    if (error) {
        return <Error error={error} />
    }

    const handleSubmit = (formData) => {
        dispatch(updateIssue_THK(params.id, formData))
        toggleEditModalVisibility()
        navigate(-1)
    }

    const handleRemove = () => {
        dispatch(removeIssue_THK(params.id))
        navigate(-1)
    }

    const toggleEditModalVisibility = () => {
        setModalVisible({
            ...isModalVisible,
            editModal: !isModalVisible.editModal,
        })
    }

    const toggleLogTimeModalVisibility = () => {
        setModalVisible({
            ...isModalVisible,
            logTimeModal: !isModalVisible.logTimeModal,
        })
    }

    const handleLogTimeSubmit = (e) => {
        dispatch(logTime_THK(params.id, e))
        toggleLogTimeModalVisibility()
    }

    const handleItemUpdate = (item) => {
        dispatch(updateIssueItem_THK(params.id, item))
    }

    return (
        <>
            {
                alert && <Alert message={alert} type="success"/>
            }
            {
                isModalVisible.editModal &&
                <Modal
                    visible={isModalVisible.editModal}
                    onOk={() => formRef.current && formRef.current.submit()}
                    onCancel={toggleEditModalVisibility}
                    width={1100}
                >
                    <IssueForm handleSubmit={handleSubmit} formRef={formRef} initialValues={data}/>
                </Modal>
            }
            {
                isModalVisible.logTimeModal &&
                <Modal
                    visible={isModalVisible.logTimeModal}
                    onOk={() => logTimeFormRef.current && logTimeFormRef.current.submit()}
                    onCancel={toggleLogTimeModalVisibility}
                    width={1100}
                >
                    <SpentTimeForm handleLogTimeSubmit={handleLogTimeSubmit} logTimeFormRef={logTimeFormRef}/>
                </Modal>
            }
            <section className={"section-issue"}>
                <div className="issue-info">
                    <div className="btn-wrap">
                        <Space>
                            <Button onClick={toggleLogTimeModalVisibility} type={"primary"}>Log Time</Button>
                            <Button onClick={toggleEditModalVisibility}>Edit</Button>
                            <Button onClick={handleRemove}>Remove</Button>
                        </Space>
                    </div>
                    <div className="issue-data">
                        <Text italic={true} type="secondary">
                            <Space>
                                <span>Created:</span>
                                {
                                    now.diff(data.startDate, "days") > 0 ? `${now.diff(data.startDate, "days")} days ago.` : moment(data.startDate).format('YYYY-MM-DD')
                                }
                                {
                                    moment(data.updated).diff(data.startDate, "days") > 0 &&
                                    <span>Updated: {moment(data.updated).format('YYYY-MM-DD')}</span>
                                }
                            </Space>
                        </Text>
                        <Text italic={true} type="secondary">
                            {`Start Date: ${moment(data.startDate).format('YYYY-MM-DD')}`}
                        </Text>
                        <Text italic={true} type="secondary">
                            {`Estimated Time: ${data.estimatedTime} h`}
                        </Text>
                        <Text italic={true} type="secondary">
                            {`Spent Time: ${data.spentTime} h`}
                        </Text>
                    </div>
                </div>

                <div className="issue-content">
                    <div className="head">
                        <div className="title-wrap">
                            <Title level={3} className={"title"}>{data.subject}</Title>
                        </div>
                    </div>
                    <Paragraph className={"description"}>
                        <div dangerouslySetInnerHTML={{__html: data.description}}/>
                    </Paragraph>
                    {
                        data.items.length > 0 &&
                        <List
                            bordered
                            dataSource={data.items}
                            header={"Checklist"}
                            renderItem={item =>
                                item.message &&
                                    <List.Item>
                                        <Checkbox onChange={() => handleItemUpdate(item)} checked={item.completed}>
                                            <div dangerouslySetInnerHTML={{__html: item.message}}/>
                                        </Checkbox>
                                    </List.Item>
                            }
                        />
                    }

                </div>

            </section>
        </>
    );
};

export default Issue;