import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Task } from '../models/task.interface';

interface TaskResponse {
  task: Task;
}

interface TasksResponse {
  tasks: Task[];
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/v1/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<TasksResponse>(this.apiUrl).pipe(
      map(response => response.tasks)
    );
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<TaskResponse>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.task)
    );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<TaskResponse>(this.apiUrl, task).pipe(
      map(response => response.task)
    );
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.patch<TaskResponse>(`${this.apiUrl}/${id}`, task).pipe(
      map(response => response.task)
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 