import React, { Component } from "react";
import pdfMake from "pdfmake/build/pdfmake";

import { Container, Row, Col, Navbar, NavbarBrand, Jumbotron } from 'react-bootstrap';

import receipts from '../data/Receipts.json';

import RentReceiptForm from "./RentReceiptForm/RentReceiptForm";
import { getDocumentDefinition } from '../model/RentReceiptDocument';

class Main extends Component {
    constructor(props) {
        super(props);
        const today = new Date();

        receipts.forEach(receipt => {
            receipt.dateTransmission = today;
            receipt.periodeStart = today;
            receipt.periodeEnd = today;
            receipt.paidDate = today;
        })

        this.state = {
            currentReceipt: receipts[0],
            receipts: receipts
        }
    }

    onReceiptChange = currentReceipt => {
        this.setState({
            currentReceipt: currentReceipt
        });
        this.reloadPdf();
    }

    reloadPdf() {
        const pdfDocGenerator = pdfMake.createPdf(getDocumentDefinition(this.state.currentReceipt));
        pdfDocGenerator.getDataUrl((dataUrl) => {
            const targetElement = document.querySelector('#iframePdf');
            let iframe = targetElement.querySelector('iframe');
            let newIframe = false;
            if (!iframe) {
                newIframe = true;
                iframe = document.createElement('iframe');
                iframe.width = "100%";
                iframe.height = "1100px";
            }
            iframe.src = dataUrl;
            if (newIframe) {
                targetElement.appendChild(iframe);
            }
        }
        );
    }

    render() {
        this.reloadPdf();
        return (
            <Container>
                <header>
                    <Navbar className="row navbar-light bg-light">
                        <NavbarBrand href="#">
                            <h3>Générateur de quittance de loyer</h3>
                        </NavbarBrand>
                    </Navbar>
                </header>
                <Row>
                    <Jumbotron className="content col-sm-6">
                        <RentReceiptForm currentReceipt={this.state.currentReceipt} receipts={this.state.receipts} onReceiptChange={this.onReceiptChange} />
                    </Jumbotron>

                    <Col width="100%" sm="6" id="iframePdf" />
                </Row>
                <footer>
                    <Row className="bg-light">
                        <Col>jeremy.beaucousin@gmal.com</Col>
                        <Col align="right">{process.env.REACT_APP_NAME} <b>V{process.env.REACT_APP_VERSION}</b></Col>
                    </Row>
                </footer>
            </Container >
        );
    }
}

export default Main;