import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file.service';
import { finalize } from 'rxjs/operators';
import { foodItem } from '../../models/foodItem';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FoodsService } from '../../services/foods.service';


@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.page.html',
  styleUrls: ['./admin-product-form.page.scss'],
})
export class AdminProductFormPage implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  name: string = '';
  price = '';
  // tslint:disable-next-line:no-inferrable-types
  category: string = '';
  // tslint:disable-next-line:no-inferrable-types
  file$: Observable<string> ;
  fileLink: string ;
  task: any ;

  constructor(private fupload: UploadFileService, private foodService: FoodsService) {

   }

  ngOnInit() {
  }

  fileUpload(ev) {
    const file: HTMLInputElement = ev.target.files[0];
   this.task = this.fupload.uploadFile(file);
   this.task.snapshotChanges().pipe(
    finalize(() => this.file$ = this.fupload.ref.getDownloadURL() )
    )
    .subscribe();
  }

  save() {
    this.file$.subscribe(r => {
      this.fileLink = r;

     this.foodService.addItem(new foodItem(this.name, this.price, this.category, this.fileLink));
    });

  }



}
