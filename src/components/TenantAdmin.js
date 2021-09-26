import React from 'react';

import { Button, Accordion, Card, useAccordionToggle } from 'react-bootstrap';

import { getSessionCookie } from "../model/Session";

// function CustomToggle({ children, eventKey }) {
//     const decoratedOnClick = useAccordionToggle(eventKey, () =>
//       console.log('totally custom!'),
//     );
  
//     return (
//       <button
//         type="button"
//         style={{ backgroundColor: 'pink' }}
//         onClick={decoratedOnClick}
//       >
//         {children}
//       </button>
//     );
//   }
export class TenantAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            tenantsLoaded: false,
            properties: [],
            tenants: []
        };

        this.loadTenants = this.loadTenants.bind(this);
    }

    loadTenants(event) {
        const owner = getSessionCookie();
        let propertyId = event.target.dataset.propertyId;
        fetch(`${process.env.REACT_APP_RENT_RECEIPT_API_URL}owners/${owner.ID}/properties/${propertyId}/tenants`)
            .then(
                (result) => {
                    result.json()
                        .then((data) => {
                            this.setState({
                                tenantsLoaded: true,
                                tenants: data
                            });
                        })
                },

                (error) => {
                    console.error(error);
                    this.setState({
                        tenantsLoaded: true,
                        error
                    });
                }
            )
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

    tenantsRender() {
        const { tenantsLoaded, tenants } = this.state;
        if (!tenantsLoaded) {
            return <div>Loading...</div>;
        } else {
            return <ul>
                {tenants.map((tenant, index) => (
                    <li key={tenant.ID}>{tenant.firstname} {tenant.lastname} : {tenant.adress}</li>
                  ))}   
            </ul>
        }
    }

    render() {
        const { error, isLoaded, properties } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <h3>Liste des biens</h3>
                    <Accordion defaultActiveKey="0">
                        {properties.map((property, index) => (
                            <Card key={property.ID}>
                                <Card.Header>
                                    {/* <CustomToggle eventKey="0">Click me!</CustomToggle> */}
                                    <Accordion.Toggle as={Button} variant="link" onClick={this.loadTenants} eventKey={index + 1} data-property-id={property.ID}>
                                        {property.name} - {property.adress}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={index + 1}>
                                    <Card.Body>{this.tenantsRender()}</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        ))}
                    </Accordion>
                </div>
            );
        }
    }
}