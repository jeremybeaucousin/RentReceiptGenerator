import React from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';

export class OwnerForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChanges = props.handleChanges;
        this.state = {
            owner: props.currentReceipt.owner
        };
    }

    handleOwnerChange = event => {
        let value = event.target.value;
        const column = event.target.name;
        this.setState(prevState => {
            let owner = Object.assign({}, prevState.owner);
            let currentReceipt = this.props.currentReceipt;
            owner[column] = value;
            currentReceipt.owner = owner;
            this.handleChanges(currentReceipt);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.currentReceipt.owner !== this.state.owner) || (prevState.owner !== this.state.owner)) {
            this.setState((state, props) => {
                return { owner: props.currentReceipt.owner };
            });
        };
    }

    render() {
        return (
            <div>
                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormOwnerFirstName"> Prénom du propriétaire : </label>
                        <FormControl type="text" name="firstName" id="RentReceiptFormOwnerFirstName" value={this.state.owner.firstName} onChange={this.handleOwnerChange} />
                    </div>

                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormOwnerLastName"> Nom du propriétaire : </label>
                        <FormControl type="text" name="lastName" id="RentReceiptFormOwnerLastName" value={this.state.owner.lastName} onChange={this.handleOwnerChange} />
                    </div>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="RentReceiptFormOwnerAdress"> Adresse du propriétaire : </label>
                    <textarea className="form-control textarea-autosize" name="adress" id="RentReceiptFormOwnerAdress" value={this.state.owner.adress} onChange={this.handleOwnerChange} />
                </FormGroup>
            </div>
        );
    }

}