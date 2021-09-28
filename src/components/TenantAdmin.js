import React from 'react';

import { Button, Form, FormGroup } from 'react-bootstrap';

import './TenantAdmin.css';

import { getSessionCookie } from "../model/Session";

import { TenantForm } from './TenantForm';

const REICEPT_API_URL = process.env.REACT_APP_RENT_RECEIPT_API_URL;

export class TenantAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tenant: props.tenant
        };

        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChanges = object => {
        this.setState(prevState => {
            let currentTenant = Object.assign(Object.create(Object.getPrototypeOf(prevState.tenant)), prevState.tenant);
            currentTenant = object;
            return { tenant: currentTenant };
        });
    }

    handleSubmit(event) {
        const owner = getSessionCookie();
        let method;
        let route;
        if(this.state.tenant.ID) {
            method = 'PUT';
            route = `/${this.state.tenant.ID}`;
            
        } else {
            method = 'POST';
            route = '';
        }
        fetch(`${REICEPT_API_URL}owners/${owner.ID}/properties/${this.props.propertyId}/tenants${route}`, {
            method: method,
            body: JSON.stringify(this.state.tenant)
        })
            .then(
                (result) => {
                    console.log(result);
                    result.json()
                        .then((data) => {
                            console.log(data);
                        })
                },

                (error) => {
                    console.error(error);
                }
            );
        event.preventDefault()
    }

    render() {

        return <div>
            <h3>{this.state.tenant.firstname} - {this.state.tenant.lastname}</h3>
            <Form onSubmit={this.handleSubmit}>
                <TenantForm tenant={this.state.tenant} handleChanges={this.handleChanges} />
                <FormGroup>
                    <Button variant="primary" type="submit" centered="true">
                        Enregistrer
                    </Button>
                </FormGroup>
            </Form>
        </div>
    }
}