import { Component, inject, Signal } from '@angular/core';
import { Location } from '@angular/common';
import { Todo, TodosService } from '../todos.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  private location = inject(Location);
  private todosService = inject(TodosService);

  get todos(): Signal<Todo[]> {
    return this.todosService.getItems();
  }

  get activeTodos(): Signal<Todo[]> {
    return this.todosService.getItems('active');
  }

  get completedTodos(): Signal<Todo[]> {
    return this.todosService.getItems('completed');
  }

  get filter(): string {
    return this.location.path().split('/')[1] || 'all';
  }

  clearCompleted() {
    this.todosService.clearCompleted();
  }
}
