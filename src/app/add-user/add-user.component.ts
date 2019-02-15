import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../model/user';
import { USERS } from '../model/dummy-user';
import { UserApiService } from '../shared/user-api.service';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [FilterPipe]
})
export class AddUserComponent implements OnInit {

  constructor(private userService: UserApiService, private router: Router, private filterPipe: FilterPipe) { }

  user: User = new User();
  userAPI: Array<User>;
  searchText: string;
  public sortKey: string;

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    //this.userAPI = USERS;
    this.userService.getAll().subscribe(data => {
      this.userAPI = data;
    });
    return this.userAPI;
  }

  save(formData: any) {
    //alert("save is hitting " + JSON.stringify(formData));
    formData.Id = 0;
    //alert("Currently the user object is " + JSON.stringify(this.user));
    if (this.user.Id != null) {
      formData.Id = this.user.Id;
    }
    //alert("save with Id is hitting " + JSON.stringify(formData));
    this.userService.save(formData).subscribe(
      result => {
        this.gotoList();
      });
  }

  delete(usr: User) {
    //alert('called delete user');
    this.userService.delete(usr);
    this.gotoList();
  }

  modify(usr: User, ele: any, rst: any) {
    document.getElementById(ele).innerText = "Update";
    this.user = usr;
    //document.getElementById(rst).disabled = true;
  }

  gotoList(): any {
    this.router.navigate(['/view-task']);
  }

  sort(srtKey: string) {
    this.sortKey = srtKey;
  }

  //Search() {
  //  this.filterPipe.transform(this.getUsers, 
  //}

}
