import React from 'react';
import './index.scss'
import MainLogo from "../MainLogo";
import {Layout} from "antd";
import User from "./User";

const Header = ({theme}) => {

    const {Header} = Layout;

    return (
        <Header className={"header"} data-theme={theme}>
            <MainLogo />
            <User />
        </Header>
    );
};

export default Header;