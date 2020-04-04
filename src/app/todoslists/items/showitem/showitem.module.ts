import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowitemPageRoutingModule } from './showitem-routing.module';

import { ShowitemPage } from './showitem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowitemPageRoutingModule
  ],
  declarations: [ShowitemPage]
})
export class ShowitemPageModule {}
