import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoListService } from '../../services/todo-list.service';
import { TodoItemInterface } from '../../types/todo-item.interface';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  form: FormGroup;
  filterForm: FormGroup;
  todos: TodoItemInterface[];

  constructor(
    private fb: FormBuilder,
    private todoListService: TodoListService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchData();
  }

  initializeForm(): void {
    this.filterForm = this.fb.group({
      search: '',
      filterDone: '',
    });

    this.form = this.fb.group({
      id: [''],
      description: ['', Validators.required],
      done: [false],
    });

    this.filterForm.get('filterDone').valueChanges.subscribe((val) => {
      this.fetchData();
      if (val === 'D') {
        this.todos = this.todos.filter((todo) => todo.done);
      } else if (val == 'N') {
        this.todos = this.todos.filter((todo) => !todo.done);
      }
    });
  }

  fetchData(): void {
    this.todos = this.todoListService.list();
  }

  OnSubmit(): void {
    const itemToSave: TodoItemInterface = {
      id: this.form.value['id'],
      description: this.form.value['description'],
      done: this.form.value['done'],
    };
    this.todoListService.save(itemToSave);
    this.clearForm();
  }

  onAdd(): void {
    this.clearForm();
  }

  onRemove(id: number): void {
    this.todoListService.remove(id);
    this.fetchData();
  }

  onEdit(id: number): void {
    const itemToEdit = this.todos.find((item) => item.id == id);
    this.fillFormWithItem(itemToEdit);
  }

  fillFormWithItem(item: TodoItemInterface): void {
    this.form.patchValue({ id: item.id });
    this.form.patchValue({ description: item.description });
    this.form.patchValue({ done: item.done });
  }

  clearForm(): void {
    this.form.patchValue({ id: '' });
    this.form.patchValue({ description: '' });
    this.form.patchValue({ done: false });
  }
}
