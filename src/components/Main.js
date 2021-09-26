import React, { Component, useContext } from "react";

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Container, Row, Col, Navbar, NavbarBrand, Nav, FormControl } from 'react-bootstrap';

import { SessionContext, getSessionCookie, setSessionCookie } from "../model/Session";

import './Main.css';

import RentReceiptForm from "./RentReceiptForm/RentReceiptForm";

import { TenantAdmin } from './TenantAdmin'

const { REACT_APP_NAME, REACT_APP_VERSION } = process.env;

const ProtectedHandler = () => {
    const session = useContext(SessionContext);
    console.log(session);
    return (
        <div>
            <h6>Veuillez selectionner un propriétaire</h6>
        </div>
    );
};

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            owners: [],
            currentOwner: null
        };

        this.ownerSelection = this.ownerSelection.bind(this);
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_RENT_RECEIPT_API_URL + "/owners")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        owners: result
                    });
                },

                (error) => {
                    console.error(error);
                    this.setState({
                        error
                    });
                }
            )
    }

    ownerSelection(event) {
        let value = parseInt(event.target.value);
        // const receiptColumn = event.target.name;
        let selectedOwner = this.state.owners.find(owner => owner.ID === value);
        console.log(selectedOwner);
        this.setState({
            currentOwner: selectedOwner
        });
        setSessionCookie(selectedOwner);
    }

    render() {
        const { error, owners } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else {
            const session = getSessionCookie();
            return (
                <Container>
                    <header>
                        <Navbar className="navbar-light bg-light">
                            <NavbarBrand href="#">
                                <Row className="align-items-center">
                                    <Col sm={6}>
                                        <h3>Générateur de quittance de loyer</h3>
                                    </Col>
                                    <Col align="right">
                                        <Row>
                                            <Col sm={6}>
                                                <label htmlFor="RentReceiptTenants" className="align-middle"> Choix du propriétaire : </label>
                                            </Col>
                                            {/*  */}
                                            <Col sm={6}>
                                                <FormControl id="RentReceiptTenants" as="select" size="sm" className="align-middle" onChange={this.ownerSelection} custom>
                                                    <option key='blankChoice' hidden value />
                                                    {owners.map(owner => (
                                                        <option key={owner.ID} value={owner.ID}>
                                                            {owner.firstname} {owner.lastname}
                                                        </option>
                                                    ))}
                                                </FormControl>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
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
                    <SessionContext.Provider value={session}>
                        <BrowserRouter>
                            <Switch>
                                <Route path="/tenantadmin" component={TenantAdmin} />
                                <Route path="*" component={RentReceiptForm} />
                                {/* <Route path="*" component={ProtectedHandler} /> */}
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
}

export default Main;