import React from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../HOC/withAuth";
import Projects from "../../components/Projects";
import {Outlet} from "react-router-dom";
import {useParams} from "react-router";

const ProjectsPage = () => {

    const params = useParams()

    return (
        <>
            {!params.id ? <Projects/> : <Outlet/>}
        </>
    );
};

export default compose(withAuthRedirect)(ProjectsPage)