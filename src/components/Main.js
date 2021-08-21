import React, { Component } from "react";


import { Container, Row, Col, Navbar, NavbarBrand } from 'react-bootstrap';

import RentReceiptForm from "./RentReceiptForm/RentReceiptForm";


class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <header>
                    <Navbar className="row navbar-light bg-light">
                        <NavbarBrand href="#">
                            <h3>Générateur de quittance de loyer</h3>
                        </NavbarBrand>
                    </Navbar>
                </header>
                <RentReceiptForm />
                <footer>
                    <Row className="bg-light">
                        <Col>jeremy.beaucousin@gmal.com</Col>
                        <Col align="right">{process.env.REACT_APP_NAME} <b>V{process.env.REACT_APP_VERSION}</b></Col>
                    </Row>
                </footer>
            </Container >
        );
    }
}

export default Main;