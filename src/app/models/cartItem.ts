import { foodItem } from './foodItem';

export class CartItem {

    dateCreated ?: string;
    constructor(public item: foodItem, public quantity: string, public textarea: string) {
        return {
           quantity: this.quantity , textarea: this.textarea , item : this.item
        };
    }
}

