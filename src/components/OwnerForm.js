import React from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';

export class OwnerForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = props.handleChange
    }

    render() {
        return (
            <div>
                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormOwnerFirstName"> Prénom du propriétaire : </label>
                        <FormControl type="text" name="owner.firstName" id="RentReceiptFormOwnerFirstName" value={this.props.owner.firstName} onChange={this.handleChange} />
                    </div>

                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormOwnerLastName"> Nom du propriétaire : </label>
                        <FormControl type="text" name="owner.lastName" id="RentReceiptFormOwnerLastName" value={this.props.owner.lastName} onChange={this.handleChange} />
                    </div>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="RentReceiptFormOwnerAdress"> Adresse du propriétaire : </label>
                    <textarea className="form-control textarea-autosize" name="owner.adress" id="RentReceiptFormOwnerAdress" value={this.props.owner.adress} onChange={this.handleChange} />
                </FormGroup>
            </div>
        );
    }

}