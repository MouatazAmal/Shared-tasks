import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowitemPage } from './showitem.page';

const routes: Routes = [
  {
    path: '',
    component: ShowitemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowitemPageRoutingModule {}
