import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Redirect } from "react-router";

import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';

import './LoginForm.css';

import { setSessionCookie, getSessionCookie } from "../model/Session";

import { getOwners } from '../services/Owner'

export class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            owners: [],
            selectedOwner: null
        };

        this.ownerSelection = this.ownerSelection.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const callbackResult = (result) => {
            this.setState({
                owners: result
            });
        }
        const callbackError = (error) => {
            this.setState({
                error
            });
        }
        getOwners(callbackResult, callbackError);
    }

    ownerSelection(event) {
        let value = parseInt(event.target.value);
        let selectedOwner = this.state.owners.find(owner => owner.ID === value);
        this.setState({
            selectedOwner: selectedOwner
        });
    }

    handleSubmit(event) {
        if (this.state.selectedOwner) {
            setSessionCookie(this.state.selectedOwner);
            window.location.href = "/rentreceiptform";
        }
        event.preventDefault();
    }

    render() {
        const { error, owners } = this.state;
        const session = getSessionCookie();
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (session) {
            return <Redirect to="/rentreceiptform" />
        } else {
            return (
                <Row className="bg-light">
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <FormLabel htmlFor="RentReceiptTenants" className="align-middle"> Choix du propriétaire : </FormLabel>
                                <FormControl id="RentReceiptTenants" as="select" size="sm" className="align-middle" onChange={this.ownerSelection} custom>
                                    <option key='blankChoice' hidden value />
                                    {owners.map(owner => (
                                        <option key={owner.ID} value={owner.ID}>
                                            {owner.firstname} {owner.lastname}
                                        </option>
                                    ))}
                                </FormControl>
                            </FormGroup>

                            <FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <Button variant="primary" type="submit">
                                            Selectionner
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Link to="/createowner">
                                            <Button variant="success">
                                                Créer compte propriétaire
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            );
        }
    }
}