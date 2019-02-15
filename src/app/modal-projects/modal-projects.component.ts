import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../model/project';
import { PROJECTS } from '../model/dummy-project';
import { ProjectApiService } from '../shared/project-api.service';
import { UserApiService } from '../shared/user-api.service';
import { User } from '../model/user';

@Component({
  selector: 'app-modal-projects',
  templateUrl: './modal-projects.component.html',
  styleUrls: ['./modal-projects.component.css']
})
export class ModalProjectsComponent implements OnInit {

  project: Project = new Project();
  projectAPI: Array<Project>;
  userAPI: any;
  managerName: string;
  searchText: string;
  id: string;
  @Input() public projects;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal, private projectApiService: ProjectApiService, private userService: UserApiService) { }

  ngOnInit() {
    //this.projectAPI = PROJECTS;
    this.getProjects();
  }

  getProjects() {
    //this.projectAPI = PROJECTS;
    this.projectApiService.getAll().subscribe(data => {
      this.projectAPI = data;
    });
    return this.projectAPI;
  }

  getManagerName(id: string): string {
    this.userService.get(id).subscribe(data => {
      this.userAPI = data;
    });
    return this.userAPI;
  }

  setProject(prj: Project) {
    this.projects = prj;
    this.managerName = this.getManagerName(prj.Manager_Id.toString());
    this.passEntry.emit(this.projects);
  }
}
