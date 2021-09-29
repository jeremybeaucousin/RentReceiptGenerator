import React from 'react';

import { Button, Accordion, Card, Form, Row, Col, FormGroup } from 'react-bootstrap';

import './PropertiesAdmin.css';

import Property from "../model/Property";


import { PropertyForm } from './PropertyForm';
import { TenantsAdmin } from './TenantsAdmin';
import { ConfirmationModal } from './ConfirmationModal';

import { deleteProperty, saveOrUpdateProperty, getProperties } from '../services/Property'

export class PropertiesAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            properties: [],
            currentProperty: null,
            displayPropertyDeletionModal: false
        };
        this.setCurrentProperty = this.setCurrentProperty.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.displayPropertyDeletionModal = this.displayPropertyDeletionModal.bind(this);
        this.deleteProperty = this.deleteProperty.bind(this);
        this.handleDeletePropertySelection = this.handleDeletePropertySelection.bind(this);
    }

    handleChanges = object => {
        this.setState(prevState => {
            if(object instanceof Property) {
                let newProperty = object;
                let properties = Object.assign([], prevState.properties);
                const propertyIndex = this.state.properties.findIndex(property => property.ID === newProperty.ID);
                properties[propertyIndex] = newProperty;
                return {
                    currentProperty: newProperty,
                    properties: properties
                }
            }
        });
    }

    setCurrentProperty(event) {
        const propertyIndex = parseInt(event.target.dataset.propertyIndex);
        const currentProperty = this.state.properties[propertyIndex];
        this.setState({
            currentProperty: currentProperty
        });
    }


    handleDeletePropertySelection(event) {
        const propertyIndex = parseInt(event.target.dataset.propertyIndex);
        const currentProperty = this.state.properties[propertyIndex];
        this.setState({
            currentProperty: currentProperty,
        });

        this.displayPropertyDeletionModal();
    }

    displayPropertyDeletionModal() {
        this.setState({
            displayPropertyDeletionModal: !this.state.displayPropertyDeletionModal
        });
    }

    componentDidMount() {
        const callbackResult = (data) => {
            this.setState({
                isLoaded: true,
                properties: data
            });
        }

        const callbackError = (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }

        getProperties(callbackResult, callbackError);
    }

    deleteProperty(event) {
        if (this.state.currentProperty.ID) {
            const callbackResult = (data) => {
                console.log(data);
                this.componentDidMount();
                this.setState(prevState => {
                    let properties = Object.assign([], prevState.properties);
                    const propertyIndex = this.state.properties.findIndex(property => property === this.state.currentProperty);
                    properties.splice(propertyIndex, 1);
                    return {
                        currentProperty: null,
                        properties: properties
                    }
                });
            }

            const callbackError = (error) => {
                this.setState({
                    error
                });
            }

            deleteProperty(this.state.currentProperty, callbackResult, callbackError);
        } else {
            this.setState(prevState => {
                let properties = Object.assign([], prevState.properties);
                const propertyIndex = this.state.properties.findIndex(property => property === this.state.currentProperty);
                properties.splice(propertyIndex, 1);
                return {
                    currentProperty: null,
                    properties: properties
                }
            });
        }

        this.displayPropertyDeletionModal();
        event.preventDefault()
    }

    handleSubmit(event) {
        const callbackResult = (data) => {
            console.log(data);
            this.componentDidMount();
            this.setState({
                currentProperty: data
            });

        }

        const callbackError = (error) => {
            this.setState({
                error
            });
        }

        saveOrUpdateProperty(this.state.currentProperty, callbackResult, callbackError);
        event.preventDefault()
    }

    handleAdd(event) {
        this.setState(prevState => {
            let properties = Object.assign([], prevState.properties);
            properties.push(new Property(undefined, "", "", 0, 0));
            return { properties: properties }
        });
        event.preventDefault()
    }

    render() {
        const { error, isLoaded, properties } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <>
                    <ConfirmationModal showModal={this.state.displayPropertyDeletionModal} handleValidate={this.deleteProperty} closeModal={this.displayPropertyDeletionModal} />
                    <Row>
                        <Col align="right">
                            <Button onClick={this.handleAdd} variant="success">Ajouter bien</Button>
                        </Col>
                    </Row>
                    <Accordion defaultActiveKey="0">
                        {properties.map((property, index) => (
                            <Card key={index}>
                                <Card.Header>
                                    <Row>
                                        <Col>
                                            <Accordion.Toggle as={Button} variant="link" onClick={this.setCurrentProperty} data-property-index={index} eventKey={index + 1}>
                                                Bien : {property.name} - {property.adress}
                                            </Accordion.Toggle>
                                        </Col>
                                        <Col align="right" md={2}>
                                            <Button onClick={this.handleDeletePropertySelection} data-property-index={index} variant="danger">Supprimer bien</Button>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Accordion.Collapse eventKey={index + 1}>
                                    <Card.Body>
                                        <Form onSubmit={this.handleSubmit}>
                                            <PropertyForm property={property} handleChanges={this.handleChanges} />
                                            
                                            <FormGroup>
                                                <Button variant="primary" type="submit">
                                                    Enregistrer
                                                </Button>
                                            </FormGroup>
                                        </Form>
                                        {this.state.currentProperty && property.ID && this.state.currentProperty.ID === property.ID &&
                                            <TenantsAdmin propertyId={property.ID} />
                                        }
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        ))}
                    </Accordion>
                </>
            );
        }
    }
}