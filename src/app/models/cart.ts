import { CartItem } from './cartItem';
import { foodItem } from './foodItem';

export class Cart {
  constructor(public cartItems: CartItem[]) {}

  totalQuantity() {
    let quantity = 0;
    for (const cart of this.cartItems) {
      quantity += parseInt(cart.quantity, 10);
      // console.log(quantity);
    }
    // console.log('total' + quantity);
    return quantity;
  }

  totalPrice() {
    let price = 0;
    for (const cart of this.cartItems) {
      price += parseInt(cart.quantity, 10) * parseInt(cart.item.price, 10);
    }

    return price;
  }

  individualPrice() {
    const price: number[] = [0];
    for (let i = 0; i < this.cartItems.length; i++) {
      price[i] =
        parseInt(this.cartItems[i].quantity, 10) *
        parseInt(this.cartItems[i].item.price, 10);
      console.log(`price[${i}] : ${price[i]}`);
    }
    return price;
  }
}
