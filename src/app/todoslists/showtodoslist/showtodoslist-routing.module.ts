import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowtodoslistPage } from './showtodoslist.page';

const routes: Routes = [
  {
    path: '',
    component: ShowtodoslistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowtodoslistPageRoutingModule {}
