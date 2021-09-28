import React from 'react';

import { ListGroup, ListGroupItem, Row, Col, Button } from 'react-bootstrap';

import './TenantsAdmin.css';

import { TenantAdmin } from './TenantAdmin';

import { getSessionCookie } from "../model/Session";

import Tenant from "../model/Tenant";
import { ConfirmationModal } from './ConfirmationModal';

export class TenantsAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            tenants: [],
            displayTenantDeletionModal: false,
            currentTenant: null
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.displayTenantDeletionModal = this.displayTenantDeletionModal.bind(this);
        this.deleteTenant = this.deleteTenant.bind(this);
        this.handleDeleteTenentSelection = this.handleDeleteTenentSelection.bind(this);
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

    handleDeleteTenentSelection(event) {
        const tenantIndex = parseInt(event.target.dataset.tenantIndex);
        const currentTenant = this.state.tenants[tenantIndex];
        this.setState({
            currentTenant: currentTenant
        });

        this.displayTenantDeletionModal();
    }

    handleAdd(event) {
        this.setState(prevState => {
            let tenants = Object.assign([], prevState.tenants);
            tenants.push(new Tenant());
            return { tenants: tenants }
        });
        event.preventDefault()
    }

    displayTenantDeletionModal() {
        this.setState({
            displayTenantDeletionModal: !this.state.displayTenantDeletionModal
        });
    }

    deleteTenant(event) {
        const owner = getSessionCookie();
        if(this.state.currentTenant.ID) {
            fetch(`${process.env.REACT_APP_RENT_RECEIPT_API_URL}owners/${owner.ID}/properties/${this.props.propertyId}/tenants/${this.state.currentTenant.ID}`, {
                method: 'DELETE'
            })
                .then(
                    (result) => {
                        result.json()
                            .then((data) => {
                                console.log(data);
                                this.componentDidMount();
                                this.setState(prevState => {
                                    let tenants = Object.assign([], prevState.tenants);
                                    const tenantIndex = this.state.tenants.findIndex(tenant => tenant === this.state.currentTenant);
                                    tenants.splice(tenantIndex, 1);
                                    return {
                                        currentTenant: null,
                                        tenants: tenants
                                    }
                                });
                            })
                    },
    
                    (error) => {
                        console.error(error);
                        this.setState({
                            error
                        });
                    }
                )
        } else {
            this.setState(prevState => {
                let tenants = Object.assign([], prevState.tenants);
                const tenantIndex = this.state.tenants.findIndex(tenant => tenant === this.state.currentTenant);
                tenants.splice(tenantIndex, 1);
                return {
                    currentTenant: null,
                    tenants: tenants
                }
            });
        }
        
        this.displayTenantDeletionModal();
        event.preventDefault()
    }

    render() {
        const { isLoaded, tenants } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return <>
                <ConfirmationModal showModal={this.state.displayTenantDeletionModal} handleValidate={this.deleteTenant} closeModal={this.displayTenantDeletionModal} />
                <Row>
                    <Col>
                        <Button onClick={this.handleAdd} variant="success">Ajouter locataire</Button>
                    </Col>
                </Row>
                <ListGroup>
                    {tenants.map((tenant, index) => (
                        <div key={index}>
                            <ListGroupItem>
                                <TenantAdmin propertyId={this.props.propertyId} tenant={tenant} />
                            </ListGroupItem>
                            <Button onClick={this.handleDeleteTenentSelection} data-tenant-index={index} variant="danger">Supprimer locataire</Button>
                        </div>
                    ))}
                </ListGroup>
            </>
        }
    }
}