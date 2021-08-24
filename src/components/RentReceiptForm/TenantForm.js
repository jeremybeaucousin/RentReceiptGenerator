import React from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';

export class TenantForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChanges = props.handleChanges;
        this.state = {
            currentReceipt: props.currentReceipt
        };
    }

    handleTenantChange = event => {
        let value = event.target.value;
        const column = event.target.name;
        this.setState(prevState => {
            let currentReceipt = Object.assign({}, prevState.currentReceipt);
            currentReceipt.tenant[column] = value;
            this.handleChanges(currentReceipt);
            return { currentReceipt };
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.currentReceipt !== this.state.currentReceipt) || (prevState.currentReceipt !== this.state.currentReceipt)) {
            this.setState((state, props) => {
                return { currentReceipt: props.currentReceipt };
            });
        }
    }

    render() {
        return (
            <div>
                <FormGroup className="row">
                    <div className="col-sm-6">
                        <label htmlFor="firstName"> Prénom du locataire : </label>
                        <FormControl type="text" name="firstName" id="firstName" value={this.state.currentReceipt.tenant.firstName} onChange={this.handleTenantChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="lastName"> Nom du locataire : </label>
                        <FormControl type="text" name="lastName" id="lastName" value={this.state.currentReceipt.tenant.lastName} onChange={this.handleTenantChange} />
                    </div>
                </FormGroup>

                <FormGroup >
                    <label htmlFor="adresse"> Adresse du locataire : </label>
                    <textarea className="form-control textarea-autosize" name="adress" id="adresse" value={this.state.currentReceipt.tenant.adress} onChange={this.handleTenantChange} />
                </FormGroup>
            </div>
        );
    }

}