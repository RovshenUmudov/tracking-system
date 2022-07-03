import React from 'react';
import {Spin} from "antd";
import './index.scss'

const Preloader = () => {
    return <Spin className={"loading-spin"} size={"large"}/>
};

export default Preloader;