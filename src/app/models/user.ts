export class User {
    public isAdmin ?: boolean;
    constructor(public email: string, public uid: string, public name: string, public address: string ) {
        return {
            email: this.email,
            uid: this.uid,
            name: this.name,
            address: this.address
        };
    }
}
