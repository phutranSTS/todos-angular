import { TodoPriority } from '../enums/todo-priority';

/**
 * Represents data structure of a single task/to-do.
 * @see AppService.todos
 */
export interface Todo {
  id: number | undefined,
  // Title of the task
  name: string | unknown;
  // Is this task completed/done?
  isCompleted: boolean;
  // Due date of the task (milliseconds)
  createdDate: number;
  // Priority of the task
  priority: TodoPriority | unknown;
}
