import React from 'react';
import {UserOutlined} from "@ant-design/icons";
import {Avatar, Dropdown, Menu} from "antd";
import './index.scss'
import {useDispatch, useSelector} from "react-redux";
import {logout_THK} from "../../../redux/ducks/account/authReducer";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router";

const User = () => {

    const isAuth = useSelector(state => state.account.isAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let menu

    const handleLogout = () => {
        dispatch(logout_THK())
        navigate("/")
    }

    if (!isAuth) {
        menu = (
            <Menu>
                <Menu.Item key="1">
                    <NavLink to={"/login"}>Sign In</NavLink>
                </Menu.Item>
            </Menu>
        )
    } else {
        menu = (
            <Menu>
                <Menu.Item key="1">
                    <NavLink to={"/profile"}>Profile</NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink to={"/projects"}>Projects</NavLink>
                </Menu.Item>
                <Menu.Item key="3" onClick={handleLogout}>Sign Out</Menu.Item>
            </Menu>
        )
    }

    return (
        <div className="user-data-wrap">
            <Dropdown overlay={menu} trigger={['click']} placement={"bottomCenter"}>
                <Avatar size="large" icon={<UserOutlined/>} className={"avatar"}/>
            </Dropdown>
        </div>
    );
};

export default User;