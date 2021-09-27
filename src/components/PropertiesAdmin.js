import React from 'react';

import { Button, Accordion, Card, Form, FormControl, InputGroup, Row, Col, FormGroup } from 'react-bootstrap';

import './PropertiesAdmin.css';

import { getSessionCookie } from "../model/Session";

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
    }

    handleChange = event => {
        let value = event.target.value;
        const column = event.target.name;
        this.setState(prevState => {
            let currentProperty = Object.assign(Object.create(Object.getPrototypeOf(prevState.currentProperty)), prevState.currentProperty);
            const propertyIndex = this.state.properties.findIndex(property => property.ID === currentProperty.ID);
            if (value && ["rent", "charges"].includes(column)) {
                value = parseFloat(value);
            }
            currentProperty[column] = value;
            this.state.properties[propertyIndex] = currentProperty;
            return { currentProperty: currentProperty }
        });
    }

    setCurrentProperty(event) {
        const propertyId = parseInt(event.target.dataset.propertyId);
        const currentProperty = this.state.properties.find(property => property.ID === propertyId);
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
        fetch(`${REICEPT_API_URL}owners/${this.state.currentProperty.owner}/properties/${this.state.currentProperty.ID}`, {
            method: 'PUT',
            body: JSON.stringify(this.state.currentProperty)
        })
            .then(
                (result) => {
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
        const { error, isLoaded, properties } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Accordion defaultActiveKey="0">
                    {properties.map((property, index) => (
                        <Card key={property.ID}>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" onClick={this.setCurrentProperty} data-property-id={property.ID} eventKey={index + 1}>
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
                                                    <FormControl placeholder="Nom du bien" name="name" type="textarea" value={property.name}
                                                        aria-label="Nom du bien" aria-describedby="PropertiesAdminName" onChange={this.handleChange}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="PropertiesAdminAdresse">Addresse du bien :</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl placeholder="Addresse du bien" name="adress" type="text" value={property.adress}
                                                        aria-label="Addresse du bien" aria-describedby="PropertiesAdminAdresse" onChange={this.handleChange}
                                                    />
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
                                    {this.state.currentProperty && this.state.currentProperty.ID === property.ID &&
                                        <TenantsAdmin propertyId={property.ID} />
                                    }
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    ))}
                </Accordion>
            );
        }
    }
}