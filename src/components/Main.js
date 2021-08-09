import React, { Component } from "react";
import pdfMake from "pdfmake/build/pdfmake";

import { Container, Navbar, NavbarBrand, Jumbotron } from 'react-bootstrap';

import RentReceiptForm from "./RentReceiptForm";
import Receipt from "../model/Receipt";
import { getDocumentDefinition } from '../model/RentReceiptDocument';


class Main extends Component {
    constructor(props) {
        super(props);
        const today = new Date();
        let receipts = [
            new Receipt(
                "Jonathan",
                "BEAUCOUSIN",
                "13 rue tadhomme\n76620 Le Havre\nFrance",
                "Léa",
                "LIMOGES",
                "4ème étage\n187 rue de verdun\n76600 Le havre\nFrance",
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
                "L'enculé",
                "QuiMeDonnePasLesInfos",
                "Rue de la partouze",
                "La Meuf",
                "NOM à la CON",
                "Nulle part",
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

                <div className="row">
                    <Jumbotron className="content col-sm-6">
                        <RentReceiptForm currentReceipt={this.state.currentReceipt} onReceiptChange={this.onReceiptChange} />
                    </Jumbotron>

                    <div className="col-sm-6" width="100%" id="iframePdf" />
                </div>
            </Container>
        );
    }
}

export default Main;