import React from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';
import './RentReceiptForm.css';

export default class RentReceiptForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'ownerFirstName' : "Jonathan",
            'ownerLastName' : "BEAUCOUSIN",
            'tenantFirstName' : "Léa",
            'tenantLastName' : "LIMOGES",
            'adresse' : "4ème étage\n187 rue de verdun\n76600 Le havre\nFrance",
            'dateTransmission' : "2020-07-02",
            'periodeStart' : "2020-07-02",
            'periodeEnd' : "2020-07-02",
            'rent' : 450,
            'charges' : 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        console.log(value);
        console.log(event.target.name);
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormOwnerFirstName"> Prénom du propriétaire : </label>
                        <FormControl type="text" name="ownerFirstName" id="RentReceiptFormOwnerFirstName" value={this.state.ownerFirstName} onChange={this.handleChange} />
                    </div>

                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormOwnerLastName"> Nom du propriétaire : </label>
                        <FormControl type="text" name="ownerLastName" id="RentReceiptFormOwnerLastName" value={this.state.ownerLastName} onChange={this.handleChange} />
                    </div>

                </FormGroup>

                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormTenantFirstName"> Prénom du locataire : </label>
                        <FormControl type="text" name="tenantFirstName" id="RentReceiptFormTenantFirstName" value={this.state.tenantFirstName} onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormTenantLastName"> Nom du locataire : </label>
                        <FormControl type="text" name="tenantLastName" id="RentReceiptFormTenantLastName" value={this.state.tenantLastName} onChange={this.handleChange} />
                    </div>
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormAdresse"> Adresse du bien : </label>
                    <textarea className="form-control textarea-autosize" name="adresse" id="RentReceiptFormAdresse" value={this.state.adresse} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormDateTransmission"> Date d'émission de la quittance : </label>
                    <FormControl type="date" name="dateTransmission" id="RentReceiptFormDateTransmission" value={this.state.dateTransmission} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormPeriodeStart"> Début de la période concernée : </label>
                        <FormControl type="date" name="periodeStart" id="RentReceiptFormPeriodeStart" value={this.state.periodeStart} onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormPeriodeEnd"> Fin de la période concernée : </label>
                        <FormControl type="date" name="periodeEnd" id="RentReceiptFormPeriodeEnd" value={this.state.periodeEnd} onChange={this.handleChange} />
                    </div>

                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormRent"> Loyer mensuel contractuel : </label>
                    <FormControl type="number" name="rent" id="RentReceiptFormRent" value={this.state.rent} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormCharges"> Charges mensuelles contractuelles : </label>
                    <FormControl type="number" name="charge" id="RentReceiptFormCharges" value={this.state.charges} onChange={this.handleChange} />
                </FormGroup>

                <input type="submit" value="Générer" />
            </form>
        );
    }
}