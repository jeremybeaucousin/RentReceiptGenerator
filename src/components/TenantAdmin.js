import React from 'react';

import { Button, Form, FormGroup } from 'react-bootstrap';

import './TenantAdmin.css';

import { TenantForm } from './TenantForm';
import { saveOrUpdateTenant } from '../services/Tenant';

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
        const callbackResult = (data) => {
            console.log(data);
        }

        saveOrUpdateTenant(this.props.propertyId, this.state.tenant, callbackResult);
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