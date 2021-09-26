import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Button, Form, Container, Row, Col, Navbar, NavbarBrand, Nav, FormControl, InputGroup } from 'react-bootstrap';

import { SessionContext, getSessionCookie, clearSession } from "../model/Session";

import './Main.css';

import { RentReceiptForm } from "./RentReceiptForm/RentReceiptForm";
import { OwnerAdmin } from './OwnerAdmin'
import { LoginForm } from './LoginForm'
import AuthRoute from "../model/AuthRoute";

const { REACT_APP_NAME, REACT_APP_VERSION } = process.env;
class Main extends Component {
    handleLogout() {
        clearSession();
    }

    render() {
        const session = getSessionCookie();
        return (
            <Container>
                <SessionContext.Provider value={session}>
                    <Row className="navbar-light bg-light">
                        <Col sm={12}>
                            <Navbar>
                                <NavbarBrand href="#">
                                    <Row className="align-items-center">
                                        <Col sm={7}>
                                            <h3>Générateur de quittance de loyer</h3>
                                        </Col>
                                        {session &&
                                            <Col sm={5} align="right">
                                                <Form inline="true" onSubmit={this.handleLogout}>
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text>Propriétaire</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <FormControl id="inlineFormCurrentOwner" placeholder="Propriétaire" value={`${session.firstname} ${session.lastname}`} disabled />
                                                        <Button variant="primary" type="submit">
                                                            Deconnecter
                                                    </Button>
                                                    </InputGroup>
                                                </Form>
                                            </Col>
                                        }
                                    </Row>
                                </NavbarBrand>
                            </Navbar>
                        </Col>
                    </Row>
                    <Row className="p-2 border">
                        {/* variant="pills" */}
                        <Nav defaultActiveKey="/">
                            <Nav.Item>
                                <Nav.Link href="/rentreceiptform">Générateur</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="owneradmin" eventKey="owneradmin">Administration</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Row>

                    <BrowserRouter>
                        <Switch>
                            <AuthRoute path="/rentreceiptform" component={RentReceiptForm} />
                            <AuthRoute path="/owneradmin" component={OwnerAdmin} />
                            <Route path="*" component={LoginForm} />
                        </Switch>
                    </BrowserRouter>
                </SessionContext.Provider>

                <footer>
                    <Row className="bg-light">
                        <Col>jeremy.beaucousin@gmail.com</Col>
                        <Col align="right">{REACT_APP_NAME} <b>V{REACT_APP_VERSION}</b></Col>
                    </Row>
                </footer>
            </Container >
        );
    }
}

export default Main;