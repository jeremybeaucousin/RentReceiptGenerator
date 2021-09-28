import React from 'react';

import { Button, Modal, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';

export class ConfirmationModal extends React.Component {

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <ModalTitle>Confirmation</ModalTitle>
                </Modal.Header>

                <ModalBody>
                    Etes vous sur de vouloir supprimer cette élément ?
                    </ModalBody>

                <ModalFooter>
                    <Button variant="secondary" onClick={this.props.closeModal}>Annuler</Button>
                    <Button variant="primary" onClick={this.props.handleValidate}>Valider</Button>
                </ModalFooter>
            </Modal>
        );
    }
}