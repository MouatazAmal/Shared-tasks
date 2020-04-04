import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoslistsPage } from './todoslists.page';

const routes: Routes = [
  {
    path: '',
    component: TodoslistsPage
  },
  {
    path: 'addtodoslist',
    loadChildren: () => import('./addtodoslist/addtodoslist.module').then(m => m.AddtodoslistPageModule)
  },
  {
    path: 'edit/:todoslistId',
    loadChildren: () => import('./edittodoslist/edittodoslist.module').then( m => m.EdittodoslistPageModule)
  },
  {
    path: ':todoslistId',
    children: [
      {
        path: '',
        loadChildren: () => import('./showtodoslist/showtodoslist.module').then( m => m.ShowtodoslistPageModule),
      },
      {
        path: 'additem',
        loadChildren: () => import('./items/additem/additem.module').then( m => m.AdditemPageModule)
      },
      {
        path: 'edititem/:itemId',
        loadChildren: () => import('./items/edititem/edititem.module').then( m => m.EdititemPageModule)
      },
      {
        path: ':itemId',
        loadChildren: () => import('./items/showitem/showitem.module').then( m => m.ShowitemPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoslistsPageRoutingModule {}
