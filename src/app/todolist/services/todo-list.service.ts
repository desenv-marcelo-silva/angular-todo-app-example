import { Injectable } from '@angular/core';
import todoList from '../mock/todo-list-items';
import { TodoItemInterface } from '../types/todo-item.interface';
import { TodoListInterface } from '../types/todo-list.interface';

@Injectable()
export class TodoListService {
  todos: TodoListInterface = todoList;
  private add(item: TodoItemInterface): void {
    let newId;
    if (this.todos.items.length) {
      newId = +this.todos.items[this.todos.items.length - 1].id + 1;
    } else {
      newId = Math.floor(Math.random() * 1000).toString();
    }
    this.todos.items.push({
      ...item,
      id: newId,
    });
  }

  remove(itemId: number): void {
    if (itemId && itemId > 0) {
      this.todos.items = this.todos.items.filter((item) => item.id !== itemId);
    }
  }

  private update(itemToUpdate: TodoItemInterface): void {
    const idItemToUpdate = this.todos.items.findIndex(
      (item) => item.id == itemToUpdate.id
    );
    if (idItemToUpdate > -1) {
      this.todos.items[idItemToUpdate].description = itemToUpdate.description;
      this.todos.items[idItemToUpdate].done = itemToUpdate.done;
    }
  }

  save(item: TodoItemInterface): void {
    if (item.id && +item.id > 0) {
      this.update(item);
    } else {
      this.add(item);
    }
  }

  list(): TodoItemInterface[] {
    return this.todos.items;
  }
}
