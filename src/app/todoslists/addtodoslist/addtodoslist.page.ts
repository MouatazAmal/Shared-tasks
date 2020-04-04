import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoslistService } from '../../services/todoslist.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodoslist.page.html',
  styleUrls: ['./addtodoslist.page.scss'],
})
export class AddtodoslistPage implements OnInit {

  todosList = {
    //id:'', 
    name: '',
    description: '',
    owner: '',
    allowedToRead: [],
    allowedToWrite: [],
  };

  constructor(
    private listService: TodoslistService,
    private router: Router,
    private toastService: ToastService,
    private fireauth: AngularFireAuth,
    private loader: LoaderService
  ) { }

  ngOnInit() {
    this.fireauth.currentUser.then(
      currentUser => {
        this.todosList.owner = currentUser.email;
      });
  }

  addList() {
    this.loader.present();
    this.listService.addList(this.todosList).then(
      () => {
        this.loader.dismiss();
        this.toastService.startToast('TodosList added', 'success');
        this.router.navigate(['todoslists']);
      });
  }
}
