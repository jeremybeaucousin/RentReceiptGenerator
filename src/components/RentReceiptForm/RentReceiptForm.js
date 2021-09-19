import React from 'react';

import { FormGroup, FormControl, Row, Jumbotron } from 'react-bootstrap';

import './RentReceiptForm.css';

import { pdfMakeTable } from '../../model/RentReceiptDocument';
import Receipt from '../../model/Receipt';
import Owner from '../../model/Owner';
import Tenant from '../../model/Tenant';

import receipts from '../../data/Receipts.json';
import { TenantList } from "./TenantList";
import { OwnerForm } from "../OwnerForm";
import { TenantForm } from "../TenantForm";
import { DatesForm } from "./DatesForm";
import { PdfReiceptRender } from "./PdfReiceptRender";

export default class RentReceiptForm extends React.Component {
    constructor(props) {
        super(props);

        const today = new Date();

        const stateReceipts = [];

        receipts.forEach(receipt => {
            const owner = new Owner(receipt.owner.firstName, receipt.owner.lastName, receipt.owner.adress);
            const tenant = new Tenant(receipt.tenant.firstName, receipt.tenant.lastName, receipt.tenant.adress);

            stateReceipts.push(new Receipt(owner, tenant, receipt.adress, today, today, today, receipt.rent, receipt.charges, receipt.amountPaid, today));
        })

        this.state = {
            currentReceipt: stateReceipts[0],
            receipts: stateReceipts
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

            return { currentReceipt };
        });
    }

    handleChange(event) {
        let value = event.target.value;
        const receiptColumn = event.target.name;
        this.setState(prevState => {
            let currentReceipt = Object.assign(Object.create(Object.getPrototypeOf(prevState.currentReceipt)), prevState.currentReceipt);
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
                        <TenantList currentReceipt={this.state.currentReceipt} receipts={this.state.receipts} handleChanges={this.handleChanges} />
                        <OwnerForm owner={this.state.currentReceipt.owner} handleChanges={this.handleChanges} />
                        <FormGroup >
                            <label htmlFor="RentReceiptFormAdresse"> Adresse du bien : </label>
                            <textarea className="form-control textarea-autosize" name="adress" id="RentReceiptFormAdresse" value={this.state.currentReceipt.adress} onChange={this.handleChange} />
                        </FormGroup>

                        <TenantForm tenant={this.state.currentReceipt.tenant} handleChanges={this.handleChanges} />

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