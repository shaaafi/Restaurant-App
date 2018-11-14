import { ShippingAddress } from './shippingAddress';
import { CartItem } from './cartItem';


export class Order {

    constructor(public shippingAddress: ShippingAddress, public items: CartItem[], public uid: string, public time: number) {

        return {
            shippingAddress: this.shippingAddress,
            items: this.items,
            uid: this.uid,
            time: this.time
        };
    }
}


export interface OrderItem {
     shippingAddress: ShippingAddress;
     items: CartItem[];
     uid: string;
     time: number;
}
