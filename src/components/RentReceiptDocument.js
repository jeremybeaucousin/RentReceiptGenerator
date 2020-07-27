import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function convertDateToString(date) {
  let string = "";
  console.log(date);
  console.log(date instanceof Date);
  if(date && date instanceof Date) {
      var d = date.getDate();
      var m = date.getMonth() + 1;
      var y = date.getFullYear();
      return `${(d <= 9 ? '0' + d : d)}/${(m<=9 ? '0' + m : m)}/${y}`;
  } 
  return string;
}

export function getDocumentDefinition(receipt) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  console.log(receipt);
  const dateTransmission = convertDateToString(receipt.dateTransmission);
  const periodeStart = convertDateToString(receipt.periodeStart);
  const periodeEnd = convertDateToString(receipt.periodeEnd);
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
        margin: [70, 100  ],
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
              { text: `Au plus tard le ` },
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
  return pdfMake.createPdf(getDocumentDefinition(receipt)).download("avis_echeance");
}