import React, {Component} from 'react';
import {Navigate} from "react-router";
import {connect} from "react-redux";

let mapStateToProps = (state) => ({
    isAuth: state.account.isAuth
})

export const withAuthRedirect = ( Component ) => {

    class RedirectComponent extends React.Component {

        render() {
            return (
                !this.props.isAuth ? (
                    <Navigate to={"/login"} />
                ) : (
                    <Component {...this.props} />
                )
            )
        }
    }

    return connect(mapStateToProps, null)(RedirectComponent)

}