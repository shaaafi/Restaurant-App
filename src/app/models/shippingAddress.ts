export class ShippingAddress {
    // tslint:disable-next-line:max-line-length
    constructor(public name: string , public home: string,  public flat: string, public road: string, public region: string, public district: string, public division: string) {
        return {
            name: this.name,
            home: this.home,
            flat: this.flat,
            road: this.road,
            region: this.region,
            district: this.district,
            division: this.division
        };
    }
}
