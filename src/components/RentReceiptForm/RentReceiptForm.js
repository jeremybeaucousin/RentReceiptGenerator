import React from 'react';

import { FormGroup, FormControl, Row, Col, Jumbotron } from 'react-bootstrap';

import './RentReceiptForm.css';

import { pdfMakeTable } from '../../model/RentReceiptDocument';

import receipts from '../../data/Receipts.json';
import { TenantList } from "./TenantList";
import { OwnerForm } from "./OwnerForm";
import { TenantForm } from "./TenantForm";
import { DatesForm } from "./DatesForm";
import { PdfReiceptRender } from "./PdfReiceptRender";

export default class RentReceiptForm extends React.Component {

    constructor(props) {
        super(props);

        const today = new Date();

        receipts.forEach(receipt => {
            receipt.dateTransmission = today;
            receipt.periodeStart = today;
            receipt.periodeEnd = today;
            receipt.paidDate = today;
        })

        this.state = {
            currentReceipt: receipts[0],
            receipts: receipts
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTenantSelection = event => {
        let value = event.target.value;
        this.setState(prevState => {
            let currentReceipt = Object.assign({}, prevState.currentReceipt);
            currentReceipt = this.state.receipts[value];
            return { currentReceipt };
        });
    }

    handleChanges = newCurrentReceipt => {
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
            if (value && ["rent", "charges", "amountPaid"].includes(receiptColumn)) {
                value = parseFloat(value);
            }
            currentReceipt[receiptColumn] = value;
            return { currentReceipt };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    _exportPdfTable = () => {
        pdfMakeTable(this.state.currentReceipt);
    }

    render() {
        return (
            <Row>
                <Jumbotron className="content col-sm-6">
                    <form onSubmit={this.handleSubmit}>
                        <TenantList onSelectTenant={this.handleTenantSelection} />
                        <OwnerForm currentReceipt={this.state.currentReceipt} handleChanges={this.handleChanges} />
                        <FormGroup >
                            <label htmlFor="RentReceiptFormAdresse"> Adresse du bien : </label>
                            <textarea className="form-control textarea-autosize" name="adress" id="RentReceiptFormAdresse" value={this.state.currentReceipt.adress} onChange={this.handleChange} />
                        </FormGroup>

                        <TenantForm currentReceipt={this.state.currentReceipt} handleChanges={this.handleChanges} />

                        <DatesForm currentReceipt={this.state.currentReceipt} handleChanges={this.handleChanges} />

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