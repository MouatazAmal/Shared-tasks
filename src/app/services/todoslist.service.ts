import { TodosList } from './../models/todosList.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Item } from '../models/item.model';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TodoslistService {

  private todosListCollection: AngularFirestoreCollection<TodosList>;
  private todosList$: Observable<TodosList[]>;

  constructor(private afs: AngularFirestore) {

    this.todosListCollection = afs.collection<TodosList>('todoslist');

    this.todosList$ = this.todosListCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

  }

  addList(todosList: TodosList) {
    return this.todosListCollection.add(todosList);
  }

  deleteList(todosList: TodosList) {
    this.getTodosListItems(todosList.id).pipe(take(1)).subscribe(
      fetchedItems => {
        fetchedItems.map(item => this.deleteItem(todosList.id,item));
      });
      return this.todosListCollection.doc(todosList.id).delete();
  }

  updateList(todosList: TodosList) {
    return this.todosListCollection.doc(todosList.id)
      .set(
        {
          name: todosList.name,
          description: todosList.description,
          allowedToRead: todosList.allowedToRead,
          allowedToWrite: todosList.allowedToWrite
        },
        {
          merge: true
        });
  }

  getTodosLists() {
    return this.todosList$;
  }

  getTodosList(id: string) {
    return this.todosListCollection
      .doc<TodosList>(id)
      .valueChanges()
      .pipe(
        map(data => {
          return { id, ...data };
        })
      );
  }

  getTodosListItems(idl: string): Observable<Array<Item>> {
    return this.todosListCollection
      .doc<TodosList>(idl)
      .collection<Item>('items')
      .valueChanges({ idField: 'id' })
      .pipe(
        map(data => {
          return data.map(dataEl => {
            return { idl, ...dataEl }
          });
        })
      );
  }

  getAllowedToReadTodosList(userEmail: string) {
    return this.afs.collection<TodosList>('todoslist', ref => ref.where('allowedToRead', 'array-contains', userEmail)).valueChanges({ idField: 'id' });
  }

  getAllowedToWriteTodosList(userEmail: string) {
    return this.afs.collection<TodosList>('todoslist', ref => ref.where('allowedToWrite', 'array-contains', userEmail)).valueChanges({ idField: 'id' });
  }

  getOwnerTodosList(userEmail: string) {
    return this.afs.collection<TodosList>('todoslist', ref => ref.where('owner', '==', userEmail)).valueChanges({ idField: 'id' });
  }

  addItem(todosListId: string, item: Item) {
    return this.todosListCollection.doc(todosListId).collection('items').add(item);
  }

  deleteItem(todosListId: string, item: Item) {
    return this.todosListCollection.doc(todosListId).collection('items').doc(item.id).delete();
  }

  updateItem(todosListId: string, item: Item) {
    return this.todosListCollection.doc(todosListId).collection('items').doc(item.id)
      .set(
        {
          title: item.title,
          detail: item.detail,
          isDone: item.isDone
        },
        {
          merge: true
        });
  }

  getItem(todosListId: string, itemId: string): Observable<Item> {
    return this.todosListCollection
      .doc<TodosList>(todosListId)
      .collection('items')
      .doc<Item>(itemId)
      .valueChanges()
      .pipe(
        map(data => {
          return { id: itemId, idl: todosListId, ...data };
        })
      );
  }

}
