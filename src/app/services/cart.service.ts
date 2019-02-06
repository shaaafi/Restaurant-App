import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemsCollection: AngularFirestoreCollection<CartItem>;
  items: Observable<CartItem[]>;
  private itemDoc: AngularFirestoreDocument<CartItem>;
  item: Observable<CartItem>;

  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<CartItem>('carts');
   }

  getCarts(): Observable<CartItem[]> {
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CartItem;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }

  getCart(uuid: string) {
    /*
   this.itemsCollection = this.afs.collection<CartItem>('carts/');
   this.items = this.itemsCollection.valueChanges();
   return this.items;
    */
   return this.afs
      .collection<CartItem>('carts', ref => ref.where('uid', '==', uuid))
      .valueChanges();
  }

  addCart(cart: CartItem) {
   this.itemsCollection = this.afs.collection<CartItem>('carts/');
   this.itemsCollection.add(cart);
  }

}
