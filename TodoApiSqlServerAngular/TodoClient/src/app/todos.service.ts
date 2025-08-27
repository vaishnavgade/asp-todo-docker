import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Todo {
  name: string;
  isComplete: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodosService {
    todos: Todo[] = [];
    private http = inject(HttpClient);

    addItem(title: string): void {
      const todo: Todo = {
        name: title,
        isComplete: false,
      };
      this.todos.push(todo);
    }

    removeItem(todo: Todo): void {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    }

    clearCompleted(): void {
      this.todos = this.todos.filter((todo) => !todo.isComplete);
    }

    toggleAll(completed: boolean): void {
      this.todos = this.todos.map((todo) => ({ ...todo, completed }));
    }

    getItems(type = 'all'): Todo[] {
      switch (type) {
        case 'active':
          return this.todos.filter((todo) => !todo.isComplete);
        case 'completed':
          return this.todos.filter((todo) => todo.isComplete);
      }

      return this.todos;
    }
}
