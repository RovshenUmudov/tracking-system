import React from 'react';
import './index.scss'
import {useDispatch, useSelector} from "react-redux";
import MainLogo from "../../MainLogo";
import {Alert, Button, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {auth_THK} from "../../../redux/ducks/account/authReducer";
import {Link} from "react-router-dom";

const LoginForm = () => {

    const dispatch = useDispatch()
    const authError = useSelector(state => state.account.authError)

    const handleSubmit = ({email, password}) => {
        dispatch(auth_THK({email, password, type: "login"}))
    }

    return (
        <section className={"section-login-form"}>
            <MainLogo />
            {
                authError && <Alert message={authError} type="error"/>
            }
            <Form
                name="login-form"
                autoComplete="off"
                size={"middle"}
                onFinish={(e) => handleSubmit(e)}
            >
                <Form.Item
                    name={"email"}
                    validateTrigger={["onBlur", "onChange"]}
                    rules={[
                        {type: "email", message: "Add valid email"},
                        {required: true, message: "This field is required"}
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                           placeholder={"Email *"}
                           type="email"
                    />
                </Form.Item>

                <Form.Item
                    name={"password"}
                    validateTrigger={["onBlur", "onChange"]}
                    rules={[
                        {required: true, message: "This field is required"},
                    ]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
                                    placeholder={"Password *"}
                    />
                </Form.Item>

                <Button type="primary" htmlType="submit">Login</Button>
            </Form>

            <div className="register-new-account">
                New to Triare Work?  <Link to={"/register"}>Create an account</Link>
            </div>

        </section>
    )
};

export default LoginForm;