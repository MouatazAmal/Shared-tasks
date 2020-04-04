import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TodoslistService } from '../services/todoslist.service';
import { Subscription } from 'rxjs';
import { TodosList } from '../models/todosList.model';
import { combineLatest } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-todoslist',
  templateUrl: './todoslists.page.html',
  styleUrls: ['./todoslists.page.scss'],
})
export class TodoslistsPage implements OnInit {

  private todoslistSubscription: Subscription;
  todosLists: TodosList[] = [];
  ownerPicture = '';

  constructor(
    private router: Router,
    private todoslistService: TodoslistService,
    private fireauth: AngularFireAuth,
    private loader: LoaderService
  ) { 
    this.loader.present();
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.fireauth.currentUser.then(
      currentUser => {
        this.todoslistSubscription = combineLatest(
          this.todoslistService.getOwnerTodosList(currentUser.email),
          this.todoslistService.getAllowedToReadTodosList(currentUser.email),
          this.todoslistService.getAllowedToWriteTodosList(currentUser.email)
        ).subscribe(
          data => {
            this.todosLists = data[0].concat(data[1], data[2]);
            this.loader.dismiss();
          });
      });

  }

  onAdd() {
    this.router.navigateByUrl('/todoslists/addtodoslist');
  }

  ionViewWillLeave() {
    if(this.todoslistSubscription){
      this.todoslistSubscription.unsubscribe();
    }
  }

}
