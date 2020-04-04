import { TodosList } from './../../../models/todosList.model';
import { ToastService } from './../../../services/toast.service';
import { TodoslistService } from 'src/app/services/todoslist.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { combineLatest } from 'rxjs';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-showitem',
  templateUrl: './showitem.page.html',
  styleUrls: ['./showitem.page.scss'],
})
export class ShowitemPage implements OnInit, OnDestroy {

  item$: Observable<Item>;
  todoslist$: Observable<TodosList>;
  combineLatestSubscription: Subscription;
  reminderSubscription: Subscription;
  currentTodoslistId: string;
  currentItemId: string;
  item: Item = {
    title: '',
    detail: '',
    isDone: false
  }
  isWriteAutorisation = false;

  constructor(private route: ActivatedRoute,
    private todoslistService: TodoslistService,
    private toastService: ToastService,
    private navigationController: NavController,
    private fireauth: AngularFireAuth,
    private datePicker: DatePicker,
    private localNotifications: LocalNotifications,
    private router: Router,
    private zone: NgZone,
    private loader: LoaderService) { 

      this.localNotifications.on('click').subscribe(
        notifData => {
          this.zone.run(
            () => {
              this.router.navigateByUrl(notifData.data.itemUrl);
            });
        });

    }

  ngOnInit() {
    this.loader.present();
    
    this.currentTodoslistId = this.route.snapshot.paramMap.get('todoslistId')
    this.currentItemId = this.route.snapshot.paramMap.get('itemId')
    this.item$ = this.todoslistService.getItem(
      this.currentTodoslistId,
      this.currentItemId
    );

    this.todoslist$ = this.todoslistService.getTodosList(this.currentTodoslistId);

    this.combineLatestSubscription = combineLatest(this.item$, this.todoslist$).subscribe(
      data => {
        this.loader.dismiss();
        this.item = data[0];
        this.fireauth.currentUser.then(
          currentUser => {
            this.isWriteAutorisation = data[1].allowedToWrite.includes(currentUser.email) || data[1].owner == currentUser.email;
          });
      });
  }

  onDelete() {
    this.loader.present();
    this.todoslistService.deleteItem(this.item.idl, this.item).then(
      () => {
        this.loader.dismiss();
        this.toastService.startToast('Item Delete success', 'success');
      }, () => {
        this.loader.dismiss();
        this.toastService.startToast('Item Delete failed', 'danger');
      });
    this.navigationController.back();
  }

  onReminder() {
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(
      date => {
        const dateNow = new Date(Date.now());
        if (dateNow < date) {
          this.localNotifications.schedule({
            text: 'Reminder:' + this.item.title,
            trigger: { at: date },
            data: {itemUrl: '/todoslists/' + this.currentTodoslistId + '/' + this.currentItemId},
            led: '8107bc',
          });
          this.toastService.startToast('Reminder set success', 'success');
        } else {
          this.toastService.startToast('Date must be posterior to actual date', 'danger');
        }
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  ngOnDestroy() {
    if (this.combineLatestSubscription) {
      this.combineLatestSubscription.unsubscribe();
    }
    if (this.reminderSubscription) {
      this.reminderSubscription.unsubscribe();
    }
  }

}
