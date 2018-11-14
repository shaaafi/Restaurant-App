// tslint:disable-next-line:class-name
export class foodItem {
    public id?: string;
    constructor(public name: string, public price: string, public category: string, public img: string) {
        return {
            name: name,
            price: price,
            category: category,
            img: img
        };
    }
}


