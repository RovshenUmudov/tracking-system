import React from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../HOC/withAuth";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import LoginForm from "../../components/Forms/LoginForm";
import './index.scss'

export const LoginPage = () => {

    const isAuth = useSelector(state => state.account.isAuth)

    return (
        isAuth ? <Navigate to={"/profile"} /> : <LoginForm/>
    );
};

export default compose(withAuthRedirect)(LoginPage);