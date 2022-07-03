import React from 'react';
import {useParams} from "react-router";
import {Outlet} from "react-router-dom";
import Issues from "../../components/Issues";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOC/withAuth";

const IssuesPage = () => {
    const params = useParams()

    return (
        <>
            {!params.id ? <Issues/> : <Outlet/>}
        </>
    );
};

export default compose(withAuthRedirect)(IssuesPage)