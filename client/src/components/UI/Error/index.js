import React from 'react';
import {Empty} from "antd";

const Error = ({error}) => {
    return (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={error}/>
    );
};

export default Error;