import React from 'react';

import { Button, Form, FormGroup, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Owner from '../model/Owner';
import Property from '../model/Property';
import Tenant from '../model/Tenant';
import { saveOrUpdateOwner } from '../services/Owner';

import { OwnerForm } from './OwnerForm'
import { PropertyForm } from './PropertyForm';
import { TenantForm } from './TenantForm';

export class CreateOwner extends React.Component {
    constructor(props) {
        super(props);
        const owner = new Owner(undefined, "", "", "");
        owner.properties = [];
        this.state = {
            owner: owner
        }
        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddProperty = this.handleAddProperty.bind(this);
        this.handleAddTenant = this.handleAddTenant.bind(this);
        this.handleDeleteProperty = this.handleDeleteProperty.bind(this);
        this.handleDeleteTenant = this.handleDeleteTenant.bind(this);
    }

    handleAddProperty() {
        this.setState(prevState => {
            let currentOwner = Object.assign(Object.create(Object.getPrototypeOf(prevState.owner)), prevState.owner);
            const property = new Property(currentOwner.properties.length, "", "", 0, 0);
            property.tenants = [];
            currentOwner.properties.push(property);
            return { owner: currentOwner };
        });
    }

    handleDeleteProperty(event) {
        const propertyIndex = parseInt(event.target.dataset.propertyIndex);
        this.setState(prevState => {
            let currentOwner = Object.assign(Object.create(Object.getPrototypeOf(prevState.owner)), prevState.owner);
            const property = currentOwner.properties[propertyIndex];
            if (property) {
                currentOwner.properties.splice(propertyIndex, 1);
            }
            return { owner: currentOwner };
        });
    }

    handleDeleteTenant(event) {
        const propertyIndex = parseInt(event.target.dataset.propertyIndex);
        const tenantIndex = parseInt(event.target.dataset.tenantIndex);
        this.setState(prevState => {
            let currentOwner = Object.assign(Object.create(Object.getPrototypeOf(prevState.owner)), prevState.owner);
            const property = currentOwner.properties[propertyIndex];
            if (property) {
                const tenant = property.tenants[tenantIndex];
                if (tenant) {
                    currentOwner.properties[propertyIndex].tenants.splice(tenantIndex, 1);
                }
            }
            return { owner: currentOwner };
        });
    }


    handleAddTenant(event) {
        const propertyIndex = parseInt(event.target.dataset.propertyIndex);
        this.setState(prevState => {
            let currentOwner = Object.assign(Object.create(Object.getPrototypeOf(prevState.owner)), prevState.owner);
            const property = currentOwner.properties[propertyIndex];
            if (property) {
                const tenant = new Tenant(property.tenants.length, "", "", "");
                tenant.property = propertyIndex;
                property.tenants.push(tenant);
            }
            return { owner: currentOwner };
        });
    }

    handleChanges(object) {
        this.setState(prevState => {
            let currentOwner = Object.assign(Object.create(Object.getPrototypeOf(prevState.owner)), prevState.owner);
            if (object instanceof Owner) {
                currentOwner = object;
            } else if (object instanceof Property) {
                currentOwner.properties[object.ID] = object;
            } else if (object instanceof Tenant) {
                currentOwner.properties[object.property].tenants[object.ID] = object;
            }
            return { owner: currentOwner };
        });
    }

    handleSubmit(event) {
        const callbackResult = (data) => {
            console.log(data);
            window.location.href = "/";
        }
        saveOrUpdateOwner(this.state.owner, callbackResult);
        event.preventDefault();
    }

    render() {
        return (
            <>
                <Form>
                    <OwnerForm owner={this.state.owner} handleChanges={this.handleChanges} />

                    <Button onClick={this.handleAddProperty} variant="success">Ajouter bien</Button>

                    {this.state.owner.properties.map((property, propertyIndex) => (
                        <div key={propertyIndex}>
                            <h3>{property.name} - {property.adress}</h3>
                            <PropertyForm property={property} handleChanges={this.handleChanges} />
                            <Button onClick={this.handleDeleteProperty} data-property-index={propertyIndex} variant="danger">Supprimer bien</Button>
                            <FormGroup>
                                <Button onClick={this.handleAddTenant} data-property-index={propertyIndex} variant="success">Ajouter locataire</Button>
                            </FormGroup>
                            {property.tenants.map((tenant, index) => (
                                <div key={index} >
                                    <h3>{tenant.firstname} - {tenant.lastname}</h3>
                                    <TenantForm tenant={tenant} handleChanges={this.handleChanges} />
                                    <FormGroup>
                                        <Button onClick={this.handleDeleteTenant} data-property-index={propertyIndex} data-tenant-index={propertyIndex} variant="danger">Supprimer locataire</Button>
                                    </FormGroup>
                                </div>
                            ))
                            }
                        </div>
                    ))}

                    <FormGroup>
                        <Row>
                            <Col md={6}>
                                <Link to="/">
                                    <Button variant="secondary">
                                        Annuler
                                    </Button>
                                </Link>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={this.handleSubmit} type="submit">Enregistrer</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
            </>
        );
    }
}