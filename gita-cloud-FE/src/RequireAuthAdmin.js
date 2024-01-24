import React, { Component } from 'react';

export default function withAuthAdmin(ComposedComponent) {
  class RequireAuthAdmin extends Component {
    state = {
      authToken: localStorage.getItem('token'),
      // authRole: localStorage.getItem('authRole'),
    }

    // Push to login route if not authenticated on mount
    componentWillMount() {
      if (!this.state.authToken) {
        this.props.history.push('/login');
        // Use your router to redirect them to the login page
      }
    }

    // Push to login route if not authenticated on update
    componentWillUpdate(nextProps) {
      if (!this.state.authToken) {
        this.props.history.push('/login');
        // Use your router to redirect them to the login page
      }
    }

    // Otherwise, render the original component
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return RequireAuthAdmin;
}
