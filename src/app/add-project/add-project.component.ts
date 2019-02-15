import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../model/project';
import { PROJECTS } from '../model/dummy-project';
import { ModalManagerComponent } from '../modal-manager/modal-manager.component';
import { User } from '../model/user';
import { ProjectApiService } from '../shared/project-api.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit {
  project: Project = new Project();
  projectAPI: Array<Project>
  chkd: boolean;
  setMgr: string;
  today: Date;
  searchText: string;

  public manager: User; // = { Id: 1, First_Name: "Decorate", Last_Name: "Well", Employee_ID: 1, Project_ID: 1, Task_ID: 1 };

  constructor(private modalService: NgbModal, private projectApiService: ProjectApiService) {
    this.today = new Date();
  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    //this.projectAPI = PROJECTS;
    this.projectApiService.getAll().subscribe(data => {
      this.projectAPI = data;
    });
    return this.projectAPI;
  }

  save(formData: any) {
    formData.Id = 0;
    if (this.manager != null) {
      formData.Manager_Id = this.manager.Id;
    }
    formData.Priority = (<HTMLInputElement>document.getElementById('projectpriority')).value;
    alert("after setting priority " + JSON.stringify(formData));
    if (this.project.Id != null) {
      formData.Id = this.project.Id;
    }
    //alert("save with Id is hitting " + JSON.stringify(formData));
    this.projectApiService.save(formData).subscribe(
      result => {
        this.gotolist();
      });
  }

  modify(prj: Project, btnAddUpdt: any) {
    document.getElementById(btnAddUpdt).innerText = "Update";
    alert("The Project values to be updated are: " + JSON.stringify(prj));
    (<HTMLInputElement>document.getElementById('projectpriority')).value = prj.Priority.toString();
    (<HTMLInputElement>document.getElementById('rangeOp')).value = prj.Priority.toString();
    this.project = prj;
  }

  gotolist() {
    this.getProjects();
    //this.router.navigate(['/add-user']);
  }

  DateIndic(ch: any) {
    //alert("checked " + ch + " ");
    this.chkd = ch;
    //(<HTMLInputElement>document.getElementById(ipStartDt)).disabled = false;
    //(<HTMLInputElement>document.getElementById(ipEndDt)).disabled = false;
  }

  openModal() {
    const modalRef = this.modalService.open(ModalManagerComponent);
    modalRef.componentInstance.manager = this.manager;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
      this.manager = receivedEntry;
      //alert(JSON.stringify(this.manager));
      this.setMgr = this.manager.First_Name + " " + this.manager.Last_Name;
      //alert(this.setMgr);
      this.closeModal();
    })
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  suspend(projfrm: Project) {
    this.project = projfrm;
    this.project.status = true;
    this.projectApiService.save(this.project).subscribe(
      result => {
        this.gotolist();
      })
  }
}
