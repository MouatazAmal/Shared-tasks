import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { User } from 'firebase';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private fireauth: AngularFireAuth) {}

canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return new Promise((resolve, reject) => {
            this.fireauth.onAuthStateChanged(
                (user: User) => {
                if (user) {
                    if (this.router.url) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                } else {
                    this.router.navigate(['/auth']);
                    resolve(false);
                }
            });
        });
    }
}
