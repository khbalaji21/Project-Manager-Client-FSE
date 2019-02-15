import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from '../model/task';
import { TaskApiService } from '../shared/task-api.service';
import { ModalManagerComponent } from '../modal-manager/modal-manager.component';
import { ModalParenttasksComponent } from '../modal-parenttasks/modal-parenttasks.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../model/user';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  task: Task = new Task();
  public tasks: Task;
  public user: User;
  public setUsrValue: string;
  public setPrntValue: string;
  sub: Subscription;
  constructor(private datePipe: DatePipe, private modalService: NgbModal, private route: ActivatedRoute, private taskService: TaskApiService, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['Id'];
      //alert("This is Id "+id);
      if (id) {
        this.taskService.get(id).subscribe((taskSer: any) => {
          //alert("This is returned from service " + JSON.stringify(taskSer));
          if (taskSer) {
            //$filter('filter')(taskSer, { 'Id': id }) 
            //this.task = taskSer.find(ob => ob.Id == id);
            this.task = taskSer;
            alert("Task object values are " + JSON.stringify(this.task));
            //this.task.Start_Date = this.datePipe.transform(this.task.Start_Date, 'MM-dd-yyyy').toString();
            //alert("This is final task " + JSON.stringify(this.task));
          } else {
            //alert('exception Task not found');
            console.log(
              `Task with Id '${id}' not found, returning to list`
            );
            this.gotoList();
          }
        });
      }
    });
  }

  gotoList(): any {
    this.router.navigate(['/view-task']);
  }

  update(formData: any) {
    this.sub = this.route.params.subscribe(params => {
      const id = params['Id'];
      //alert("This is Id "+id);
      if (id) {
        formData.Id = id;
        formData.Project_Id = this.task.Project_Id;
        formData.Parent_Task = this.task.Parent_Task;
        //formData.Parent_Task = this.tasks.Id;
        if (this.user != null) {
          formData.User = this.user.Id;
        }
        alert("form data is " + JSON.stringify(formData))
        this.taskService.save(formData).subscribe(
          result => {
            this.gotoList();
          });
      }
    });
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
}
