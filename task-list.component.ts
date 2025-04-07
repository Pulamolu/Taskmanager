import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [TaskService],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: string = '';
  editingTaskId: string | null = null;
  editingTask: Task = { title: '', completed: false };

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
      }
    });
  }

  addTask(): void {
    if (this.newTask.trim()) {
      const task: Task = {
        title: this.newTask.trim(),
        completed: false
      };
      this.taskService.createTask(task).subscribe({
        next: (task) => {
          this.tasks.push(task);
          this.newTask = '';
        },
        error: (error) => {
          console.error('Error adding task:', error);
        }
      });
    }
  }

  toggleTask(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(task._id!, updatedTask).subscribe({
      next: (task) => {
        const index = this.tasks.findIndex(t => t._id === task._id);
        if (index !== -1) {
          this.tasks[index] = task;
        }
      },
      error: (error) => {
        console.error('Error updating task:', error);
      }
    });
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task._id !== taskId);
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      }
    });
  }

  startEdit(task: Task): void {
    this.editingTaskId = task._id!;
    this.editingTask = { ...task };
  }

  saveEdit(taskId: string): void {
    if (this.editingTask.title.trim()) {
      this.taskService.updateTask(taskId, this.editingTask).subscribe({
        next: (updatedTask) => {
          const index = this.tasks.findIndex(t => t._id === taskId);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error updating task:', error);
        }
      });
    } else {
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editingTaskId = null;
    this.editingTask = { title: '', completed: false };
  }

  isEditing(taskId: string): boolean {
    return this.editingTaskId === taskId;
  }
} 