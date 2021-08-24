import React from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';

import Tenants from '../../data/Tenants.json';

export class TenantList extends React.Component {
    constructor(props) {
        super(props);
        this.handleChanges = props.handleChanges;
        this.state = {
            tenants: []
        };
    }

    handleTenantSelection = event => {
        let value = event.target.value;
        this.setState(prevState => {
            let currentReceipt = this.props.currentReceipt;
            currentReceipt = this.props.receipts[value];
            this.handleChanges(currentReceipt);
            return { currentReceipt };
        });
    }

    componentDidMount() {
        // fetch("https://fairestdb.p.rapidapi.com/friend/friendModel", {
        //     "method": "GET",
        //     "headers": {
        //         "x-rapidapi-host": "fairestdb.p.rapidapi.com",
        //         "x-rapidapi-key": API_KEY
        //     }
        // })
        // .then(response => response.json())
        // .then(response => {
        //     this.setState({
        //         friends: response
        //     })
        // })
        // .catch(err => {
        //     console.log(err);
        // });
        this.setState({
            tenants: Tenants
        })
    }

    listReceipts() {
        return this.state.tenants.map((tenant, index) =>
            <option key={index} value={index}>
                {tenant.lastName} {tenant.firstName}
            </option>
        );
    }

    render() {
        return (
            <FormGroup className="row">
                <div className="col-sm-6">
                    <label htmlFor="RentReceiptTenants"> Choix du locataire : </label>
                    <FormControl id="RentReceiptTenants" as="select" onChange={this.handleTenantSelection} custom>
                        {this.listReceipts()}
                    </FormControl>
                </div>
            </FormGroup>
        );
    }
}