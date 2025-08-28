import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Todo {
  id: number;
  name: string;
  isComplete: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodosService {
  todos: Todo[] = [];
  private http = inject(HttpClient);
  // private url: string = 'https://localhost:8080';
  private url: string = 'http://localhost:5038';

  constructor() {
    this.http.get<Todo[]>(`${this.url}/api/TodoItems`).subscribe(res => {
      this.todos = res;
      console.log(`Fetched ${this.todos.length} items`);
    });
  }

  addItem(title: string): void {
    const todo: Todo = {
      id: 0,
      name: title,
      isComplete: false,
    };
    this.http.post<Todo>(`${this.url}/api/TodoItems`, todo).subscribe(res => {
      this.todos.push(res);
      console.log(res);
    });
  }

  removeItem(todo: Todo): void {
    const index = this.todos.indexOf(todo);
    this.http.delete(`${this.url}/api/TodoItems/${todo.id}`).subscribe(res => {
      this.todos.splice(index, 1);
      console.log(res);
    });
  }

  clearCompleted(): void {
    this.todos = this.todos.filter((todo) => {
      if (!todo.isComplete) {
        return true;
      }
      else {
        this.http.delete(`${this.url}/api/TodoItems/${todo.id}`).subscribe(res => {
          console.log(`${todo.id} deleted`);
        });
        return false;
      }
    });
  }

  updateTodo(todo: Todo): void {
    this.http.put(`${this.url}/api/TodoItems/${todo.id}`, todo).subscribe(res => {
      console.log(`${todo.id} updated`);
    });
  }

  toggleAll(isComplete: boolean): void {
    this.todos = this.todos.map((todo) => {
      let updatedTodo = ({ ...todo, isComplete });
      this.http.put(`${this.url}/api/TodoItems/${updatedTodo.id}`, updatedTodo).subscribe(res => {
        console.log(`${updatedTodo.id} updated`);
      });
      return updatedTodo;
    });
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
