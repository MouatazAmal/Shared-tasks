import { Router } from '@angular/router';
import { TodoslistService } from 'src/app/services/todoslist.service';
import { ToastService } from './../../services/toast.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { TodosList } from '../../models/todosList.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharingtodoslist.component.html',
  styleUrls: ['./sharingtodoslist.component.scss'],
})
export class SharingtodoslistComponent implements OnInit, OnDestroy {

  @Input() treatedTodoList: TodosList;
  //managing
  usersSubscription: Subscription;
  users: User[] = [];
  //inputs
  userEmail = '';
  userRole = '';
  //autorisation
  sharingAutorisation = false;

  constructor(private modalController: ModalController,
    private userService: UserService,
    private toastService: ToastService,
    private todoslistService: TodoslistService,
    private fireauth: AngularFireAuth,
    private loader: LoaderService
  ) { }

  ngOnInit() {
    this.loader.present();
    this.usersSubscription = this.userService.getUsers().subscribe(users => {
      this.loader.dismiss();
      this.users = users;
    });

    this.fireauth.currentUser.then(
      currentUser => {
        this.sharingAutorisation = this.treatedTodoList.owner == currentUser.email;
      }
    );
  }

  onClose() {
    this.modalController.dismiss();
  }

  onDelete(userEmailToDel: string, role: string) {
    this.loader.present();
    if (role == 'reader') {
      const arr = this.treatedTodoList.allowedToRead.filter(userEmail => userEmail != userEmailToDel);
      this.treatedTodoList.allowedToRead = arr;
    } else if (role == 'writer') {
      const arr = this.treatedTodoList.allowedToWrite.filter(userEmail => userEmail != userEmailToDel);
      this.treatedTodoList.allowedToWrite = arr;
    }
    this.todoslistService.updateList(this.treatedTodoList).then(
      () => {
        this.loader.dismiss();
        this.toastService.startToast('User Deleted successfully', 'success')
      }, () => {
        this.loader.dismiss();
        this.toastService.startToast('Error can\'t Delete this user', 'danger')
      });
  }

  shareWith() {
    const userToAssign = this.getUserByMail(this.userEmail);

    if (userToAssign) {
      if (this.userRole == 'writer') {
        if (this.treatedTodoList.allowedToRead.find(email => email === userToAssign.email)) {
          this.toastService.startToast('delete this user from readers first', 'danger');
          return;
        } else if (this.treatedTodoList.allowedToWrite.find(email => email === userToAssign.email)) {
          this.toastService.startToast('This user is already a writer', 'danger');
          return;
        } else {
          this.treatedTodoList.allowedToWrite.push(userToAssign.email);
        }
      } else if (this.userRole == 'reader') {
        if (this.treatedTodoList.allowedToWrite.find(email => email === userToAssign.email)) {
          this.toastService.startToast('delete this user from writers first', 'danger');
          return;
        } else if (this.treatedTodoList.allowedToRead.find(email => email === userToAssign.email)) {
          this.toastService.startToast('This user is already a reader', 'danger');
          return;
        } else {
          this.treatedTodoList.allowedToRead.push(userToAssign.email);
        }
      }
      this.loader.present();
      this.todoslistService.updateList(this.treatedTodoList).then(
        () => {
          this.loader.dismiss();
          this.toastService.startToast('User Added successfully', 'success');
        }, () => {
          this.loader.dismiss();
          this.toastService.startToast('Error can\'t Add this user', 'danger');
        });

    } else {
      this.toastService.startToast('Error User does not exist', 'danger');
    }
  }

  getUserByMail(email: string) {
    return this.users.find(user => {
      return user.email == email;
    });
  }

  ngOnDestroy() {
    if(this.usersSubscription){
      this.usersSubscription.unsubscribe();
    }
  }

}
