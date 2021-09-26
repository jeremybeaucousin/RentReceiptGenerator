import React from 'react';

import { Button, Accordion, Card } from 'react-bootstrap';

import { getSessionCookie } from "../model/Session";

import { TenantsAdmin } from './TenantsAdmin';

export class PropertiesAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            properties: []
        };

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
                                {/* <CustomToggle eventKey="0">Click me!</CustomToggle> */}
                                <Accordion.Toggle as={Button} variant="link" onClick={this.loadTenants} eventKey={index + 1}>
                                    {property.name} - {property.adress}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={index + 1}>
                                <Card.Body>
                                    <TenantsAdmin propertyId={property.ID} />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    ))}
                </Accordion>
            );
        }
    }
}