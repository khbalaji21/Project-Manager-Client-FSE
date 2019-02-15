import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Task } from '../model/task';
import { TaskApiService } from '../shared/task-api.service';
import { SearchClass } from '../model/search-class';
import { ModalProjectsComponent } from '../modal-projects/modal-projects.component';
import { Project } from '../model/project';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  searchObj: SearchClass = new SearchClass();
  tasks: Task = new Task();
  taskAPI: Array<Task>;
  self: any = this;

  public project: Project;
  public setPrjValue: string;
  public searchText: number;

  constructor(private router: Router, private taskService: TaskApiService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllTasks();
  }

  openProjects() {
    const modalRef = this.modalService.open(ModalProjectsComponent);
    modalRef.componentInstance.manager = this.project;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
      this.project = receivedEntry;
      //alert(JSON.stringify(this.manager));
      this.setPrjValue = this.project.Name;
      this.searchText = this.project.Id;
      //alert(this.setMgr);
      this.closeModal();
    })
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  getAllTasks() {
    this.taskService.getAll().subscribe(data => {
      this.taskAPI = data;
    });
    return this.taskAPI;
  }

  endtask(taskfrm: Task) {
    this.tasks = taskfrm;
    this.tasks.status = true;
    this.taskService.save(this.tasks).subscribe(
      result => {
        this.gotoList();
      })
  }

  gotoList(): any {
    this.router.navigate(['/view-task']);
  }

  getBysearch(searchObj: SearchClass) {
    //alert("get by search is triggering");
    this.taskService.getAll().subscribe(data => {
      this.taskAPI = data.filter(data => data.Name == searchObj.Name || data.Parent_Task == searchObj.Parent_Task || (data.Priority >= searchObj.From_Priority && data.Priority <= searchObj.To_Priority) || (data.Start_Date == searchObj.Start_Date) || (data.End_Date == searchObj.End_Date));
    });
  }

}
