import React from 'react';
import './index.scss'
import {Button, Form, Input} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

const ProjectForm = ({handleSubmit, submitText, initialValues}) => {

    const validateMessages = {
        required: 'This field is required!',
    };

    return (
        <Form
            validateMessages={validateMessages}
            name="new-task-form"
            autoComplete="off"
            size={"middle"}
            onFinish={(e) => handleSubmit(e)}
            labelAlign={"left"}
            labelCol={{span: 5}}
            initialValues={initialValues && {
                project: initialValues.title,
                tags: initialValues.tags
            }}
        >
            <Form.Item
                label={"Project Name"}
                name={"project"}
                validateTrigger={["onBlur", "onChange"]}
                rules={[{required: true}]}
            >
                <Input placeholder={"Project Name"}/>
            </Form.Item>

            <Form.List name="tags">
                {
                    (fields, {add, remove}) =>
                        <>
                            {
                                fields.length > 0 &&
                                <Form.Item label={"tag"}>
                                    {
                                        fields.map(field => (
                                            <div
                                                className={`fields-row ${field.name === fields.length - 1 && '-last'}`}
                                                key={field.name}
                                            >
                                                <Form.Item name={field.name}>
                                                    <Input placeholder={"Tag"}/>
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(field.name)}/>
                                            </div>
                                        ))
                                    }
                                </Form.Item>
                            }

                            <Form.Item label={"Tags"}>
                                <Button
                                    onClick={() => add()}
                                    type={"dashed"}
                                    icon={<PlusOutlined/>}
                                    block
                                >
                                    Add Tag
                                </Button>
                            </Form.Item>
                        </>
                }
            </Form.List>

            <Button type={"primary"} htmlType={"submit"}>{submitText}</Button>
        </Form>
    );
};

export default ProjectForm;