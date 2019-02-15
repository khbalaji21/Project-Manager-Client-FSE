import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { USERS } from '../model/dummy-user';
import { User } from '../model/user';
import { UserApiService } from '../shared/user-api.service';

@Component({
  selector: 'app-modal-manager',
  templateUrl: './modal-manager.component.html',
  styleUrls: ['./modal-manager.component.css']
})
export class ModalManagerComponent implements OnInit {

  user: User = new User();
  userAPI: Array<User>;
  searchText: string;
  @Input() public manager;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal, private userService: UserApiService) { }

  ngOnInit() {
    //console.log(this.manager);
    //this.userAPI = USERS;
    //open(content)
    this.getUsers();
  }

  closeResult: string;

  getUsers() {
    //this.userAPI = USERS;
    this.userService.getAll().subscribe(data => {
      this.userAPI = data;
    });
    return this.userAPI;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  setMgr(usr: User) {
    this.manager = usr;
    this.passEntry.emit(this.manager);
  }
}
