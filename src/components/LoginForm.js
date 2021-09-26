import React, { Component } from "react";

import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';

import './LoginForm.css';

import { setSessionCookie } from "../model/Session";

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
        if (error) {
            return <div>Error: {error.message}</div>;
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

                            <Button variant="primary" type="submit">
                                Selectionner
                            </Button>
                        </Form>
                    </Col>
                </Row>
            );
        }
    }
}