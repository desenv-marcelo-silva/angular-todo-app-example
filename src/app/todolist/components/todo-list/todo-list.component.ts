import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoListService } from '../../services/todo-list.service';
import { TodoItemInterface } from '../../types/todo-item.interface';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
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
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
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

    this.filterForm.get('search').valueChanges.subscribe((val) => {
      this.fetchData();
      this.todos = this.todos.filter((todo) =>
        todo.description.toLowerCase().includes(val.toLowerCase())
      );
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
    this.form.reset();
  }
}
