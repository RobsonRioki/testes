import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPerguntasComponent } from './tela-perguntas.component';

describe('TelaPerguntasComponent', () => {
  let component: TelaPerguntasComponent;
  let fixture: ComponentFixture<TelaPerguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelaPerguntasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaPerguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
