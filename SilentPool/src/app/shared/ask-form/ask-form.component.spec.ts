import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskFormComponent } from './ask-form.component';

describe('AskFormComponent', () => {
  let component: AskFormComponent;
  let fixture: ComponentFixture<AskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AskFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
