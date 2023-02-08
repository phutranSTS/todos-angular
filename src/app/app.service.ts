import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { FakeTodos } from './shared/consts/fake-todos';
import { Todo } from './shared/interfaces/todo';
import { TodoPriority } from './shared/enums/todo-priority';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  /** Key for todos in localStorage. */
  private readonly todosKey = 'todos';

  /**
   * Behaviour subject to watch, load, and save changes.
   * Loading and saving is handled by this service.
   * Components can watch and make changes to the list.
   */
  readonly todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  constructor(
    private _route: Router,
  ) {
    console.debug('AppService initiated.');
    /** Load initial value. */
    console.debug('Loading todos from localStorage.');
    let storedTodos: string | null = localStorage.getItem(this.todosKey);
    /** Checking if we should save fake data. */
    if (!storedTodos) {
      console.debug('Loading fake todos since localStorage is empty.');
      storedTodos = JSON.stringify(FakeTodos);
    }
    /** Emit initial value to the subject. */
    this.todos.next(JSON.parse(storedTodos));
    /** Watch to save new changes to localStorage. */
    this.todos.subscribe({
      next: (value: Todo[]): void => {
        console.debug('Saving todos to localStorage.');
        localStorage.setItem(this.todosKey, JSON.stringify(value));
      },
    });
  }

  addTodo(todoText: string | unknown, priority: TodoPriority | unknown ): void {
    let id;
    this.todos.subscribe(result => id = result.length + 1);

    const todos = this.todos.getValue()
    const item: any = {
      id: id,
      name: todoText,
      createdDate: Date.now(),
      priority: priority,
      isCompleted: false,
    }
    todos.unshift(item);

    this.todos.next(todos);
  }
  saveTodo(id: number | unknown, name: string | unknown, priority: TodoPriority | unknown): void {
    const todos = this.todos.getValue()
    let objIndex = todos.findIndex((obj => obj.id == id));
    todos[objIndex].name = name;
    todos[objIndex].priority = priority
    this.todos.next(todos);
  }

  deleteTodo(id: number | unknown): void {
    const todos = this.todos.getValue()
    const index = todos.findIndex(todo => todo.id === id);
    todos.splice(index, 1);
    this.todos.next(todos);
  }

  edit(todo: Todo): void {
    this._route.navigate(['/edit'], { queryParams: { name: todo.name, id: todo.id, priority: todo.priority } });
  }

}
