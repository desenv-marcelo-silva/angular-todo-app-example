import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoListModule } from './todolist/todo-list.module';

@NgModule({
  imports: [BrowserModule, FormsModule, TodoListModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
