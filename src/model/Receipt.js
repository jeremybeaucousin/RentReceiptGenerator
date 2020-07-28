export default class Receipt {
  constructor(
    ownerFirstName,
    ownerLastName,
    ownerAdress,
    tenantFirstName,
    tenantLastName,
    tenantAdress,
    adress,
    dateTransmission,
    periodeStart,
    periodeEnd,
    rent,
    charges,
    amountPaid,
    paidDate,
  ) {
    this.ownerFirstName = ownerFirstName;
    this.ownerLastName = ownerLastName;
    this.ownerAdress = ownerAdress;
    this.tenantFirstName = tenantFirstName;
    this.tenantLastName = tenantLastName;
    this.tenantAdress = tenantAdress;
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