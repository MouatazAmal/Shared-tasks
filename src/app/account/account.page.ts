import { LoaderService } from './../services/loader.service';
import { ToastService } from './../services/toast.service';
import { UserService } from './../services/user.service';
import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import 'firebase/storage';
import { storage } from 'firebase';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  user: User = {
    id: '',
    uid: '',
    fullName: '',
    email: '',
    pictureUrl: ''
  }

  constructor(private userService: UserService,
    private camera: Camera,
    private toastService: ToastService,
    private fireauth: AngularFireAuth,
    private loader: LoaderService) { }

  ngOnInit() {
    this.loader.present();

    this.fireauth.currentUser.then(
      currentUser => {
        this.userService.getUser(currentUser.uid).then(
          fetchedUser => {
            if (fetchedUser) {
              this.user.id = fetchedUser.id;
              this.user.uid = fetchedUser.uid;
              this.user.fullName = fetchedUser.fullName;
              this.user.email = fetchedUser.email;
              this.user.pictureUrl = fetchedUser.pictureUrl;
              this.loader.dismiss();
            }
          });
      });
  }

  async changePicture() {
    this.loader.present();
    try {
      const options: CameraOptions = {
        quality: 70,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      };
      const result = await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;
      const pictures = storage().ref(`pictures/${this.user.id}`);
      await pictures.putString(image, 'data_url');
      pictures.getDownloadURL().then(
        url => {
          this.user.pictureUrl = url;
          this.userService.update(this.user);
          this.toastService.startToast('Profile picture set successfully', 'success');
          this.loader.dismiss();
        });
    } catch (error) {
      this.toastService.startToast('Error ' + error.message, 'danger');
      throw error;
    }
  }
}
