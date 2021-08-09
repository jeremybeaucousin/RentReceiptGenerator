export default class Receipt {
  constructor(
    owner,
    tenant,
    adress,
    dateTransmission,
    periodeStart,
    periodeEnd,
    rent,
    charges,
    amountPaid,
    paidDate,
  ) {
    this.owner = owner;
    this.tenant = tenant;
    this.adress = adress;
    this.dateTransmission = dateTransmission;
    this.periodeStart = periodeStart;
    this.periodeEnd = periodeEnd;
    this.rent = rent;
    this.charges = charges;
    this.amountPaid = amountPaid;
    this.paidDate = paidDate;
  }
}