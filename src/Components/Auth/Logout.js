import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../../redux/authActionCreators";

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return (
            <div><Navigate to="/" replace /></div>
        )
    }
}

export default connect(null, mapDispatchToProps)(Logout);