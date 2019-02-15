import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  public API = 'http://localhost:62819/api';
  public Users_API = `${this.API}/users`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.Users_API);
  }

  get(id: string) {
    return this.http.get(`${this.Users_API}/${id}`);
  }

  save(user: User): Observable<User> {
    //alert("Inside service user is, " + JSON.stringify(user));
    let result: Observable<User>
    if (user.Id != 0) {
      //alert("User ID not equals to zero " + user.Id)
      result = this.http.put<User>(`${this.Users_API}/${user.Id}`, user);
    }
    else {
      //alert("User ID equals to zero")
      //alert("Inside service before post the user, is, " + JSON.stringify(user));
      result = this.http.post<User>(`${this.Users_API}`, user);
      //alert("This the result for save from service: " + JSON.stringify(user));
    }
    return result;
  }

  delete(user: User) {
    //let result: any;
    //alert('called service delete with user, '+JSON.stringify(user) +' with Id ' + user.Id.toString())
    this.http.delete(`${this.Users_API}/${user.Id.toString()}`).subscribe((ok) => { console.log(ok) });
    //return result;
  }
}
