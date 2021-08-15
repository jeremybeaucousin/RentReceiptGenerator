import React from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';

import './RentReceiptForm.css';

import { pdfMakeTable } from '../model/RentReceiptDocument';

import { convertDateToStringInput } from "../utils/DateUtils";

import { TenantList } from "./TenantList";
import { OwnerForm } from "./OwnerForm";
import { TenantForm } from "./TenantForm";

export default class RentReceiptForm extends React.Component {

    constructor(props) {
        super(props);
        let currentReceipt = this.props.currentReceipt;
        let receipts = this.props.receipts;

        currentReceipt = this.calculatePeriodesFromDateTransmission(currentReceipt);
        this.state = {
            currentReceipt: currentReceipt,
            receipts: receipts,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    rentReiciptTenantPrefix = "RentReceiptTenant";

    handleChange(event) {
        let value = event.target.value;
        const receiptColumn = event.target.name;
        this.setState(prevState => {
            let currentReceipt = Object.assign({}, prevState.currentReceipt);
            if (value.startsWith(this.rentReiciptTenantPrefix)) {
                const index = value.replace(this.rentReiciptTenantPrefix, "")
                currentReceipt = this.state.receipts[index];
            } else {
                // Parse number from string
                if (value && ["rent", "charges"].includes(receiptColumn)) {
                    value = parseFloat(value);
                }

                // Parse date from string
                if (value && ["dateTransmission", "periodeStart", "periodeEnd", "paidDate"].includes(receiptColumn)) {
                    value = new Date(value);
                }

                if (receiptColumn.startsWith("owner")) {
                    const ownerColumn = receiptColumn.replace("owner.", "")
                    currentReceipt.owner[ownerColumn] = value;
                } else if (receiptColumn.startsWith("tenant")) {
                    const tenantColumn = receiptColumn.replace("tenant.", "")
                    currentReceipt.tenant[tenantColumn] = value;
                } else {
                    currentReceipt[receiptColumn] = value;
                }

                // Refresh periode dates
                if (receiptColumn === "dateTransmission") {
                    currentReceipt = this.calculatePeriodesFromDateTransmission(currentReceipt);
                }
            }

            return { currentReceipt };
        });
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.props.receipt);
        event.preventDefault();
    }

    componentDidUpdate(prevProps, prevState) {
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
                <TenantList rentReiciptTenantPrefix={this.rentReiciptTenantPrefix} onSelectTenant={this.handleChange} />
                <OwnerForm owner={this.state.currentReceipt.owner} handleChange={this.handleChange} />
                <FormGroup >
                    <label htmlFor="RentReceiptFormAdresse"> Adresse du bien : </label>
                    <textarea className="form-control textarea-autosize" name="adress" id="RentReceiptFormAdresse" value={this.state.currentReceipt.adress} onChange={this.handleChange} />
                </FormGroup>

                <TenantForm tenant={this.state.currentReceipt.tenant} handleChange={this.handleChange} />

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