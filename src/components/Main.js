import React, { Component } from "react";

import { Container, Navbar, NavbarBrand, Jumbotron } from 'react-bootstrap';

import RentReceiptForm from "./RentReceiptForm";

class Main extends Component {
    render() {
        return (
            <Container>
                <Navbar className="navbar-light bg-light">
                    <NavbarBrand href="#">
                        <h3>Générateur de quittance de loyer</h3>
                    </NavbarBrand>
                </Navbar>

                <Jumbotron className="content">
                    <RentReceiptForm />
                </Jumbotron>
            </Container>
        );
    }
}

export default Main;