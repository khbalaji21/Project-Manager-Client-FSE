import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Task } from '../model/task';
import { TaskApiService } from '../shared/task-api.service';
import { ModalManagerComponent } from '../modal-manager/modal-manager.component';
import { ModalParenttasksComponent } from '../modal-parenttasks/modal-parenttasks.component';
import { ModalProjectsComponent } from '../modal-projects/modal-projects.component';
import { Project } from '../model/project';
import { User } from '../model/user';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  task: Task = new Task();
  taskAPI: Array<Task>;
  public project: Project;
  public tasks: Task;
  public user: User;
  public setPrjValue: string;
  public setPrntValue: string;
  public setUsrValue: string;
  public chkd: boolean;

  constructor(private taskService: TaskApiService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
  }

  save(formData: any) {
    //alert("save is hitting " + JSON.stringify(formData));
    formData.Id = 0;
    formData.Project_Id = this.project.Id;
    if (!this.chkd) {
      formData.Parent_Task = this.tasks.Id;
      formData.User = this.user.Id;
    }
    //alert("save is hitting " + JSON.stringify(formData));
    this.taskService.save(formData).subscribe(
      result => {
        this.gotolist();
      });
    // alert(this.data.name);
    // TASKS.concat(this.data);
  }

  gotolist() {
    this.router.navigate(['/view-task']);
  }

  openProjects() {
    const modalRef = this.modalService.open(ModalProjectsComponent);
    modalRef.componentInstance.manager = this.project;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
      this.project = receivedEntry;
      //alert(JSON.stringify(this.manager));
      this.setPrjValue = this.project.Name;
      //alert(this.setMgr);
      this.closeModal();
    })
  }
  openTasks() {
    const modalRef = this.modalService.open(ModalParenttasksComponent);
    modalRef.componentInstance.manager = this.tasks;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
      this.tasks = receivedEntry;
      //alert(JSON.stringify(this.manager));
      this.setPrntValue = this.tasks.Name;
      //this.task.Name = this.tasks.Name;
      //alert(this.task.Name);
      this.closeModal();
    })
  }
  openUsers() {
    const modalRef = this.modalService.open(ModalManagerComponent);
    modalRef.componentInstance.manager = this.user;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
      this.user = receivedEntry;
      //alert(JSON.stringify(this.manager));
      this.setUsrValue = this.user.First_Name + " " + this.user.Last_Name;
      //alert(this.setMgr);
      this.closeModal();
    })
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  disableCntrls(ch: any) {
    //alert("checked " + ch + " ");
    this.chkd = ch;
    //(<HTMLInputElement>document.getElementById(ipStartDt)).disabled = false;
    //(<HTMLInputElement>document.getElementById(ipEndDt)).disabled = false;
  }
}
