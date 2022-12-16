import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListService } from './services/todo-list.service';

@NgModule({
  declarations: [TodoListComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [TodoListComponent],
  providers: [TodoListService],
})
export class TodoListModule {}
