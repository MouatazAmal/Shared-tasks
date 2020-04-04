import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdittodoslistPage } from './edittodoslist.page';

const routes: Routes = [
  {
    path: '',
    component: EdittodoslistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdittodoslistPageRoutingModule {}
