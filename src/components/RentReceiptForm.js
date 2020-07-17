import React from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';

import { PDFDownloadLink } from '@react-pdf/renderer';

import './RentReceiptForm.css';

import MyDocument from "./RentReceiptDocument";

export default class RentReceiptForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            receipt: this.props.receipt,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        const receiptColumn = event.target.name;
        this.setState(prevState => {
            let receipt = Object.assign({}, prevState.receipt); 
            receipt[receiptColumn] = value;
            return { receipt };
          }
        );
        this.props.onReceiptChange(this.state.receipt);
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.props.receipt);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormOwnerFirstName"> Prénom du propriétaire : </label>
                        <FormControl type="text" name="ownerFirstName" id="RentReceiptFormOwnerFirstName" value={this.state.receipt.ownerFirstName} onChange={this.handleChange} />
                    </div>

                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormOwnerLastName"> Nom du propriétaire : </label>
                        <FormControl type="text" name="ownerLastName" id="RentReceiptFormOwnerLastName" value={this.state.receipt.ownerLastName} onChange={this.handleChange} />
                    </div>

                </FormGroup>

                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormTenantFirstName"> Prénom du locataire : </label>
                        <FormControl type="text" name="tenantFirstName" id="RentReceiptFormTenantFirstName" value={this.state.receipt.tenantFirstName} onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormTenantLastName"> Nom du locataire : </label>
                        <FormControl type="text" name="tenantLastName" id="RentReceiptFormTenantLastName" value={this.state.receipt.tenantLastName} onChange={this.handleChange} />
                    </div>
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormAdresse"> Adresse du bien : </label>
                    <textarea className="form-control textarea-autosize" name="adresse" id="RentReceiptFormAdresse" value={this.state.receipt.adresse} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormDateTransmission"> Date d'émission de la quittance : </label>
                    <FormControl type="date" name="dateTransmission" id="RentReceiptFormDateTransmission" value={this.state.receipt.dateTransmission} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormPeriodeStart"> Début de la période concernée : </label>
                        <FormControl type="date" name="periodeStart" id="RentReceiptFormPeriodeStart" value={this.state.receipt.periodeStart} onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormPeriodeEnd"> Fin de la période concernée : </label>
                        <FormControl type="date" name="periodeEnd" id="RentReceiptFormPeriodeEnd" value={this.state.receipt.periodeEnd} onChange={this.handleChange} />
                    </div>

                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormRent"> Loyer mensuel contractuel : </label>
                    <FormControl type="number" name="rent" id="RentReceiptFormRent" value={this.state.receipt.rent} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormCharges"> Charges mensuelles contractuelles : </label>
                    <FormControl type="number" name="charge" id="RentReceiptFormCharges" value={this.state.receipt.charges} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <PDFDownloadLink document={<MyDocument receipt={this.state.receipt}/>} className="col-sm-12 btn btn-primary" fileName="somename.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Document en cours de chargement...' : 'Télécharger !')}
                    </PDFDownloadLink>
                </FormGroup>
            </form>
        );
    }
}