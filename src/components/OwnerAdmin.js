import React from 'react';

import { Tabs, Tab, Form, Button, Modal, ModalTitle, ModalBody, ModalFooter, FormGroup, Col, Row } from 'react-bootstrap';

import { getSessionCookie, clearSession } from "../model/Session";

import { OwnerForm } from './OwnerForm'

import { PropertiesAdmin } from './PropertiesAdmin'

import { deleteOwner, saveOrUpdateOwner } from '../services/Owner'
import { deleteProperty, getProperties } from '../services/Property';

export class OwnerAdmin extends React.Component {
    constructor(props) {
        super(props);
        const owner = getSessionCookie();
        this.state = {
            owner: owner,
            showModal: false,
            delete: false
        }

        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteOwner = this.handleDeleteOwner.bind(this);
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
            showModal: true,
            delete: false
        });
        event.preventDefault()
    }

    handleDeleteOwner(event) {
        this.setState({
            showModal: true,
            delete: true
        });
        event.preventDefault()
    }

    handleValidate() {
        const callbackResult = () => {
            clearSession();
            this.closeModal();
            window.location.reload();
        }
        if (this.state.delete) {
            // Delete properties before deleting
            const callbackPropertiesResult = (data) => {
                data.forEach(property => deleteProperty(property));
                deleteOwner(this.state.owner, callbackResult);
            }
            getProperties(callbackPropertiesResult)
            this.setState({
                delete: false
            });
        } else {
            saveOrUpdateOwner(this.state.owner, callbackResult);
        }
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
                            <FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <Button variant="primary" type="submit">
                                            Enregistrer
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="danger" onClick={this.handleDeleteOwner}>
                                            Supprimer compte
                                        </Button>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                    </Tab>
                    <Tab eventKey="properties" title="Biens">
                        <PropertiesAdmin />
                    </Tab>
                </Tabs>

                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <ModalTitle>Enregistrement ou suppression</ModalTitle>
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