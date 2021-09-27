import React from 'react';

import { FormGroup, FormControl, Row, Jumbotron, Col } from 'react-bootstrap';

import { getSessionCookie } from "../../model/Session";

import './RentReceiptForm.css';

import { pdfMakeTable } from '../../model/RentReceiptDocument';
import Receipt from '../../model/Receipt';
import Owner from '../../model/Owner';
import Property from '../../model/Property';
import Tenant from '../../model/Tenant';

import { OwnerForm } from "../OwnerForm";
import { TenantForm } from "../TenantForm";
import { DatesForm } from "./DatesForm";
import { PdfReiceptRender } from "./PdfReiceptRender";

export class RentReceiptForm extends React.Component {
    constructor(props) {
        super(props);

        const today = new Date();

        const ownerSession = getSessionCookie();
        const owner = new Owner(ownerSession.ID, ownerSession.firstname, ownerSession.lastname, ownerSession.adress)
        this.state = {
            currentReceipt: new Receipt(owner, null, null, today, today, today, 0, today),
            error: null,
            isLoaded: false,
            properties: [],
            tenants: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePropertySelection = this.handlePropertySelection.bind(this);
        this.handleTenantSelection = this.handleTenantSelection.bind(this);
    }

    handleChanges = object => {
        this.setState(prevState => {
            let currentReceipt = Object.assign(Object.create(Object.getPrototypeOf(prevState.currentReceipt)), prevState.currentReceipt);
            if (object instanceof Receipt) {
                currentReceipt = object;
            } else if (object instanceof Owner) {
                currentReceipt.owner = object;
            } else if (object instanceof Tenant) {
                currentReceipt.tenant = object;
            }
            return { currentReceipt: currentReceipt };
        });
    }

    handleChange(event) {
        let value = event.target.value;
        const receiptColumn = event.target.name;
        this.setState(prevState => {
            let currentReceipt = Object.assign(Object.create(Object.getPrototypeOf(prevState.currentReceipt)), prevState.currentReceipt);
            if (value) {
                if (["rent", "charges", "amountPaid"].includes(receiptColumn)) {
                    value = parseFloat(value);
                }
            }

            if (["adress", "rent", "charges"].includes(receiptColumn)) {
                currentReceipt.property[receiptColumn] = value;
            } else {
                currentReceipt[receiptColumn] = value;
            }

            return { currentReceipt };
        });
    }

    handlePropertySelection(event) {
        let propertyIndex = parseInt(event.target.value);
        this.setState(prevState => {
            let currentReceipt = Object.assign(Object.create(Object.getPrototypeOf(prevState.currentReceipt)), prevState.currentReceipt);
            let currentProperty = this.state.properties[propertyIndex];
            currentReceipt.property = currentProperty
            currentReceipt.amountPaid = currentProperty.rent + currentProperty.charges;
            this.getPropertyTenants(currentProperty.ID);
            return { currentReceipt: currentReceipt };
        });
    }

    handleTenantSelection(event) {
        let tenantIndex = parseInt(event.target.value);
        this.setState(prevState => {
            let currentReceipt = Object.assign(Object.create(Object.getPrototypeOf(prevState.currentReceipt)), prevState.currentReceipt);
            let currentProperty = this.state.tenants[tenantIndex];
            currentReceipt.tenant = currentProperty
            return { currentReceipt: currentReceipt };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_RENT_RECEIPT_API_URL}owners/${this.state.currentReceipt.owner.ID}/properties`)
            .then(
                (result) => {
                    result.json()
                        .then((data) => {
                            const currentProperty = (data && data.length > 0) ? data[0] : null;
                            this.setState(prevState => {
                                let currentReceipt = Object.assign(Object.create(Object.getPrototypeOf(prevState.currentReceipt)), prevState.currentReceipt);
                                currentReceipt.property = new Property(currentProperty.ID, currentProperty.name, currentProperty.adress, currentProperty.rent, currentProperty.charges);
                                currentReceipt.amountPaid = currentProperty.rent + currentProperty.charges;
                                if (currentProperty) {
                                    this.getPropertyTenants(currentProperty.ID);
                                }
                                return {
                                    currentReceipt: currentReceipt,
                                    isLoaded: true,
                                    properties: data
                                };
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

    getPropertyTenants(propertyId) {
        fetch(`${process.env.REACT_APP_RENT_RECEIPT_API_URL}owners/${this.state.currentReceipt.owner.ID}/properties/${propertyId}/tenants`)
            .then(
                (result) => {
                    result.json()
                        .then((data) => {
                            const currentTenant = (data && data.length > 0) ? data[0] : null;
                            this.setState(prevState => {
                                let currentReceipt = Object.assign(Object.create(Object.getPrototypeOf(prevState.currentReceipt)), prevState.currentReceipt);
                                currentReceipt.tenant = new Tenant(currentTenant.ID, currentTenant.firstname, currentTenant.lastname, currentTenant.adress);
                                return {
                                    currentReceipt: currentReceipt,
                                    tenants: data
                                };
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
    }

    _exportPdfTable = () => {
        pdfMakeTable(this.state.currentReceipt);
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Row>
                    <Jumbotron className="content col-sm-6">
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <label htmlFor="RentReceiptProperties">Choix du bien : </label>
                                        <FormControl id="RentReceiptProperties" as="select" onChange={this.handlePropertySelection} custom>
                                            {this.state.properties.map((property, index) => (
                                                <option key={index} value={index}>
                                                    {property.name} {property.adress}
                                                </option>
                                            ))}
                                        </FormControl>
                                    </Col>
                                    <Col md={6}>
                                        <label htmlFor="RentReceiptTenants">Choix du locataire : </label>
                                        <FormControl id="RentReceiptTenants" as="select" onChange={this.handleTenantSelection} custom>
                                            {this.state.tenants.map((tenant, index) => (
                                                <option key={index} value={index}>
                                                    {tenant.name} {tenant.adress}
                                                </option>
                                            ))}
                                        </FormControl>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <h3>Propriétaires :</h3>
                            <OwnerForm owner={this.state.currentReceipt.owner} handleChanges={this.handleChanges} />
                            {this.state.currentReceipt.property &&
                                <>
                                    <h3>Bien :</h3>
                                    <FormGroup>
                                        <label htmlFor="RentReceiptFormAdresse"> Adresse du bien : </label>
                                        <textarea className="form-control textarea-autosize" name="adress" id="RentReceiptFormAdresse" value={this.state.currentReceipt.property.adress} onChange={this.handleChange} />
                                    </FormGroup>


                                    <FormGroup >
                                        <label htmlFor="RentReceiptFormRent"> Loyer mensuel contractuel : </label>
                                        <FormControl type="number" name="rent" id="RentReceiptFormRent" value={this.state.currentReceipt.property.rent} onChange={this.handleChange} />
                                    </FormGroup>

                                    <FormGroup >
                                        <label htmlFor="RentReceiptFormCharges"> Charges mensuelles contractuelles : </label>
                                        <FormControl type="number" name="charges" id="RentReceiptFormCharges" value={this.state.currentReceipt.property.charges} onChange={this.handleChange} />
                                    </FormGroup>
                                </>
                            }

                            {this.state.currentReceipt.tenant &&
                                <>
                                    <h3>Locataire :</h3>
                                    <TenantForm tenant={this.state.currentReceipt.tenant} handleChanges={this.handleChanges} />
                                </>
                            }

                            <h3>Quittance :</h3>
                            <DatesForm currentReceipt={this.state.currentReceipt} handleChanges={this.handleChanges} />


                            <FormGroup >
                                <label htmlFor="RentReceiptFormAmountPaid"> Montant payé : </label>
                                <FormControl type="number" name="amountPaid" id="RentReceiptFormAmountPaid" value={this.state.currentReceipt.amountPaid} onChange={this.handleChange} />
                            </FormGroup>

                            <FormGroup>
                                <button className="col-sm-12 btn btn-primary" onClick={this._exportPdfTable}>Télécharger !</button>
                            </FormGroup>
                        </form>
                    </Jumbotron>
                    <PdfReiceptRender currentReceipt={this.state.currentReceipt} />
                </Row>
            );
        }
    }
}