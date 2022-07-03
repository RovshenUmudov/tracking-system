import React, {useEffect} from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../HOC/withAuth";
import AssigneeIssues from "../../components/AssigneeIssues";
import {useDispatch, useSelector} from "react-redux";
import {getUserData_THK} from "../../redux/ducks/account/authReducer";
import Preloader from "../../components/UI/Preloader";
import Error from "../../components/UI/Error";

const ProfilePage = () => {

    const dispatch = useDispatch()
    const {assigneeIssues} = useSelector(state => state.account.userData)
    const {loading, error} = useSelector(state => state.account)

    useEffect(() => {
        dispatch(getUserData_THK())
    }, [])

    if (loading) {
        return <Preloader/>
    }

    if (error) {
        return <Error error={error}/>
    }

    return (
        <section>
            {
                assigneeIssues && <AssigneeIssues assigneeIssues={assigneeIssues}/>
            }
        </section>
    );
};

export default compose(withAuthRedirect)(ProfilePage);