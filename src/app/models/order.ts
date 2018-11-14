import { Order } from './orderItem';

export class OrderName {
    constructor(public name: string, public time: number, public uid: string) {
        return {
            name: this.name,
            time: this.time,
            uid: this.uid
        };
    }
}

export class Orders {


    constructor(public orders: Order[]) {

    }

    getOrders() {
        // tslint:disable-next-line:prefer-const
        let orderNames: OrderName[] = [];
        for (const i of this.orders) {
            orderNames.push(new OrderName(i.shippingAddress.name, i.time, i.uid));
        }

        return orderNames;

    }


}



