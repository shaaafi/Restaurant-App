import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})

export class UploadFileService {

  public ref: any ;
  constructor(private storage: AngularFireStorage) { }

  uploadFile(file): any {
    const date = new Date();
    const time = date.getTime();
    const filePath = `/foodItem/${time}.jpg`;
     this.ref = this.storage.ref(filePath);
    const task = this.ref.put(file);
    return task;
  }

}
