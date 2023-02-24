import React, { Component } from "react";
import { Formik } from 'formik';
import { auth } from "../../redux/authActionCreators";
import './Auth.css';
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { Alert } from "reactstrap";

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg
    }
}

class Auth extends Component {
    state = {
        mode: "Sign Up"
    }

    switchModeHandler = () => {
        if (this.state.mode === "Sign Up") {
            this.setState({
                mode: "Login"
            })
        } else {
            this.setState({
                mode: "Sign Up"
            })
        }

    }

    render() {
        let error = null;
        if (this.props.authFailedMsg !== null) {
            error = <Alert color="danger">{this.props.authFailedMsg}</Alert>;
        }

        let form = "";
        if (this.props.authLoading) {
            form = <Spinner />;
        } else {
            form = (<Formik
                initialValues={
                    {
                        email: "",
                        password: "",
                        confirmPassword: ""
                    }
                }
                onSubmit={
                    (values) => {
                        this.props.auth(values.email, values.password, this.state.mode);
                    }
                }

                validate={(values) => {
                    const errors = {};
                    //validate email value
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email';
                    }

                    //validate password
                    if (!values.password) {
                        errors.password = 'Required';
                    } else if (values.password.length < 4) {
                        errors.password = 'Password Must be 4 digits long!';
                    }

                    //validate confirm password
                    if (this.state.mode === "Sign Up") {
                        if (!values.confirmPassword) {
                            errors.confirmPassword = 'Required';
                        } else if (values.confirmPassword !== values.password) {
                            errors.confirmPassword = 'Password and Confirm password should be same!';
                        }
                    }

                    return errors;
                }}
            >
                {({ values, handleChange, handleSubmit, errors }) => (
                    <div className="LoginAuth">
                        <button className="switch btn btn-lg"
                            onClick={this.switchModeHandler}>Switch to {this.state.mode === 'Sign Up' ? "Login" : "Sign Up"} </button>
                        <form onSubmit={handleSubmit}>
                            <input name="email" placeholder="Enter your email"
                                className="form-control" value={values.email}
                                onChange={handleChange} />
                            <span>{errors.email}</span>
                            <br />
                            <input name="password" placeholder="Enter your password"
                                className="form-control" value={values.password}
                                onChange={handleChange} />
                            <span>{errors.password}</span>
                            <br />
                            {this.state.mode === "Sign Up" ? (<div>
                                <input name="confirmPassword" placeholder="Enter confirm your password"
                                    className="form-control" value={values.confirmPassword}
                                    onChange={handleChange} />
                                <span>{errors.confirmPassword}</span>
                                <br />
                            </div>) : null}
                            <button type="submit" className="btn btn-success">{this.state.mode === 'Sign Up' ? "Sign Up" : "Login"} </button>
                        </form>
                    </div>
                )}
            </Formik>);
        }
        return (
            <div>
                {error}
                {form}
            </div >
        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);