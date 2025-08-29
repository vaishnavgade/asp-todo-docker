import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface Todo {
  id: number;
  name: string;
  isComplete: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodosService {
  
  private todos: WritableSignal<Todo[]> = signal(<Todo[]>{});
  public filteredTodos: Signal<Todo[]> = signal(<Todo[]>{});

  private http = inject(HttpClient);

  constructor() {
    this.http.get<Todo[]>(`${environment.apiUrl}/api/TodoItems`).subscribe(res => {
      this.todos.set(res);
      console.log(`Fetched ${this.todos().length} items`);
    });
  }

  addItem(title: string): void {
    const todo: Todo = { id: 0, name: title, isComplete: false };
    this.http.post<Todo>(`${environment.apiUrl}/api/TodoItems`, todo).subscribe(res => {
      this.todos.update(values => [...values, res]);
      console.log(res);
    });
  }

  removeItem(todo: Todo): void {
    this.http.delete(`${environment.apiUrl}/api/TodoItems/${todo.id}`).subscribe(res => {
      this.todos.update(values => values.filter(value => value.id !== todo.id));
      console.log(res);
    });
  }

  clearCompleted(): void {
    this.todos.update(values => {
      return values.filter((todo) => {
        if (!todo.isComplete) {
          return true;
        }
        else {
          this.http.delete(`${environment.apiUrl}/api/TodoItems/${todo.id}`).subscribe(res => {
            console.log(`${todo.id} deleted`);
          });
          return false;
        }
      });
    });
  }

  updateTodo(todo: Todo): void {
    this.http.put(`${environment.apiUrl}/api/TodoItems/${todo.id}`, todo).subscribe(res => {
      console.log(`${todo.id} updated`);
    });
  }

  toggleAll(isComplete: boolean): void {
    this.todos.update(values => {
      return values.map((todo) => {
        let updatedTodo = ({ ...todo, isComplete });
        this.http.put(`${environment.apiUrl}/api/TodoItems/${updatedTodo.id}`, updatedTodo).subscribe(res => {
          console.log(`${updatedTodo.id} updated`);
        });
        return updatedTodo;
      });
    });
  }

  getItems(type = 'all'): Signal<Todo[]> {
    return this.filteredTodos = computed(() => {
      switch (type) {
        case 'active':
          return this.todos().filter((todo) => !todo.isComplete);
        case 'completed':
          return this.todos().filter((todo) => todo.isComplete);
      }

      return this.todos();
    });
  }
}
