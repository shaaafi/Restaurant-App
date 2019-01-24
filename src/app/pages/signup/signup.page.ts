import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, NavController, DomController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit, AfterViewInit {

  @ViewChild('signupCard') private signupCard: ElementRef;

  public name = '';
  public password = '';
  public confirmpassword = '';
  public address = '';
  public email = '';
  // tslint:disable-next-line:max-line-length
  constructor(private afauthService: AuthService, private userService: UserService, public afauth: AngularFireAuth, public toastController: ToastController, private navController: NavController, private domCtrl: DomController, private renderer: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

      this.domCtrl.write(() => {
        this.renderer.addClass(this.signupCard.nativeElement, 'zoomIn');
      });

    }

  signup() {
    this.afauthService.signup(this.email, this.password)
    .then(() => {
      const uid = this.afauth.auth.currentUser.uid;
      const user: User = new User(this.email, uid, this.name, this.address);
      this.userService.addUser(user, uid)
      .then(() => {
        this.presentToast();
        this.navController.navigateBack('/login');
      });
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'User Signed Up !!!',
      duration: 2000
    });
    await toast.present();
  }

}
