import { TodoListInterface } from '../types/todo-list.interface';

const todoList: TodoListInterface = {
  items: [
    {
      id: 1,
      description: 'Pick up son on school',
      done: false,
    },
    {
      id: 2,
      description: 'Go out with dogs',
      done: false,
    },
    {
      id: 3,
      description: 'Work on your company',
      done: false,
    },
  ],
};

export default todoList;
