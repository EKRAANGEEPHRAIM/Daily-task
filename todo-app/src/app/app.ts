import { Component, signal,computed } from '@angular/core';

import { TodoModel } from './models/todo-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
title = 'Ma Liste de Tâches';
  
  // Signals for modern responsiveness
  todos = signal<TodoModel[]>([]);
  newTodoTitle = '';
  private nextId = 1;

  // Computed signals for statistics
  //get the number of tasks completed
  completedTodos = computed(() => 
    this.todos().filter(todo => todo.completed).length
  );

  // get the number of taks remaining
  remainingTodos = computed(() => 
    this.todos().filter(todo => !todo.completed).length
  );

  // add task
  addTodo(): void {
    if (this.newTodoTitle.trim() === '') {
      return;
    }

    const newTodo: TodoModel = {
      id: this.nextId++,
      title: this.newTodoTitle.trim(),
      completed: false,
      createdAt: new Date()
    };

    this.todos.update(todos => [...todos, newTodo]);
    this.newTodoTitle = '';
  }


  // delete task
  deleteTodo(id: number): void {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }


  //
  toggleTodo(id: number): void {
    this.todos.update(todos => 
      todos.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }
}
