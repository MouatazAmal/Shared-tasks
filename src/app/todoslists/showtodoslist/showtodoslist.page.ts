import { LoaderService } from './../../services/loader.service';
import { UserService } from './../../services/user.service';
import { TodosList } from '../../models/todosList.model';
import { SharingtodoslistComponent } from '../sharingtodoslist/sharingtodoslist.component';
import { ToastService } from '../../services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoslistService } from 'src/app/services/todoslist.service';
import { Observable, Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { Item } from 'src/app/models/item.model';
import { User } from 'src/app/models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Component({
  selector: 'app-showtodo',
  templateUrl: './showtodoslist.page.html',
  styleUrls: ['./showtodoslist.page.scss'],
})
export class ShowtodoslistPage implements OnInit, OnDestroy {

  todosList$: Observable<TodosList>;
  item$: Observable<Array<Item>>;
  todoslistSubscription: Subscription;
  todosList: TodosList = {
    id: '',
    name: '',
    description: '',
    owner: '',
    allowedToRead: [],
    allowedToWrite: []
  };
  todoslistOwner: User = {
    uid: '',
    fullName: '',
    email: '',
    pictureUrl: ''
  }
  isTodoLoaded = false;
  isWriteAutorisation = false;
  isDelAutorisation = false;

  constructor(
    private todoslistService: TodoslistService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private modalController: ModalController,
    private userService: UserService,
    private fireauth: AngularFireAuth,
    private loader: LoaderService
  ) { }

  ngOnInit() {
    this.loader.present();
    this.todosList$ = this.todoslistService.getTodosList(this.route.snapshot.paramMap.get('todoslistId'));

    this.fireauth.currentUser.then(
      currentUser => {
        this.todoslistSubscription = this.todosList$.subscribe(
          todosList => {
            if (todosList.name) {
              this.todosList = todosList;
              this.isTodoLoaded = true;
              this.isWriteAutorisation = this.todosList.allowedToWrite.includes(currentUser.email) ? true : false;
              this.isDelAutorisation = this.todosList.owner == currentUser.email;
              this.item$ = this.todoslistService.getTodosListItems(this.todosList.id);
              this.userService.getUserByEmail(todosList.owner).then(
                fetchedUser => {
                  this.todoslistOwner = fetchedUser;
                });
            }
            this.loader.dismiss();
          });
      });
  }

  onDelete() {
    this.loader.present();
    this.todoslistService.deleteList(this.todosList).then(
      () => {
        this.loader.dismiss();
        this.toastService.startToast('Delete success', 'success');
      }, () => {
        this.loader.dismiss();
        this.toastService.startToast('Delete failed', 'danger');
      });
    this.router.navigateByUrl('/todoslists');
  }

  onShare() {
    this.modalController.create({
      component: SharingtodoslistComponent,
      componentProps: { treatedTodoList: this.todosList }
    }).then(modalEl => {
      modalEl.present();
    });
  }

  onDeleteItem(item: Item) {
    this.loader.present();
    this.todoslistService.deleteItem(this.todosList.id, item).then(
      () => {
        this.loader.dismiss();
        this.toastService.startToast('Item Delete success', 'success');
      }, () => {
        this.loader.dismiss();
        this.toastService.startToast('Item Delete failed', 'danger');
      });
  }

  ngOnDestroy() {
    if(this.todoslistSubscription){
      this.todoslistSubscription.unsubscribe();
    }
  }

}
