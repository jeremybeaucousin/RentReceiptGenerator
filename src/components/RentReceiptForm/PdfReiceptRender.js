import React from 'react';

import { Col } from 'react-bootstrap';

import { getDocumentDefinition } from '../../model/RentReceiptDocument';
import pdfMake from "pdfmake/build/pdfmake";


export class PdfReiceptRender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentReceipt: props.currentReceipt
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.currentReceipt !== this.state.currentReceipt) || (prevState.currentReceipt !== this.state.currentReceipt)) {
            this.setState((state, props) => {
                return { currentReceipt: props.currentReceipt };
            });
        }
    }

    loadPdf() {
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
        this.loadPdf();
        return (
            <Col width="100%" sm="6" id="iframePdf" />
        );
    }

}