import React, { Component } from "react";

import { Container, Navbar, NavbarBrand, Jumbotron } from 'react-bootstrap';
import { PDFViewer } from '@react-pdf/renderer';

import RentReceiptForm from "./RentReceiptForm";
import RentReceiptDocument from "./RentReceiptDocument";
import Receipt from "../model/Receipt";

class Main extends Component {
    constructor(props) {
        super(props);
        let receipt = new Receipt(
            "Jonathan",
            "BEAUCOUSIN",
            "Léa",
            "LIMOGES",
            "4ème étage\n187 rue de verdun\n76600 Le havre\nFrance",
            "2020-07-02",
            "2020-07-02",
            "2020-07-02",
            450,
            0
        );

        this.state = {
            receipt: receipt
        }
    }

    onReceiptChange = receipt => {
        this.setState({ receipt: receipt });
    }

    render() {
        return (
            <Container>
                <Navbar className="navbar-light bg-light">
                    <NavbarBrand href="#">
                        <h3>Générateur de quittance de loyer</h3>
                    </NavbarBrand>
                </Navbar>

                <Jumbotron className="content">
                    <RentReceiptForm receipt={this.state.receipt} onReceiptChange={this.onReceiptChange} />
                </Jumbotron>

                <PDFViewer width="100%" height="1100">
                    <RentReceiptDocument receipt={this.state.receipt} />
                </PDFViewer>
            </Container>
        );
    }
}

export default Main;