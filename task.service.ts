import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/v1/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<{ tasks: Task[] }>(this.apiUrl).pipe(
      map(response => response.tasks)
    );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<{ task: Task }>(this.apiUrl, task).pipe(
      map(response => response.task)
    );
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.patch<{ task: Task }>(`${this.apiUrl}/${id}`, task).pipe(
      map(response => response.task)
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<{ task: Task }>(`${this.apiUrl}/${id}`).pipe(
      map(() => void 0)
    );
  }
} 