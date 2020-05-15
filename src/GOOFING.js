import React from "react";
import { Nav, Navbar } from 'react-bootstrap'
//import './style.css';
//import logo from '../../assets/logo.png';

function LoginNav() {
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Login</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default LoginNav;