import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { User } from './../../models/user.model';
import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = {
    uid: '',
    fullName: '',
    email: '',
    pictureUrl: 'https://firebasestorage.googleapis.com/v0/b/todo-list-dc794.appspot.com/o/profile.png?alt=media&token=f8face8a-5def-4b8c-a05c-f3a2437a95ad'
  };

  password = '';

  constructor(private toastService: ToastService,
    private router: Router,
    private fireauth: AngularFireAuth,
    private loader: LoaderService) { }

  ngOnInit() { }

  addUser() {
    this.loader.present();
    this.fireauth.createUserWithEmailAndPassword(this.user.email, this.password).then((res) => {
      this.sendVerificationMail().then(() => {
        res.user.updateProfile({ displayName: this.user.fullName });
        this.toastService.startToast('Account created and Verification email sent Redirecting...', 'success');
        this.router.navigateByUrl('/auth');
        this.loader.dismiss();
      })
    }, error => {
      this.loader.dismiss();
      this.toastService.startToast(error.message, 'danger');
    });
  }

  sendVerificationMail() {
    return this.fireauth.currentUser.then(
      currentUser => {
        currentUser.sendEmailVerification();
      });
  }
}
