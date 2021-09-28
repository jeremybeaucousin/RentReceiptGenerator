import React from 'react';

import { ListGroup, ListGroupItem, Row, Col, Button } from 'react-bootstrap';

import './TenantsAdmin.css';

import { TenantAdmin } from './TenantAdmin';

import { getSessionCookie } from "../model/Session";

import Tenant from "../model/Tenant";

export class TenantsAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            tenants: []
        };
        this.handleAdd = this.handleAdd.bind(this);
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

    handleAdd(event) {
        this.setState(prevState => {
            let tenants = Object.assign([], prevState.tenants);
            tenants.push(new Tenant());
            return { tenants: tenants }
        });
        event.preventDefault()
    }

    render() {
        const { isLoaded, tenants } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return <>
                <Row>
                    <Col>
                        <Button onClick={this.handleAdd} variant="success">Ajouter locataire</Button>
                    </Col>
                </Row>
                <ListGroup>
                    {tenants.map((tenant, index) => (
                        <ListGroupItem key={index} >
                            <TenantAdmin propertyId={this.props.propertyId} tenant={tenant} />
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </>
        }
    }
}