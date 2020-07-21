import React from 'react';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

let LOADING = false;

export default class RentReceiptDocument extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      receipt: this.props.receipt,
    };
  }

  styles = StyleSheet.create({

    titleContainer: {
      flexDirection: 'row',
      marginTop: 24,
    },
    reportTitle: {
      color: '#61dafb',
      letterSpacing: 4,
      fontSize: 25,
      textAlign: 'center',
      textTransform: 'uppercase',
    }
  });

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.receipt !== this.props.receipt) {
      this.setState({
        receipt: this.props.receipt
      });
    }
  }

  componentDidMount() {
    this.setState({
      receipt: this.props.receipt
    });

    this.setState({ ready: false });
    setTimeout(() => {
      this.setState({ ready: true });
    }, 1);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !LOADING
  }

  render() {
    console.log(this.state.receipt);
    return (
      <Document onRender={() => { LOADING = false; }}>
        <Page size="A4" style={this.styles.page} wrap={false}>
          <View style={this.styles.section}>
            <Text >{this.state.receipt.ownerFirstName}</Text>
            <Text >{this.state.receipt.ownerLastName}</Text>
            <Text >{this.state.receipt.tenantFirstName}</Text>
            <Text >{this.state.receipt.tenantLastName}</Text>
            <Text >{this.state.receipt.adresse}</Text>
            <Text >{this.state.receipt.dateTransmission}</Text>
            <Text >{this.state.receipt.periodeStart}</Text>
            <Text >{this.state.receipt.periodeEnd}</Text>
            <Text >{this.state.receipt.rent}</Text>
            <Text >{this.state.receipt.charges}</Text>
          </View>
          <View style={this.styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    );
  }
}