export default class Receipt {
    constructor(ownerFirstName,ownerLastName,tenantFirstName,tenantLastName,adresse,dateTransmission,periodeStart,periodeEnd,rent,charges) {
        this.ownerFirstName = ownerFirstName;
        this.ownerLastName = ownerLastName;
        this.tenantFirstName = tenantFirstName;
        this.tenantLastName = tenantLastName;
        this.adresse = adresse;
        this.dateTransmission = dateTransmission;
        this.periodeStart = periodeStart;
        this.periodeEnd = periodeEnd;
        this.rent = rent;
        this.charges = charges;
      }
}