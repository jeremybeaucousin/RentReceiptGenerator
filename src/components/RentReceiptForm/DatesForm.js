import React from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';

import { convertDateToStringInput } from "../../utils/DateUtils";

export class DatesForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChanges = props.handleChanges;
        let currentReceipt = this.calculatePeriodesFromDateTransmission(props.currentReceipt);
        this.state = {
            currentReceipt: currentReceipt
        };
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

    handleChangeAndCalculation = event => {
        const receiptColumn = event.target.name;
        let value = event.target.value;
        this.setState(prevState => {
            let currentReceipt = Object.assign({}, prevState.currentReceipt);
            // Refresh periode dates
            value = new Date(value);
            currentReceipt[receiptColumn] = value;

            if (receiptColumn === "dateTransmission") {
                currentReceipt = this.calculatePeriodesFromDateTransmission(currentReceipt);
            }
            this.handleChanges(currentReceipt);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.currentReceipt !== this.state.currentReceipt) || (prevState.currentReceipt !== this.state.currentReceipt)) {
            this.setState((state, props) => {
                return { currentReceipt: props.currentReceipt };
            });
        };
    }

    render() {
        return (
            <div>
                <FormGroup >
                    <label htmlFor="RentReceiptFormDateTransmission"> Date d'émission de la quittance : </label>
                    <FormControl type="date" name="dateTransmission" id="RentReceiptFormDateTransmission" value={convertDateToStringInput(this.state.currentReceipt.dateTransmission)} onChange={this.handleChangeAndCalculation} />
                </FormGroup>

                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormPeriodeStart"> Début de la période concernée : </label>
                        <FormControl type="date" name="periodeStart" id="RentReceiptFormPeriodeStart" value={convertDateToStringInput(this.state.currentReceipt.periodeStart)} onChange={this.handleChangeAndCalculation} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormPeriodeEnd"> Fin de la période concernée : </label>
                        <FormControl type="date" name="periodeEnd" id="RentReceiptFormPeriodeEnd" value={convertDateToStringInput(this.state.currentReceipt.periodeEnd)} onChange={this.handleChangeAndCalculation} />
                    </div>

                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormPaidDate"> Date de paiement : </label>
                    <FormControl type="date" name="paidDate" id="RentReceiptFormPaidDate" value={convertDateToStringInput(this.state.currentReceipt.paidDate)} onChange={this.handleChangeAndCalculation} />
                </FormGroup>
            </div>
        );
    }
}