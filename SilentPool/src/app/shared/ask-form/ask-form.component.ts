import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ask-form',
  templateUrl: './ask-form.component.html',
  styleUrls: ['./ask-form.component.css']
})
export class AskFormComponent {
  @Output() questionSubmitted = new EventEmitter<{ categoria: string, pergunta: string }>();

  categoria!: string;
  pergunta!: string;

  onInserirPergunta() {
    this.questionSubmitted.emit({ categoria: this.categoria, pergunta: this.pergunta });
  }
}