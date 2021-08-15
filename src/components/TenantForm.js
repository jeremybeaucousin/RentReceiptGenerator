import React from 'react';

import { FormGroup, FormControl, Row } from 'react-bootstrap';

export class TenantForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = props.handleChange;
    }

    render() {
        return (
            <div>
                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormTenantFirstName"> Prénom du locataire : </label>
                        <FormControl type="text" name="tenant.firstName" id="RentReceiptFormTenantFirstName" value={this.props.tenant.firstName} onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="RentReceiptFormTenantLastName"> Nom du locataire : </label>
                        <FormControl type="text" name="tenant.lastName" id="RentReceiptFormTenantLastName" value={this.props.tenant.lastName} onChange={this.handleChange} />
                    </div>
                </FormGroup>

                <FormGroup >
                    <label htmlFor="RentReceiptFormTenantAdresse"> Adresse du locataire : </label>
                    <textarea className="form-control textarea-autosize" name="tenant.adress" id="RentReceiptFormTenantAdresse" value={this.props.tenant.adress} onChange={this.handleChange} />
                </FormGroup>
            </div>
        );
    }

}