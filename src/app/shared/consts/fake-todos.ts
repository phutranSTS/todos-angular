import { TodoPriority } from '../enums/todo-priority';
import { Todo } from '../interfaces/todo';

/** List of fake todos for testing. */
export const FakeTodos: Todo[] = [
  {
    id: 1,
    name: 'Setup Foo module for testing',
    createdDate: Date.now(),
    priority: TodoPriority.LOW,
    isCompleted: false,
  },
  {
    id: 2,
    name: 'Do something random here',
    createdDate: Date.now(),
    priority: TodoPriority.NORMAL,
    isCompleted: false,
  },
  {
    id: 3,
    name: 'Remove Bar module from app module',
    createdDate: Date.now(),
    priority: TodoPriority.NORMAL,
    isCompleted: true,
  },
  {
    id: 4,
    name: 'Write unit-tests for XYZ app',
    createdDate: Date.now(),
    priority: TodoPriority.HIGH,
    isCompleted: false,
  },
  {
    id: 5,
    name: 'Delete ABC module completely',
    createdDate: Date.now(),
    priority: TodoPriority.NORMAL,
    isCompleted: false,
  },
];
