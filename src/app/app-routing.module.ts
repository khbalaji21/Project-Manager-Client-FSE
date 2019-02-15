import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProjectComponent } from './add-project/add-project.component';

const routes: Routes = [
  { path: "add-task", component: AddTaskComponent },
  { path: "view-task", component: ViewTaskComponent },
  { path: "edit-task/:Id", component: EditTaskComponent },
  { path: "add-user", component: AddUserComponent },
  { path: "add-project", component: AddProjectComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(routes),
  ],
  declarations: []
})
export class AppRoutingModule { }
