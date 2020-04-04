import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddtodoslistPageRoutingModule } from './addtodoslist-routing.module';

import { AddtodoslistPage } from './addtodoslist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddtodoslistPageRoutingModule
  ],
  declarations: [AddtodoslistPage]
})
export class AddtodoslistPageModule {}
