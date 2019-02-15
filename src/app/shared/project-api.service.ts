import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  public API = 'http://localhost:62819/api';
  public Projects_API = `${this.API}/projects`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Project>> {
    return this.http.get<Array<Project>>(this.Projects_API);
  }


  get(id: string) {
    return this.http.get(`${this.Projects_API}/${id}`);
  }

  //getbySearch(searchObj: SearchClass) {
  //  //return this.http.get<Array<Task>>(`${this.TASKS_API}/${searchObj}`)
  //}

  save(task: Project): Observable<Project> {
    //alert("Inside service task is, " + JSON.stringify(task));
    let result: Observable<Project>
    if (task.Id != 0) {
      //alert("Task ID not equals to zero")
      result = this.http.put<Project>(`${this.Projects_API}/${task.Id}`, task);
    }
    else {
      //alert("Task ID equals to zero")
      //alert("Inside service before post the task, is, " + JSON.stringify(task));
      result = this.http.post<Project>(`${this.Projects_API}`, task);
      //alert("This the result for save from service: " + JSON.stringify(result));
    }
    return result;
  }
}
