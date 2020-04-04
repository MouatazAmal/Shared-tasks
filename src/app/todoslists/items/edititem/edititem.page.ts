import { ToastService } from './../../../services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { TodoslistService } from 'src/app/services/todoslist.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { Observable, Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.page.html',
  styleUrls: ['./edititem.page.scss'],
})
export class EdititemPage implements OnInit, OnDestroy {

  item$: Observable<Item>;
  itemSubscription: Subscription;
  item: Item = {
    id: '',
    title: '',
    detail: '',
    isDone: false
  }

  constructor(private todoslistService: TodoslistService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private navController: NavController,
    private loader: LoaderService
    ) { }

  ngOnInit() {
    this.loader.present();
    this.item$ = this.todoslistService.getItem(
      this.route.snapshot.paramMap.get('todoslistId'),
      this.route.snapshot.paramMap.get('itemId')
    );
    this.itemSubscription = this.item$.subscribe(item => {
      this.loader.dismiss();
      this.item = item;
    });
  }

  editItem() {
    this.loader.present();
    this.todoslistService.updateItem(
      this.route.snapshot.paramMap.get('todoslistId'),
      this.item
    ).then(() => {
      this.loader.dismiss();
      this.toastService.startToast('Update success', 'success');
      this.navController.back();
    }, () => {
      this.loader.dismiss();
      this.toastService.startToast('Update failed', 'danger');
    });
  }

  ngOnDestroy() {
    if(this.itemSubscription){
    this.itemSubscription.unsubscribe();
    }
  }
}
