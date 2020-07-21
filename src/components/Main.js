import React, { Component } from "react";

import { Container, Navbar, NavbarBrand, Jumbotron } from 'react-bootstrap';
import { PDFViewer, BlobProvider } from '@react-pdf/renderer';

import RentReceiptForm from "./RentReceiptForm";
import MyDocument from "./RentReceiptDocument";
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

                {/* <BlobProvider document={MyDocument({ receipt: this.state.receipt })}>
                    {({ url }) => <iframe src={url} style={{ width: '100%', height: '1100px' }} />}
                </BlobProvider> */}
                
                <PDFViewer width="100%" height="1100">
                    <MyDocument receipt={this.state.receipt} />
                </PDFViewer>
            </Container>
        );
    }
}

export default Main;