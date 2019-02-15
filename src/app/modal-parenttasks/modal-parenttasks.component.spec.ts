import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParenttasksComponent } from './modal-parenttasks.component';

describe('ModalParenttasksComponent', () => {
  let component: ModalParenttasksComponent;
  let fixture: ComponentFixture<ModalParenttasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalParenttasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalParenttasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
