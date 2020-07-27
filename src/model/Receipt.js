export default class Receipt {
  constructor(
    ownerFirstName,
    ownerLastName,
    ownerAdress,
    tenantFirstName,
    tenantLastName,
    adress,
    dateTransmission,
    periodeStart,
    periodeEnd,
    rent,
    charges,
    dueDate,
  ) {
    this.ownerFirstName = ownerFirstName;
    this.ownerLastName = ownerLastName;
    this.ownerAdress = ownerAdress;
    this.tenantFirstName = tenantFirstName;
    this.tenantLastName = tenantLastName;
    this.adress = adress;
    this.dateTransmission = dateTransmission;
    this.periodeStart = periodeStart;
    this.periodeEnd = periodeEnd;
    this.rent = rent;
    this.charges = charges;
    this.dueDate = dueDate;
  }
}