import React from 'react';

import { ListGroup, ListGroupItem } from 'react-bootstrap';

import './TenantsAdmin.css';

import { TenantAdmin } from './TenantAdmin';

import { getSessionCookie } from "../model/Session";

export class TenantsAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            tenants: []
        };
    }

    componentDidMount() {
        const owner = getSessionCookie();
        fetch(`${process.env.REACT_APP_RENT_RECEIPT_API_URL}owners/${owner.ID}/properties/${this.props.propertyId}/tenants`)
            .then(
                (result) => {
                    result.json()
                        .then((data) => {
                            this.setState({
                                isLoaded: true,
                                tenants: data
                            });
                        })
                },

                (error) => {
                    console.error(error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { isLoaded, tenants } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return <ListGroup>
                {tenants.map((tenant) => (
                    <ListGroupItem key={tenant.ID} >
                        <TenantAdmin tenant={tenant} />
                    </ListGroupItem>
                ))}
            </ListGroup>
        }
    }
}