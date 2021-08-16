import React from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';

export class OwnerForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleOwnerChange = props.handleOwnerChange;
        this.state = {
            owner : props.owner
        }
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