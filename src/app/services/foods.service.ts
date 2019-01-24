import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,  AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { foodItem } from '../models/foodItem';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FoodsService {

  private itemsCollection: AngularFirestoreCollection<foodItem>;
  items: Observable<foodItem[]>;
  private itemDoc: AngularFirestoreDocument<foodItem>;
  item: Observable<foodItem>;

  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<foodItem>('foodItems');
 }

  getItems(): Observable<foodItem[]> {
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as foodItem;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }

  addItem(food: foodItem) {
    this.itemsCollection.add(food);
  }

  getItem(uid: string) {
    this.itemDoc = this.afs.doc<foodItem>('foodItems/' + uid);
    this.item = this.itemDoc.valueChanges();
    return this.item;
  }

  // tslint:disable-next-line:whitespace
  updateItem(uid: string,updatedItem: foodItem) {
    this.itemDoc = this.afs.doc<foodItem>('foodItems/' + uid);
    return this.itemDoc.update(updatedItem);
  }

  removeItem(uid: string) {
    this.itemDoc = this.afs.doc<foodItem>('foodItems/' + uid);
    return this.itemDoc.delete();
  }

}
