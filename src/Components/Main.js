import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Header from "./Header/Header";
import Checkout from "./Orders/Checkout/Checkout";
import Orders from "./Orders/Orders";
import { connect } from "react-redux";
import { authCheck } from "../redux/authActionCreators";
import Logout from "./Auth/Logout";

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck())
    }
}

class Main extends Component {
    componentDidMount() {
        this.props.authCheck();
    }

    render() {
        let routes = null;
        if (this.props.token === null) {
            routes = (<Routes>
                <Route exact="true" path="/login" element={<Auth />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>);
        } else {
            routes = (<Routes>
                <Route exact="true" path="/orders" element={<Orders />} />
                <Route exact="true" path="/checkout" element={<Checkout />} />
                <Route exact="true" path="/" element={<BurgerBuilder />} />
                <Route exact="true" path="/logout" element={<Logout />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>);
        }
        return (
            <div>
                <Header />
                <div className="container">
                    {routes}
                </div>

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);