import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Container, Row, Col, Navbar, NavbarBrand, Nav } from 'react-bootstrap';

import RentReceiptForm from "./RentReceiptForm/RentReceiptForm";

import { TenantAdmin } from './TenantAdmin'


class Main extends Component {
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
                <Row className="p-2 border">
                    {/* variant="pills" */}
                    <Nav defaultActiveKey="/">
                        <Nav.Item>
                            <Nav.Link href="/">Générateur</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="tenantadmin" eventKey="tenantadmin">Administration</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>
                <BrowserRouter>
                    <Switch>
                        <Route path="/tenantadmin" component={TenantAdmin} />
                        <Route path="/" component={RentReceiptForm} />
                    </Switch>
                </BrowserRouter>
                <footer>
                    <Row className="bg-light">
                        <Col>jeremy.beaucousin@gmail.com</Col>
                        <Col align="right">{process.env.REACT_APP_NAME} <b>V{process.env.REACT_APP_VERSION}</b></Col>
                    </Row>
                </footer>
            </Container >
        );
    }
}

export default Main;