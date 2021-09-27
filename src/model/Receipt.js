export default class Receipt {
  constructor(
    owner,
    property,
    tenant,
    dateTransmission,
    periodeStart,
    periodeEnd,
    amountPaid,
    paidDate,
  ) {
    this.owner = owner;
    this.property = property;
    this.tenant = tenant;
    this.dateTransmission = dateTransmission;
    this.periodeStart = periodeStart;
    this.periodeEnd = periodeEnd;
    this.amountPaid = amountPaid;
    this.paidDate = paidDate;
  }
}