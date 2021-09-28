import React from 'react';

import { Button, Accordion, Card, Form, FormControl, InputGroup, Row, Col, FormGroup } from 'react-bootstrap';

import './PropertiesAdmin.css';

import { getSessionCookie } from "../model/Session";

import Property from "../model/Property";

import { TenantsAdmin } from './TenantsAdmin';

const REICEPT_API_URL = process.env.REACT_APP_RENT_RECEIPT_API_URL;

export class PropertiesAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            properties: [],
            currentProperty: null
        };
        this.setCurrentProperty = this.setCurrentProperty.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleChange = event => {
        let value = event.target.value;
        const column = event.target.name;
        this.setState(prevState => {
            let currentProperty = Object.assign(Object.create(Object.getPrototypeOf(prevState.currentProperty)), prevState.currentProperty);
            let properties = Object.assign([], prevState.properties);
            const propertyIndex = this.state.properties.findIndex(property => property.ID === currentProperty.ID);
            if (value && ["rent", "charges"].includes(column)) {
                value = parseFloat(value);
            }
            currentProperty[column] = value;
            properties[propertyIndex] = currentProperty;
            return { 
                currentProperty: currentProperty,
                properties: properties
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

    componentDidMount() {
        const owner = getSessionCookie();
        fetch(`${process.env.REACT_APP_RENT_RECEIPT_API_URL}owners/${owner.ID}/properties`)
            .then(
                (result) => {
                    result.json()
                        .then((data) => {
                            this.setState({
                                isLoaded: true,
                                properties: data
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

    handleSubmit(event) {
        const owner = getSessionCookie();
        const property = this.state.currentProperty;
        let method;
        let route;
        if(property.ID) {
            method = 'PUT';
            route = `/${this.state.currentProperty.ID}`;
            
        } else {
            method = 'POST';
            route = '';
        }

        fetch(`${REICEPT_API_URL}owners/${owner.ID}/properties${route}`, {
            method: method,
            body: JSON.stringify(property)
        })
            .then(
                (result) => {
                    result.json()
                        .then((data) => {
                            console.log(data);
                            this.componentDidMount();
                            this.setState({
                                currentProperty: data
                            });
                        })
                },

                (error) => {
                    console.error(error);
                }
            );
        event.preventDefault()
    }

    handleAdd(event) {
        this.setState(prevState => {
            let properties = Object.assign([], prevState.properties);
            properties.push(new Property(undefined, "NOUVEAU BIEN", undefined, 0, 0));
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
                    <Row>
                        <Col align="right">
                            <Button onClick={this.handleAdd} variant="success">Ajouter bien</Button>
                        </Col>
                    </Row>
                    <Accordion defaultActiveKey="0">
                        {properties.map((property, index) => (
                            <Card key={index}>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" onClick={this.setCurrentProperty} data-property-index={index} eventKey={index + 1}>
                                        {property.name} - {property.adress}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={index + 1}>
                                    <Card.Body>
                                        <Form onSubmit={this.handleSubmit}>
                                            <Row>
                                                <Col>
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text id="PropertiesAdminName">Nom du bien :</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <FormControl placeholder="Nom du bien" name="name" type="text" value={property.name}
                                                            aria-label="Nom du bien" aria-describedby="PropertiesAdminName" onChange={this.handleChange}
                                                        />
                                                    </InputGroup>
                                                </Col>
                                                <Col>
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text id="PropertiesAdminAdresse">Addresse du bien :</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <textarea className="form-control textarea-autosize" name="adress" id="adresse" value={property.adress} onChange={this.handleChange}
                                                            aria-label="Addresse du bien" aria-describedby="PropertiesAdminAdresse" />
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text id="PropertiesAdminRent">Loyer :</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <FormControl placeholder="Loyer" type="number" name="rent" value={property.rent}
                                                            aria-label="Loyer" aria-describedby="PropertiesAdminRent" onChange={this.handleChange}
                                                        />
                                                    </InputGroup>
                                                </Col>
                                                <Col>
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text id="PropertiesAdminCharges">Charges :</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <FormControl placeholder="Charges" type="number" name="charges" value={property.charges}
                                                            aria-label="Charges" aria-describedby="PropertiesAdminCharges" onChange={this.handleChange}
                                                        />
                                                    </InputGroup>
                                                </Col>
                                            </Row>
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