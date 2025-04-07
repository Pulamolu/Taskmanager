import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTaskName: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
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
    if (this.newTaskName.trim()) {
      const newTask: Task = {
        name: this.newTaskName.trim(),
        completed: false
      };

      this.taskService.createTask(newTask).subscribe({
        next: (task) => {
          this.tasks.push(task);
          this.newTaskName = '';
        },
        error: (error) => {
          console.error('Error creating task:', error);
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
} 