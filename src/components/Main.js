import React, { Component } from "react";
import pdfMake from "pdfmake/build/pdfmake";

import { Container, Navbar, NavbarBrand, Jumbotron } from 'react-bootstrap';

import RentReceiptForm from "./RentReceiptForm";
import Receipt from "../model/Receipt";
import { getDocumentDefinition } from './RentReceiptDocument';


class Main extends Component {
    constructor(props) {
        super(props);
        const today = new Date();
        let receipt = new Receipt(
            "Jonathan",
            "BEAUCOUSIN",
            "13 rue tadhomme\n76620 Le Havre\nFrance",
            "Léa",
            "LIMOGES",
            "4ème étage\n187 rue de verdun\n76600 Le havre\nFrance",
            today,
            today,
            today,
            450,
            0
        );

        this.state = {
            receipt: receipt,
        }
    }

    onReceiptChange = receipt => {
        this.setState({ receipt: receipt });
        this.reloadPdf();
        
    }

    reloadPdf() {
        const pdfDocGenerator = pdfMake.createPdf(getDocumentDefinition(this.state.receipt));
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

            <div className="row">
                <Jumbotron className="content col-sm-6">
                    <RentReceiptForm receipt={this.state.receipt} onReceiptChange={this.onReceiptChange} />
                </Jumbotron>

                <div className="col-sm-6" width="100%" id="iframePdf" />
            </div>
            </Container>
        );
    }
}

export default Main;