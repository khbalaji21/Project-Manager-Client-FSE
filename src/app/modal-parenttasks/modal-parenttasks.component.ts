import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Task } from '../model/task';
import { TASKS } from '../model/dummy-tasks';
import { TaskApiService } from '../shared/task-api.service';


@Component({
  selector: 'app-modal-parenttasks',
  templateUrl: './modal-parenttasks.component.html',
  styleUrls: ['./modal-parenttasks.component.css']
})

export class ModalParenttasksComponent implements OnInit {

  taskAPI: Array<Task>

  @Input() public tasks;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();


  constructor(private taskService: TaskApiService) { }

  ngOnInit() {
    //this.taskAPI = TASKS;
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAll().subscribe(data => {
      this.taskAPI = data;
    });
    return this.taskAPI;
  }

  setParentTask(tsk: Task) {
    this.tasks = tsk;
    this.passEntry.emit(this.tasks);
  }
}
