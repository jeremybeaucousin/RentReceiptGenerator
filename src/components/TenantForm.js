import React from 'react';

import { FormGroup, FormControl, Row } from 'react-bootstrap';

export class TenantForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleTenantChange = props.handleTenantChange;
    }

    render() {
        return (
            <div>
                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="firstName"> Prénom du locataire : </label>
                        <FormControl type="text" name="firstName" id="firstName" value={this.props.tenant.firstName} onChange={this.handleTenantChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="lastName"> Nom du locataire : </label>
                        <FormControl type="text" name="lastName" id="lastName" value={this.props.tenant.lastName} onChange={this.handleTenantChange} />
                    </div>
                </FormGroup>

                <FormGroup >
                    <label htmlFor="adresse"> Adresse du locataire : </label>
                    <textarea className="form-control textarea-autosize" name="adress" id="adresse" value={this.props.tenant.adress} onChange={this.handleTenantChange} />
                </FormGroup>
            </div>
        );
    }

}