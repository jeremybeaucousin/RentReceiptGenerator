import React from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';

export default class RentReceiptForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormOwnerFirstName"> Prénom du propriétaire : </label>
                        <FormControl type="text" id="RentReceiptFormOwnerFirstName" value={this.state.value} onChange={this.handleChange} />
                    </div>

                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormOwnerLastName"> Nom du propriétaire : </label>
                        <FormControl type="text" id="RentReceiptFormOwnerLastName" value={this.state.value} onChange={this.handleChange} />
                    </div>

                </FormGroup>

                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormTenantFirstName"> Prénom du locataire : </label>
                        <FormControl type="text" id="RentReceiptFormTenantFirstName" value={this.state.value} onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormTenantLastName"> Nom du locataire : </label>
                        <FormControl type="text" id="RentReceiptFormTenantLastName" value={this.state.value} onChange={this.handleChange} />
                    </div>
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormAdresse"> Adresse du bien : </label>
                    <FormControl type="text" id="RentReceiptFormAdresse" value={this.state.value} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormDateTransmission"> Date d'émission de la quittance : </label>
                    <FormControl type="date" id="RentReceiptFormDateTransmission" value={this.state.value} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup className="row">
                <div className="col-sm-6">
                <label htmlFor="RentReceiptFormPeriodeStart"> Début de la période concernée : </label>
                    <FormControl type="date" id="RentReceiptFormPeriodeStart" value={this.state.value} onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-6">
                    <label htmlFor="RentReceiptFormPeriodeEnd"> Fin de la période concernée : </label>
                    <FormControl type="date" id="RentReceiptFormPeriodeEnd" value={this.state.value} onChange={this.handleChange} />
                    </div>

                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormRent"> Loyer mensuel contractuel : </label>
                    <FormControl type="number" id="RentReceiptFormRent" value={this.state.value} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormCharge"> Charges mensuelles contractuelles : </label>
                    <FormControl type="number" id="RentReceiptFormCharge" value={this.state.value} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormSum"> Sommes payées au bailleur : </label>
                    <FormControl type="text" id="RentReceiptFormSum" value={this.state.value} onChange={this.handleChange} />

                </FormGroup>
                <input type="submit" value="Générer" />
            </form>
        );
    }
}