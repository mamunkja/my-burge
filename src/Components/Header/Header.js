import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, NavbarBrand } from 'reactstrap';
import './Header.css';
import Logo from '../../assets/logo.png';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const Header = props => {
    let links = null;
    if (props.token === null) {
        links = (<NavItem className="mr-md-5">
            <NavLink to="/login" className="NavLink">Login</NavLink>
        </NavItem>);
    } else {
        links = (<NavItem className="mr-md-5">
            <NavLink to="/" className="NavLink">Burger Builder</NavLink>
            <NavLink to="/orders" className="NavLink">Orders</NavLink>
            <NavLink to="/logout" className="NavLink">Logout</NavLink>
        </NavItem>);
    }
    return (
        <div className="Navigation">
            <Navbar style={{ backgroundColor: "#D70F64", height: "70px" }}>
                <NavbarBrand href="#" className="mr-auto ml-md-5 Brand">
                    <img src={Logo} alt="Logo" width="80px" />
                </NavbarBrand>
                <Nav>
                    {links}
                </Nav>
            </Navbar>
        </div>
    )
}

export default connect(mapStateToProps, null)(Header);