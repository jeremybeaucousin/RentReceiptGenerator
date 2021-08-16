import React from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';

import './RentReceiptForm.css';

import { pdfMakeTable } from '../../model/RentReceiptDocument';

import { convertDateToStringInput } from "../../utils/DateUtils";

import { TenantList } from "./TenantList";
import { OwnerForm } from "./OwnerForm";
import { TenantForm } from "./TenantForm";
import { DatesForm } from "./DatesForm";

export default class RentReceiptForm extends React.Component {

    constructor(props) {
        super(props);
        let currentReceipt = this.props.currentReceipt;
        let receipts = this.props.receipts;

        this.state = {
            currentReceipt: currentReceipt,
            receipts: receipts,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTenantSelection = event => {
        let value = event.target.value;
        console.log(value);
        this.setState(prevState => {
            let currentReceipt = Object.assign({}, prevState.currentReceipt);
            currentReceipt = this.state.receipts[value];
            console.log(currentReceipt);
            return { currentReceipt };
        });
    }

    handleOwnerChange = event => {
        let value = event.target.value;
        const column = event.target.name;
        this.setState(prevState => {
            let currentReceipt = Object.assign({}, prevState.currentReceipt);
            currentReceipt.owner[column] = value;
            return { currentReceipt };
        });
    }

    handleTenantChange = event => {
        let value = event.target.value;
        const column = event.target.name;
        this.setState(prevState => {
            let currentReceipt = Object.assign({}, prevState.currentReceipt);
            currentReceipt.tenant[column] = value;
            return { currentReceipt };
        });
    }

    handleDatesChange = newCurrentReceipt => {
        this.setState(prevState => {
            let currentReceipt = Object.assign({}, prevState.currentReceipt);
            currentReceipt = newCurrentReceipt;
            return { currentReceipt };
        });
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
            if (value && ["paidDate"].includes(receiptColumn)) {
                value = new Date(value);
            }

            currentReceipt[receiptColumn] = value;
            return { currentReceipt };
        });
    }

    handleSubmit(event) {
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

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TenantList onSelectTenant={this.handleTenantSelection} />
                <OwnerForm owner={this.state.currentReceipt.owner} handleOwnerChange={this.handleOwnerChange} />
                <FormGroup >
                    <label htmlFor="RentReceiptFormAdresse"> Adresse du bien : </label>
                    <textarea className="form-control textarea-autosize" name="adress" id="RentReceiptFormAdresse" value={this.state.currentReceipt.adress} onChange={this.handleChange} />
                </FormGroup>

                <TenantForm tenant={this.state.currentReceipt.tenant} handleTenantChange={this.handleTenantChange} />

                <DatesForm currentReceipt={this.state.currentReceipt} handleDatesChange={this.handleDatesChange}/>

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