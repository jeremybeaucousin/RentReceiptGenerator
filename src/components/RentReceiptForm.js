import React from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';

import './RentReceiptForm.css';

import { pdfMakeTable } from '../model/RentReceiptDocument';

import { convertDateToStringInput } from "../utils/DateUtils";

export default class RentReceiptForm extends React.Component {

    constructor(props) {
        super(props);
        let receipt = this.props.receipt;

        receipt = this.calculatePeriodesFromDateTransmission(receipt);
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
            // Refresh periode dates
            if(receiptColumn === "dateTransmission") {
                receipt = this.calculatePeriodesFromDateTransmission(receipt);
            }
    
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

    _exportPdfTable = () => {
        pdfMakeTable(this.state.receipt);
    }

    calculatePeriodesFromDateTransmission(receipt) {
        // Initialization if empty
        if(!receipt.dateTransmission) {
            receipt.dateTransmission = new Date();
        }
        const dateTransmission = receipt.dateTransmission, y = dateTransmission.getFullYear(), m = dateTransmission.getMonth();

        // First day of month
        const periodeStart = new Date(y, m, 1);
        receipt.periodeStart = periodeStart;

        // Last day of month
        const periodeEnd = new Date(y, m + 1, 0);
        receipt.periodeEnd = periodeEnd;
        return receipt;
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
                    <label htmlFor="RentReceiptFormOwnerAdress"> Adresse du propriétaire : </label>
                    <textarea className="form-control textarea-autosize" name="ownerAdress" id="RentReceiptFormOwnerAdress" value={this.state.receipt.ownerAdress} onChange={this.handleChange} />
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
                    <FormControl type="date" name="dateTransmission" id="RentReceiptFormDateTransmission" value={convertDateToStringInput(this.state.receipt.dateTransmission)} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormPeriodeStart"> Début de la période concernée : </label>
                        <FormControl type="date" name="periodeStart" id="RentReceiptFormPeriodeStart" value={convertDateToStringInput(this.state.receipt.periodeStart)} onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormPeriodeEnd"> Fin de la période concernée : </label>
                        <FormControl type="date" name="periodeEnd" id="RentReceiptFormPeriodeEnd" value={convertDateToStringInput(this.state.receipt.periodeEnd)} onChange={this.handleChange} />
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