import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdittodoslistPageRoutingModule } from './edittodoslist-routing.module';

import { EdittodoslistPage } from './edittodoslist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdittodoslistPageRoutingModule
  ],
  declarations: [EdittodoslistPage]
})
export class EdittodoslistPageModule {}
