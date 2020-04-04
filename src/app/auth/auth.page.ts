import { LoaderService } from './../services/loader.service';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { auth } from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  email = '';
  password = '';
  currentUser: firebase.User;
  constructor(private router: Router,
    private toastService: ToastService,
    private userService: UserService,
    private fb: Facebook,
    private fireauth: AngularFireAuth,
    private googlePlus: GooglePlus,
    private loader: LoaderService) { }

  ngOnInit() { }

  eLogin() {
    this.loader.present();
    this.fireauth.signInWithEmailAndPassword(this.email, this.password).then((res) => {
      if (res.user.emailVerified !== true) {
        this.loader.dismiss();
        this.sendVerificationMail();
        this.toastService.startToast('Please validate your email address. Kindly check your inbox.', 'warning');
      } else {
        const tempUser: User = {
          uid: res.user.uid,
          fullName: res.user.displayName,
          email: res.user.email,
          pictureUrl: 'https://firebasestorage.googleapis.com/v0/b/todo-list-dc794.appspot.com/o/profile.png?alt=media&token=f8face8a-5def-4b8c-a05c-f3a2437a95ad'
        };
        this.savingUser(tempUser).then(
          () => {
            this.loader.dismiss();
            this.toastService.startToast('Login success', 'success');
            this.router.navigateByUrl('/todoslists');
          });
      }
    }, error => {
      this.loader.dismiss();
      this.toastService.startToast(error.message, 'danger');
    });
  }

  async gLogin() {
    this.loader.present();
    try {
      const gplusUser = await this.googlePlus.login({
        'scopes': 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': '585159226037-41l720qcvkju3o99m5e7jm1qasud68th.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      });

      this.fireauth.signInWithCredential(
        auth.GoogleAuthProvider.credential(gplusUser.idToken)
      ).then(
        userData => {
          if (userData) {
            const tempUser: User = {
              uid: userData.user.uid,
              fullName: userData.user.displayName,
              email: userData.user.email,
              pictureUrl: userData.user.photoURL
            };
            this.savingUser(tempUser).then(
              () => {
                this.loader.dismiss();
                this.toastService.startToast('Login success', 'success');
                this.router.navigateByUrl('/todoslists');
              });
          }
        }
      );
    } catch (error) {
      this.loader.dismiss();
      this.toastService.startToast('An error occured', 'danger');
      console.log(error);
    }


  }

  fLogin() {
    this.loader.present();
    this.fb.login(['public_profile', 'email'])
      .then(
        (res: FacebookLoginResponse) => {
          //getting token
          const facebookCredential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);

          // Get the connected user details
          this.fb.api("/me?fields=name,email,picture", []).then((user) => {

            const tempUser: User = {
              uid: '',
              fullName: user.name,
              email: user.email,
              pictureUrl: user.picture.data.url
            };

            // => Open user session and redirect to the next page
            this.fireauth.signInWithCredential(facebookCredential)
              .then(userData => {
                tempUser.uid = userData.user.uid;//setting firebase uid
                this.savingUser(tempUser).then(
                  () => {
                    this.loader.dismiss();
                    this.toastService.startToast('Login success', 'success');
                    this.router.navigateByUrl('/todoslists');
                  });
              });
          });
        })
      .catch(e => {
        this.loader.dismiss();
        this.toastService.startToast('Error occured:' + e.message, 'danger');
        throw e;
      });
  }


  sendVerificationMail() {
    return this.fireauth.currentUser.then(
      currentUser => {
        currentUser.sendEmailVerification();
      });
  }

  savingUser(usertoSave: User) {
    return this.userService.getUser(usertoSave.uid).then(fetchedUSer => {
      if (!fetchedUSer) {
        this.userService.addUser(usertoSave);
      }
    },
      error => {
        throw error;
      });
  }

}
