import React from 'react';

import { Tabs, Tab } from 'react-bootstrap';

import { getSessionCookie, setSessionCookie } from "../model/Session";

import { OwnerForm } from './OwnerForm'

import { PropertiesAdmin } from './PropertiesAdmin'

export class OwnerAdmin extends React.Component {
    constructor(props) {
        super(props);
        const owner = getSessionCookie();
        this.state = {
            owner: owner
        }

        this.handleChanges = this.handleChanges.bind(this);
    }

    handleChanges = object => {
        this.setState(prevState => {
            let currentOwner = Object.assign(Object.create(Object.getPrototypeOf(prevState.owner)), prevState.owner);
            currentOwner = object;
            return { owner: currentOwner };
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.owner !== this.state.owner) || (prevState.owner !== this.state.owner)) {
            fetch(`${process.env.REACT_APP_RENT_RECEIPT_API_URL}owners/${this.state.owner.ID}`, {
                method: 'PUT',
                body: JSON.stringify(this.state.owner)
            })
                .then(
                    (result) => {
                        result.json()
                        .then((data) => {
                            setSessionCookie(data);
                        })
                        
                    },

                    (error) => {
                        console.error(error);
                    }
                );
        }
    }

    render() {
        return (
            <Tabs defaultActiveKey="owner">
                <Tab eventKey="owner" title="Propriétaire">
                    <OwnerForm owner={this.state.owner} handleChanges={this.handleChanges} />
                </Tab>
                <Tab eventKey="properties" title="Biens">
                    <PropertiesAdmin />
                </Tab>
            </Tabs>
        );
    }
}