import React from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';

import './RentReceiptForm.css';

import { pdfMakeTable } from '../model/RentReceiptDocument';

import { convertDateToStringInput } from "../utils/DateUtils";

export default class RentReceiptForm extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        let currentReceipt = this.props.currentReceipt;

        currentReceipt = this.calculatePeriodesFromDateTransmission(currentReceipt);
        this.state = {
            currentReceipt: currentReceipt,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;
        const receiptColumn = event.target.name;
        this.setState(prevState => {
            let currentReceipt = Object.assign({}, prevState.currentReceipt);
            // Parse number from string
            if (value && ["rent", "charges"].includes(receiptColumn)) {
                value = parseFloat(value);
            }

            // Parse date from string
            if (value && ["dateTransmission", "periodeStart", "periodeEnd", "paidDate"].includes(receiptColumn)) {
                value = new Date(value);
            }

            currentReceipt[receiptColumn] = value;
            // Refresh periode dates
            if (receiptColumn === "dateTransmission") {
                currentReceipt = this.calculatePeriodesFromDateTransmission(currentReceipt);
            }

            return { currentReceipt };
        });
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.props.receipt);
        event.preventDefault();
    }

    componentDidUpdate(prevProps, prevState) {
        // First condition is for initiatlisation
        if ((this.props.currentReceipt !== this.state.currentReceipt) || (prevState.currentReceipt !== this.state.currentReceipt)) {
            this.props.onReceiptChange(this.state.currentReceipt);
        }
    }

    _exportPdfTable = () => {
        pdfMakeTable(this.state.currentReceipt);
    }

    calculatePeriodesFromDateTransmission(currentReceipt) {
        // Initialization if empty
        if (!currentReceipt.dateTransmission) {
            currentReceipt.dateTransmission = new Date();
        }
        const dateTransmission = currentReceipt.dateTransmission, y = dateTransmission.getFullYear(), m = dateTransmission.getMonth();

        // First day of month
        const periodeStart = new Date(y, m, 1);
        currentReceipt.periodeStart = periodeStart;

        // Last day of month
        const periodeEnd = new Date(y, m + 1, 0);
        currentReceipt.periodeEnd = periodeEnd;
        return currentReceipt;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormOwnerFirstName"> Prénom du propriétaire : </label>
                        <FormControl type="text" name="ownerFirstName" id="RentReceiptFormOwnerFirstName" value={this.state.currentReceipt.ownerFirstName} onChange={this.handleChange} />
                    </div>

                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormOwnerLastName"> Nom du propriétaire : </label>
                        <FormControl type="text" name="ownerLastName" id="RentReceiptFormOwnerLastName" value={this.state.currentReceipt.ownerLastName} onChange={this.handleChange} />
                    </div>

                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormOwnerAdress"> Adresse du propriétaire : </label>
                    <textarea className="form-control textarea-autosize" name="ownerAdress" id="RentReceiptFormOwnerAdress" value={this.state.currentReceipt.ownerAdress} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormAdresse"> Adresse du bien : </label>
                    <textarea className="form-control textarea-autosize" name="adress" id="RentReceiptFormAdresse" value={this.state.currentReceipt.adress} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormTenantFirstName"> Prénom du locataire : </label>
                        <FormControl type="text" name="tenantFirstName" id="RentReceiptFormTenantFirstName" value={this.state.currentReceipt.tenantFirstName} onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormTenantLastName"> Nom du locataire : </label>
                        <FormControl type="text" name="tenantLastName" id="RentReceiptFormTenantLastName" value={this.state.currentReceipt.tenantLastName} onChange={this.handleChange} />
                    </div>
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormTenantAdresse"> Adresse du locataire : </label>
                    <textarea className="form-control textarea-autosize" name="tenantAdress" id="RentReceiptFormTenantAdresse" value={this.state.currentReceipt.tenantAdress} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormDateTransmission"> Date d'émission de la quittance : </label>
                    <FormControl type="date" name="dateTransmission" id="RentReceiptFormDateTransmission" value={convertDateToStringInput(this.state.currentReceipt.dateTransmission)} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormPeriodeStart"> Début de la période concernée : </label>
                        <FormControl type="date" name="periodeStart" id="RentReceiptFormPeriodeStart" value={convertDateToStringInput(this.state.currentReceipt.periodeStart)} onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormPeriodeEnd"> Fin de la période concernée : </label>
                        <FormControl type="date" name="periodeEnd" id="RentReceiptFormPeriodeEnd" value={convertDateToStringInput(this.state.currentReceipt.periodeEnd)} onChange={this.handleChange} />
                    </div>

                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormRent"> Loyer mensuel contractuel : </label>
                    <FormControl type="number" name="rent" id="RentReceiptFormRent" value={this.state.currentReceipt.rent} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormCharges"> Charges mensuelles contractuelles : </label>
                    <FormControl type="number" name="charges" id="RentReceiptFormCharges" value={this.state.currentReceipt.charges} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormAmountPaid"> Montant payé : </label>
                    <FormControl type="number" name="amountPaid" id="RentReceiptFormAmountPaid" value={this.state.currentReceipt.amountPaid} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormPaidDate"> Date de paiement : </label>
                    <FormControl type="date" name="paidDate" id="RentReceiptFormPaidDate" value={convertDateToStringInput(this.state.currentReceipt.paidDate)} onChange={this.handleChange} />
                </FormGroup>

                <FormGroup>
                    <button className="col-sm-12 btn btn-primary" onClick={this._exportPdfTable}>Télécharger !</button>
                </FormGroup>
            </form>
        );
    }
}