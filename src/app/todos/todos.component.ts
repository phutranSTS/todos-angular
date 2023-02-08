import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { Todo } from '../shared/interfaces/todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {

  /** Subscription for observables to unsubscribe after component destroy. */
  private readonly subscription = new Subscription();

  /** List of todos. */
  todos: Todo[] = [];

  constructor(
    private appService: AppService,
  ) {
    console.debug('TodosComponent initiated.');
  }

  ngOnInit(): void {
    this.subscription.add(this.appService.todos.subscribe({
      next: (value: Todo[]): void => {
        this.todos = value;
      },
    }));

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleTodo(todo: Todo): void {
    const newTodo = this.todos.map(value => {
      if (todo.id === value.id) {
        value.isCompleted = !value.isCompleted;
      }
      return value
    })
    this.appService.todos.next(newTodo);
  }

  clean(): void {
    this.appService.todos.next(this.todos.filter((todo: Todo): boolean => !todo.isCompleted));
  }

  deleteTodo(id: number | unknown): void {
    this.appService.deleteTodo(id)
  }

  editTodo(todo: Todo): void {
    this.appService.edit(todo)
  }
}
