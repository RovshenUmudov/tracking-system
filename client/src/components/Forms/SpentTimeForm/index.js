import React from 'react';
import moment from "moment";
import {DatePicker, Form, Input} from "antd";
import './index.scss'

const SpentTimeForm = ({logTimeFormRef, handleLogTimeSubmit}) => {

    const validateMessages = {
        required: 'This field is required!',
    }

    return (
        <Form
            ref={logTimeFormRef}
            validateMessages={validateMessages}
            name="spent-tile-form"
            autoComplete="off"
            size={"middle"}
            onFinish={(e) => handleLogTimeSubmit(e)}
            labelAlign={"left"}
            labelCol={{span: 4}}
            initialValues={{
                date: moment()
            }}
        >
            <Form.Item
                label={"Date"}
                name={"date"}
                validateTrigger={["onBlur", "onChange"]}
                rules={[{required: true}]}
            >
                <DatePicker format={'YYYY/MM/DD'}/>
            </Form.Item>

            <Form.Item label={"Hours"} name={"hours"} rules={[{required: true}]}>
                <Input type={"number"} placeholder={"Spent time"} />
            </Form.Item>

            <Form.Item label={"Comment"} name={"comment"} rules={[{required: true}]}>
                <Input placeholder={"Comment"} />
            </Form.Item>
        </Form>
    );
};

export default SpentTimeForm;