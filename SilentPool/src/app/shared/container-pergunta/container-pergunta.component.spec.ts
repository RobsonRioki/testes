import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerPerguntaComponent } from './container-pergunta.component';

describe('ContainerPerguntaComponent', () => {
  let component: ContainerPerguntaComponent;
  let fixture: ComponentFixture<ContainerPerguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerPerguntaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContainerPerguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
