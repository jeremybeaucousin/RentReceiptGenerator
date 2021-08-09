import React, { Component } from "react";
import pdfMake from "pdfmake/build/pdfmake";

import { Container, Row, Col, Navbar, NavbarBrand, Jumbotron } from 'react-bootstrap';

import RentReceiptForm from "./RentReceiptForm";
import Receipt from "../model/Receipt";
import Owner from "../model/owner";
import Tenant from "../model/tenant";
import { getDocumentDefinition } from '../model/RentReceiptDocument';

class Main extends Component {
    constructor(props) {
        super(props);
        const today = new Date();

        let owner = new Owner(
            "Jonathan",
            "BEAUCOUSIN",
            "13 rue tadhomme\n76620 Le Havre\nFrance"
        );
        let tenant1 = new Tenant(
            "Léa",
            "LIMOGES",
            "4ème étage\n187 rue de verdun\n76600 Le havre\nFrance"
        );
        let tenant2 = new Tenant(
            "La Meuf",
            "NOM à la CON",
            "Nulle part"
        );
        let receipts = [
            new Receipt(
                owner,
                tenant1,
                "4ème étage\n187 rue de verdun\n76600 Le havre\nFrance",
                today,
                today,
                today,
                530,
                0,
                530,
                today
            ),
            new Receipt(
                owner,
                tenant2,
                "Nulle part ailleurs",
                today,
                today,
                today,
                1000000,
                0,
                1000000,
                today
            )
        ]

        let currentReceipt = receipts[0];

        this.state = {
            currentReceipt: currentReceipt,
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
                <Navbar className="row navbar-light bg-light">
                    <NavbarBrand href="#">
                        <h3>Générateur de quittance de loyer</h3>
                    </NavbarBrand>
                </Navbar>

                <Row>
                    <Jumbotron className="content col-sm-6">
                        <RentReceiptForm currentReceipt={this.state.currentReceipt} receipts={this.state.receipts} onReceiptChange={this.onReceiptChange} />
                    </Jumbotron>

                    <Col width="100%" sm="6" id="iframePdf" />
                </Row>
                <footer>
                    <Container>
                        <Row>
                            <Col sm="8">jeremy.beaucousin@gmal.com</Col>
                            <Col align="right">{process.env.REACT_APP_NAME} <b>V{process.env.REACT_APP_VERSION}</b></Col>
                        </Row>
                    </Container>
                </footer>
            </Container>
        );
    }
}

export default Main;