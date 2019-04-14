import React, { Component } from 'react';
import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    // console.log(this.props);
    const { projects, auth, notifications } = this.props;
    if(!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="dashboard container">
        <div className="row">
            <div className="col s12 m6">
                <ProjectList projects={projects}/>
            </div>
            <div className="col s12 m5 offset-m1">
                <Notifications notifications={notifications}/>
            </div>
        </div>
      </div>
    )
  }
}

//takes in state of the store
const mapStateToProps = (state) => {
  console.log(state)
  return {
    //creates property 'projects' on the props
    projects: state.firestore.ordered.projects,
    //creates authenticated data property on props
    auth: state.firebase.auth,
    //creates notifications props
    notifications: state.firestore.ordered.notifications
  }
}

//when this component is active, the collection I want to listen to is the "projects" collection stored in Firestore
export default compose(
  connect(mapStateToProps),
  //makes the firestore reducer sync with the firestore and update the state to reflect the change
  firestoreConnect([
    { collection: 'projects' },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
  ])
)(Dashboard);


// Create a Login component using firebase Phone authentication.
//   Ref: https://firebase.google.com/docs/auth/web/phone-auth

// create simple react app with two routes
// 1. Login - with phone number
