import React from 'react';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({

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

const MyDocument = ({receipt}) => (
  <Document>
    <Page size="A4" style={styles.page} wrap={false}>
      <View style={styles.section}>
        <Text >{receipt?.ownerFirstName}</Text>
        <Text >{receipt?.ownerLastName}</Text>
        <Text >{receipt?.tenantFirstName}</Text>
        <Text >{receipt?.tenantLastName}</Text>
        <Text >{receipt?.adresse}</Text>
        <Text >{receipt?.dateTransmission}</Text>
        <Text >{receipt?.periodeStart}</Text>
        <Text >{receipt?.periodeEnd}</Text>
        <Text >{receipt?.rent}</Text>
        <Text >{receipt?.charges}</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;