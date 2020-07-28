import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import { convertDateToDisplayedString, convertDateToStringInputWithSeparator } from "../utils/DateUtils";

export function getDocumentDefinition(receipt) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const dateTransmission = convertDateToDisplayedString(receipt.dateTransmission);
  const periodeStart = convertDateToDisplayedString(receipt.periodeStart);
  const periodeEnd = convertDateToDisplayedString(receipt.periodeEnd);
  const paidDate = convertDateToDisplayedString(receipt.paidDate);
  return {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    styles: {
      table: {
        width: "auto"
      },
      payment: {        
        alignment: 'center',
        fontSize: 16,
      }
    },
    content: [
      '\n\n\n',
      {
        text: 'Quittance de loyer',
        fontSize: 30,
        alignment: 'center'
      },
      '\n\n\n',
      {
        text: `Quittance de loyer émis le ${dateTransmission}`,
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
              text: `${receipt.tenantFirstName} ${receipt.tenantLastName}\n${receipt.tenantAdress}`,
              alignment: 'right',
            }
          ]
        ]
      },
      '\n\n\n',
      {
        text: 'Adresse du bien',
        alignment: 'center',
        bold: true,
        decoration: 'underline',
      },
      {
        text: `${receipt.adress}`,
        alignment: 'center',
      },
      {
        width: 'auto',
        headerRows: 1,
        widths: ['100%', '100%'],
        margin: [70, 80],
        table: {
          dontBreakRows: true,
          body: [
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
              { text: 'Loyer charge comprise' },
              { text: `${(receipt.rent + receipt.charges)} €` },
            ]
          ]
        }
      },
      {
        text: [
          {
            text: `${receipt.amountPaid} € `,
            style: "payment",
            bold: true,
          },
          {
            text: "payé par le locataire le ",
            style: "payment"
          },
          {
            text: `${paidDate}`,
            style: "payment",
            bold: true,
          }
        ]
      }
    ]

  };
}

export function pdfMakeTable(receipt) {
  return pdfMake.createPdf(getDocumentDefinition(receipt)).download(`quittance_loyer_${convertDateToStringInputWithSeparator(receipt.dateTransmission, "_")}`);
}