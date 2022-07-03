import React, {useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import {Layout, Spin} from "antd";
import 'antd/dist/antd.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import styles from './styles/general.module.scss'
import MainPage from "./pages/MainPage";
import {LoginPage} from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import {useDispatch, useSelector} from "react-redux";
import {initialize_THK} from "./redux/ducks/initializeReducer";
import Sidebar from "./components/Sidebar";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import Project from "./components/Projects/Project";
import NewProject from "./components/Projects/NewProject";
import {RegisterPage} from "./pages/RegisterPage";
import EditProject from "./components/Projects/EditProject";
import NewIssue from "./components/Issues/NewIssue";
import IssuesPage from "./pages/IssuesPage";
import Issue from "./components/Issues/Issue";
import './App.scss';

const App = () => {

    const {Content} = Layout;
    const dispatch = useDispatch()
    const initialize = useSelector(state => state.initApp.initialize)
    const isAuth = useSelector(state => state.account.isAuth)

    useEffect(() => {
        dispatch(initialize_THK())
    }, [])

    return (
        <Layout className={"root"}>
            <Header theme={"white"}/>
            <Content className={"main"}>
                <Layout className={[styles.whiteBg, styles.siteLayout].join(" ")}>
                    {
                        !initialize ? <Spin className={"loading-spin"} size={"large"}/> : (
                            <>
                                {isAuth && <Sidebar/>}
                                <Content className={[styles.whiteBg, styles.contentWrap].join(" ")}>
                                    <Routes>
                                        <Route path='/' element={<MainPage/>}/>
                                        <Route path='/login' element={<LoginPage/>}/>
                                        <Route path='/register' element={<RegisterPage/>}/>
                                        <Route path='/profile' element={<ProfilePage/>}/>
                                        <Route path='/projects' element={<ProjectsPage/>}>
                                            <Route path=":id" element={<Project/>}/>
                                            <Route path=":id/new-issue" element={<NewIssue/>}/>
                                            <Route path="/projects/edit/:id" element={<EditProject/>}/>
                                        </Route>
                                        <Route path="/projects/new-project" element={<NewProject/>}/>
                                        <Route path="/issues" element={<IssuesPage/>}>
                                            <Route path=":id" element={<Issue/>}/>
                                        </Route>
                                    </Routes>
                                </Content>
                            </>
                        )
                    }
                </Layout>
            </Content>
            <Footer/>
        </Layout>
    );
};

export default App;
