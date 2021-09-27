import React from 'react';

import { Tabs, Tab, Form, Button, Modal, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';

import { getSessionCookie, setSessionCookie, clearSession } from "../model/Session";

import { OwnerForm } from './OwnerForm'

import { PropertiesAdmin } from './PropertiesAdmin'

const REICEPT_API_URL = process.env.REACT_APP_RENT_RECEIPT_API_URL;
export class OwnerAdmin extends React.Component {
    constructor(props) {
        super(props);
        const owner = getSessionCookie();
        this.state = {
            owner: owner,
            showModal: false,

        }

        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
    }

    handleChanges = object => {
        this.setState(prevState => {
            let currentOwner = Object.assign(Object.create(Object.getPrototypeOf(prevState.owner)), prevState.owner);
            currentOwner = object;
            return { owner: currentOwner };
        });
    }

    handleSubmit(event) {
        this.setState({
            showModal: true
        });
        event.preventDefault()
    }

    handleValidate(event) {
        fetch(`${REICEPT_API_URL}owners/${this.state.owner.ID}`, {
            method: 'PUT',
            body: JSON.stringify(this.state.owner)
        })
            .then(
                (result) => {
                    console.log(result);
                    result.json()
                        .then((data) => {
                            clearSession();
                            this.closeModal();
                            window.location.reload();
                        })

                },

                (error) => {
                    console.error(error);
                }
            );
    }

    closeModal() {
        this.setState({
            showModal: false
        });
    }

    render() {
        return (
            <>
                <Tabs defaultActiveKey="owner">
                    <Tab eventKey="owner" title="Propriétaire">
                        <Form onSubmit={this.handleSubmit}>
                            <OwnerForm owner={this.state.owner} handleChanges={this.handleChanges} />
                            <Button variant="primary" type="submit">
                                Enregistrer
                        </Button>
                        </Form>
                    </Tab>
                    <Tab eventKey="properties" title="Biens">
                        <PropertiesAdmin />
                    </Tab>
                </Tabs>

                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <ModalTitle>Enregistrement des informations du propriétaire</ModalTitle>
                    </Modal.Header>

                    <ModalBody>
                        <p>Cette action necessite de vous deconnecter</p>
                        <p>Etes vous certains de vouloir enregistrer ?</p>
                        <p>(vous serez deconnecter automatiquement à la validation)</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="secondary" onClick={this.closeModal}>Annuler</Button>
                        <Button variant="primary" onClick={this.handleValidate}>Valider</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}