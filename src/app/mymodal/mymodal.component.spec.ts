import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MymodelComponent } from './mymodal.component';

describe('MymodelComponent', () => {
  let component: MymodelComponent;
  let fixture: ComponentFixture<MymodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MymodelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MymodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
