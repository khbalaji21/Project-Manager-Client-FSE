import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  public API = 'http://localhost:62819/api';
  public TASKS_API = `${this.API}/tasks`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(this.TASKS_API);
  }

  get(id: string) {
    return this.http.get(`${this.TASKS_API}/${id}`);
  }

  //getbySearch(searchObj: SearchClass) {
  //  //return this.http.get<Array<Task>>(`${this.TASKS_API}/${searchObj}`)
  //}

  save(task: Task): Observable<Task> {
    //alert("Inside service task is, " + JSON.stringify(task));
    let result: Observable<Task>
    if (task.Id != 0) {
      //alert("Task ID not equals to zero")
      result = this.http.put<Task>(`${this.TASKS_API}/${task.Id}`, task);
    }
    else {
      //alert("Task ID equals to zero")
      //alert("Inside service before post the task, is, " + JSON.stringify(task));
      result = this.http.post<Task>(`${this.TASKS_API}`, task);
      //alert("This the result for save from service: " + JSON.stringify(result));
    }
    return result;
  }

}
