import { TodosList } from '../../models/todosList.model';
import { ToastService } from '../../services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TodoslistService } from 'src/app/services/todoslist.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-edittodo',
  templateUrl: './edittodoslist.page.html',
  styleUrls: ['./edittodoslist.page.scss'],
})
export class EdittodoslistPage implements OnInit, OnDestroy {

  todosList$: Observable<TodosList>;
  subscription: Subscription;
  todosList: TodosList = {
    id: '',
    name: '',
    description: '',
    owner: '',
    allowedToRead: [],
    allowedToWrite: []
  };

  constructor(
    private todoslistService: TodoslistService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router,
    private loader: LoaderService
  ) { }

  ngOnInit() {
    this.loader.present();
    this.todosList$ = this.todoslistService.getTodosList(this.route.snapshot.paramMap.get('todoslistId'));

    this.subscription = this.todosList$.subscribe(todosList => {
      this.todosList = todosList;
      this.loader.dismiss();
    });
  }

  editTodo() {
    this.loader.present();
    this.todoslistService.updateList(this.todosList).then(
      () => {
        this.loader.dismiss();
        this.toastService.startToast('Update success', 'success');
        this.router.navigate(['todoslists', this.todosList.id]);
      }, () => {
        this.loader.dismiss();
        this.toastService.startToast('Update failed', 'danger');
      });
  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
