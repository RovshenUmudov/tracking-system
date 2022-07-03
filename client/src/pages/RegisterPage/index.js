import React from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../HOC/withAuth";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import RegisterForm from "../../components/Forms/RegisterForm";
import './index.scss'

export const RegisterPage = () => {

    const isAuth = useSelector(state => state.account.isAuth)

    return (
        isAuth ? <Navigate to={"/profile"} /> : <RegisterForm/>
    );
};

export default compose(withAuthRedirect)(RegisterPage);