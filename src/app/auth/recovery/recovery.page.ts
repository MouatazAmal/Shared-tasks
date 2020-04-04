import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {

  email: string = '';

  constructor(private toastService: ToastService,
    private router: Router,
    private fireauth: AngularFireAuth,
    private loader: LoaderService) { }


  ngOnInit() { }

  resetPassword() {
    this.loader.present();
    this.fireauth.sendPasswordResetEmail(this.email).then(
      () => {
        this.toastService.startToast('Password reset mail sent, Redirecting...', 'success');
        setTimeout(() => 2000);
        this.loader.dismiss();
        this.router.navigateByUrl('/auth');
      }, error => {
        throw error;
      }
    )
  }

}
