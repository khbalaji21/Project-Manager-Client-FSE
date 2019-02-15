import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ModalManagerComponent } from './modal-manager/modal-manager.component';
import { ModalParenttasksComponent } from './modal-parenttasks/modal-parenttasks.component';
import { ModalProjectsComponent } from './modal-projects/modal-projects.component';
import { FilterPipe } from './filter.pipe';
import { SortByPipe } from './sort-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    EditTaskComponent,
    AddUserComponent,
    AddProjectComponent,
    ModalManagerComponent,
    ModalParenttasksComponent,
    ModalProjectsComponent,
    FilterPipe,
    SortByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalManagerComponent,
    ModalParenttasksComponent,
    ModalProjectsComponent]
})
export class AppModule { }
