import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import { convertDateToDisplayedString, convertDateToStringInputWithSeparator } from "../utils/DateUtils";

export function getDocumentDefinition(receipt) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const dateTransmission = convertDateToDisplayedString(receipt.dateTransmission);
  const periodeStart = convertDateToDisplayedString(receipt.periodeStart);
  const periodeEnd = convertDateToDisplayedString(receipt.periodeEnd);
  const dueDate = convertDateToDisplayedString(receipt.dueDate);
  return {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    styles: {
      table: {
        width: "auto"
      }
    },
    content: [
      '\n\n\n',
      {
        text: 'Avis d\'échéance',
        fontSize: 30,
        alignment: 'center'
      },
      '\n\n\n',
      {
        text: `Avis d\'échéance émis le ${dateTransmission}`,
        alignment: 'right'
      },
      '\n\n\n',
      {
        columns: [
          [
            {
              text: 'Propriétaire',
              alignment: 'left',
              bold: true,
              decoration: 'underline',
            },
            {
              text: `${receipt.ownerFirstName} ${receipt.ownerLastName}\n${receipt.ownerAdress}`,
              alignment: 'left',
            }
          ],
          [
            {
              text: 'Locataire',
              alignment: 'right',
              bold: true,
              decoration: 'underline',
            },
            {
              text: `${receipt.tenantFirstName} ${receipt.tenantLastName}\n${receipt.adress}`,
              alignment: 'right',
            }
          ]
        ]
      },
      {
        width: 'auto',
        headerRows: 1,
        widths: [ '100%', '100%' ],
        margin: [ 70, 100 ],
        table: {
          dontBreakRows: true,
          body: [
            [
              { text: 'Adresse du bien' },
              { text: 'Adresse logement' },
            ],
            [
              { text: 'Loyer mensuel contractuel' },
              { text: `${receipt.rent} €` },
            ],
            [
              { text: 'Charges mensuelles contractuelles' },
              { text: `${receipt.charges} €` },
            ],
            [
              { text: 'Période concerné' },
              { text: `Du ${periodeStart} au ${periodeEnd}` },
            ],
            [
              { text: 'Somme due' },
              { text: `${(receipt.rent + receipt.charges)} €` },
            ],
            [
              { text: 'Date d\'exigibilité' },
              { text: `Au plus tard le ${dueDate}` },
            ]
          ]
        }
      },
      {
        text: 'Rappels importants',
        alignment: 'left',
        bold: true,
        decoration: 'underline',
      },
      {
        ul: [
          'Cet avis d\'échéance ne vaut pas quittance',
        ]
      },
    ]
  };
}

export function pdfMakeTable(receipt) {
  return pdfMake.createPdf(getDocumentDefinition(receipt)).download(`avis_echeance_${convertDateToStringInputWithSeparator(receipt.dateTransmission, "_")}`);
}