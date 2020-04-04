import { SharingtodoslistComponent } from '../sharingtodoslist/sharingtodoslist.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowtodoslistPageRoutingModule } from './showtodoslist-routing.module';

import { ShowtodoslistPage } from './showtodoslist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowtodoslistPageRoutingModule
  ],
  declarations: [ShowtodoslistPage, SharingtodoslistComponent],
  entryComponents:[SharingtodoslistComponent]
})
export class ShowtodoslistPageModule {}
