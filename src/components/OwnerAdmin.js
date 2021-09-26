import React from 'react';

import { Tabs, Tab, Form, Button } from 'react-bootstrap';

import { getSessionCookie, setSessionCookie } from "../model/Session";

import { OwnerForm } from './OwnerForm'

import { PropertiesAdmin } from './PropertiesAdmin'

const REICEPT_API_URL = process.env.REACT_APP_RENT_RECEIPT_API_URL;
export class OwnerAdmin extends React.Component {
    constructor(props) {
        super(props);
        const owner = getSessionCookie();
        this.state = {
            owner: owner
        }

        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChanges = object => {
        this.setState(prevState => {
            let currentOwner = Object.assign(Object.create(Object.getPrototypeOf(prevState.owner)), prevState.owner);
            currentOwner = object;
            return { owner: currentOwner };
        });
    }

    handleSubmit(event) {
        fetch(`${REICEPT_API_URL}owners/${this.state.owner.ID}`, {
            method: 'PUT',
            body: JSON.stringify(this.state.owner)
        })
            .then(
                (result) => {
                    console.log(result);
                    result.json()
                        .then((data) => {
                            console.log(data);
                            setSessionCookie(data);
                        })

                },

                (error) => {
                    console.error(error);
                }
            );
        event.preventDefault()
    }

    render() {
        return (
            <Tabs defaultActiveKey="owner">
                <Tab eventKey="owner" title="Propriétaire">
                    <Form onSubmit={this.handleSubmit}>
                        <OwnerForm owner={this.state.owner} handleChanges={this.handleChanges} />
                        <Button variant="primary" type="submit">
                            Enregistrer
                        </Button>
                    </Form>
                </Tab>
                <Tab eventKey="properties" title="Biens">
                    <PropertiesAdmin />
                </Tab>
            </Tabs>
        );
    }
}