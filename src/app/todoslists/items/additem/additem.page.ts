import { ToastService } from './../../../services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoslistService } from 'src/app/services/todoslist.service';
import { Item } from 'src/app/models/item.model';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.page.html',
  styleUrls: ['./additem.page.scss'],
})
export class AdditemPage implements OnInit {

  item: Item = {
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

  ngOnInit() { }

  addItem() {
    this.loader.present();
    this.todoslistService.addItem(this.route.snapshot.paramMap.get('todoslistId'), this.item).then(
      () => {
        this.loader.dismiss();
        this.toastService.startToast('Item added successfully', 'success');
        this.navController.back();
      }, () => {
        this.loader.dismiss();
        this.toastService.startToast('Item added failed', 'danger');
      });
  }

}
