import React from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';

import './RentReceiptForm.css';

import { pdfMakeTable } from './RentReceiptDocument';

export default class RentReceiptForm extends React.Component {

    constructor(props) {
        super(props);
        const receipt = this.props.receipt;

        let periodeStart = receipt.periodeStart;
        if(!periodeStart) {
            receipt.periodeStart = new Date();
        }

        let periodeEnd = receipt.periodeEnd;
        if(!periodeEnd) {
            receipt.periodeEnd = new Date();
        }

        this.state = {
            receipt: receipt,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;
        const receiptColumn = event.target.name;
        this.setState(prevState => {
            let receipt = Object.assign({}, prevState.receipt);
            // Parse number from string
            if(value && ["rent", "charges"].includes(receiptColumn)) {
                value = parseFloat(value);
            }
            
            // Parse date from string
             if(value && ["dateTransmission", "periodeStart" , "periodeEnd"].includes(receiptColumn)) {
                value = new Date(value);
            }

            receipt[receiptColumn] = value;
            return { receipt };
        });
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.props.receipt);
        event.preventDefault();
    }

    componentDidUpdate(prevProps, prevState) {
        // First condition is for initiatlisation
        if((this.props.receipt !== this.state.receipt) || (prevState.receipt !== this.state.receipt)) {
            this.props.onReceiptChange(this.state.receipt);
        }
    }

    convertDateToStringInput(date) {
        let stringInput = "";
        if(date && date instanceof Date) {
            var d = date.getDate();
            var m = date.getMonth() + 1;
            var y = date.getFullYear();
            return `${y}-${(m<=9 ? '0' + m : m)}-${(d <= 9 ? '0' + d : d)}`;
        } 
        return stringInput;
    }

    _exportPdfTable = () => {
        pdfMakeTable(this.state.receipt);
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

                <FormGroup >
                    <label htmlFor="RentReceiptFormOwnerAdresse"> Adresse du propriétaire : </label>
                    <textarea className="form-control textarea-autosize" name="ownerAdresse" id="RentReceiptFormOwnerAdresse" value={this.state.receipt.ownerAdress} onChange={this.handleChange} />
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
                    <textarea className="form-control textarea-autosize" name="adress" id="RentReceiptFormAdresse" value={this.state.receipt.adress} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormDateTransmission"> Date d'émission de la quittance : </label>
                    <FormControl type="date" name="dateTransmission" id="RentReceiptFormDateTransmission" value={this.convertDateToStringInput(this.state.receipt.dateTransmission)} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormPeriodeStart"> Début de la période concernée : </label>
                        <FormControl type="date" name="periodeStart" id="RentReceiptFormPeriodeStart" value={this.convertDateToStringInput(this.state.receipt.periodeStart)} onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormPeriodeEnd"> Fin de la période concernée : </label>
                        <FormControl type="date" name="periodeEnd" id="RentReceiptFormPeriodeEnd" value={this.convertDateToStringInput(this.state.receipt.periodeEnd)} onChange={this.handleChange} />
                    </div>

                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormRent"> Loyer mensuel contractuel : </label>
                    <FormControl type="number" name="rent" id="RentReceiptFormRent" value={this.state.receipt.rent} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormCharges"> Charges mensuelles contractuelles : </label>
                    <FormControl type="number" name="charges" id="RentReceiptFormCharges" value={this.state.receipt.charges} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <button className="col-sm-12 btn btn-primary" onClick={this._exportPdfTable}>Télécharger !</button>
                </FormGroup>
            </form>
        );
    }
}