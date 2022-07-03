import React from 'react';
import './index.scss'
import {NavLink} from "react-router-dom";

const MainLogo = () => {
    return (
        <div className={"main-logo-wrap"}>
            <NavLink to={"/"}>
                <div className="main-logo">
                    <span>TRIARE WORK</span>
                </div>
            </NavLink>
        </div>
    );
};

export default MainLogo;