import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private itemsCollection: AngularFirestoreCollection<User>;
  items: Observable<User[]>;
  private itemDoc: AngularFirestoreDocument<User>;
  item: Observable<User>;

  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<User>('users');
   }

  getUsers(): Observable<User[]> {
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }

  getUser(uid: string) {
    this.itemDoc = this.afs.doc<User>('users/' + uid);
    this.item = this.itemDoc.valueChanges();
    return this.item;
  }

  addUser(user: User, uid: string) {
    this.itemDoc = this.afs.doc<User>('users/' + uid);
    return this.itemDoc.set(user);
  }

}
