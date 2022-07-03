import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, Select} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import moment from "moment"
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers_THK} from "../../../redux/ducks/users";
import "./index.scss"

const IssueForm = ({handleSubmit, formRef, initialValues}) => {

    const dispatch = useDispatch()
    const [editorContent, setEditorContent] = useState(initialValues?.description)
    const [itemsEditor, setItemsEditor] = useState(initialValues?.items ? initialValues.items : [])
    const users = useSelector(state => state.users.data)

    useEffect(() => {
        dispatch(fetchUsers_THK())
    }, [])

    const validateMessages = {
        required: 'This field is required!',
    }

    const handleSubmitData = (e) => {
        e.items = itemsEditor
        e.description = editorContent
        handleSubmit(e)
    }

    const editorConfiguration = {
        toolbar: ['bold', 'italic', 'link', 'numberedList', 'bulletedList']
    };

    return (
        <Form
            ref={formRef}
            validateMessages={validateMessages}
            name="issue-form"
            autoComplete="off"
            size={"middle"}
            onFinish={(e) => handleSubmitData(e)}
            labelAlign={"left"}
            labelCol={{span: 4}}
            initialValues={{
                subject: initialValues?.subject,
                startDate: initialValues?.startDate ? moment(initialValues.startDate) : moment(),
                items: itemsEditor.map((el, index) => index),
                board: initialValues?.board || "Backlog",
                priority: initialValues?.priority || "Normal",
                assignee: initialValues?.assignee && initialValues?.assignee.email,
                estimatedTime: initialValues?.estimatedTime || "00:00"
            }}
        >
            <Form.Item
                label={"Subject"}
                name={"subject"}
                validateTrigger={["onBlur", "onChange"]}
                rules={[{required: true}]}
            >
                <Input placeholder={"Subject"}/>
            </Form.Item>

            <Form.Item label={"Description"} name={"description"}>
                <CKEditor
                    data={editorContent}
                    editor={ClassicEditor}
                    config={editorConfiguration}
                    onChange={(event, editor) => {
                        if (editor.getData() !== editorContent) {
                            setEditorContent(editor.getData());
                        }
                    }}
                />
            </Form.Item>

            <Form.Item name={"startDate"} label={"Start date"}>
                <DatePicker format={'YYYY/MM/DD'}/>
            </Form.Item>

            <Form.Item name={"estimatedTime"} label={"Estimated Time"}>
                <Input/>
            </Form.Item>

            <Form.List name="items">
                {
                    (fields, {add, remove}) =>
                        <>
                            {
                                fields.length > 0 &&
                                <Form.Item label={"item"}>
                                    {
                                        fields.map(field => (
                                                <div
                                                    className={`fields-row ${field.name === fields.length - 1 && '-last'}`}
                                                    key={field.name}
                                                >
                                                    <Form.Item name={field.name}>
                                                        <CKEditor
                                                            data={itemsEditor[field.name].message}
                                                            editor={ClassicEditor}
                                                            config={editorConfiguration}
                                                            onChange={(event, editor) => {
                                                                if (editor.getData() !== itemsEditor[field.name].message) {
                                                                    let tempItems = [...itemsEditor]
                                                                    tempItems[field.name].message = editor.getData()
                                                                    setItemsEditor(tempItems)
                                                                }
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    <MinusCircleOutlined
                                                        onClick={() => {
                                                            setItemsEditor(itemsEditor.slice(0, fields.length - 1))
                                                            remove(field.name)
                                                        }}
                                                    />
                                                </div>
                                            )
                                        )
                                    }
                                </Form.Item>
                            }

                            <Form.Item label={"Checklist"}>
                                <Button
                                    onClick={() => {
                                        setItemsEditor([...itemsEditor, {completed: false, message: null}])
                                        add()
                                    }}
                                    type={"dashed"}
                                    icon={<PlusOutlined/>}
                                    block
                                >
                                    Add Field
                                </Button>
                            </Form.Item>
                        </>
                }
            </Form.List>

            <Form.Item
                name={"board"}
                validateTrigger={"onChange"}
                label={"Status"}
                rules={[{required: true}]}
            >
                <Select>
                    <Select.Option value={"Backlog"}>Backlog</Select.Option>
                    <Select.Option value={"To Do"}>To Do</Select.Option>
                    <Select.Option value={"In progress"}>In progress</Select.Option>
                    <Select.Option value={"Reopened"}>Reopened</Select.Option>
                    <Select.Option value={"To test"}>To test</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name={"priority"}
                validateTrigger={"onChange"}
                label={"Priority"}
                rules={[{required: true}]}
            >
                <Select>
                    <Select.Option value={"Low"}>Low</Select.Option>
                    <Select.Option value={"Normal"}>Normal</Select.Option>
                    <Select.Option value={"High"}>High</Select.Option>
                </Select>
            </Form.Item>

            {
                users &&
                <Form.Item
                    name={"assignee"}
                    validateTrigger={"onChange"}
                    label={"Assignee"}
                >
                    <Select>
                        {
                            users.map(el => (
                                <Select.Option value={el.email} key={el._id}>{el.email}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            }

            {
                !formRef && <Button type={"primary"} htmlType={"submit"}>Create</Button>
            }
        </Form>
    );
};

export default IssueForm;