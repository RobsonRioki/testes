import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { DadosService } from '../../services/dados.service';

interface Question {
  category: string;
  question: string;
  vote: number;
  isDeleted: boolean;
  isReplied: boolean;
  workspace: string;
  id: string;
}

interface Dados {
  createAt: number;
  name: string;
  code: number;
  participants: number;
  timeLeft: Date;
  id: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'], 
})
export class MenuComponent implements OnInit {
  @Input() id: string = '';
  @Input() questions: Array<Question> = [];

  constructor(
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    console.log(this.id);
  }

  responder() {
    const questionToUpdate = this.questions.find(
      (item: Question) => item.id === this.id
    );
    if (questionToUpdate) {
      questionToUpdate.isReplied = true;
      this.questionService.updateQuestion(questionToUpdate).subscribe({
        next: () => {
          console.log('Pergunta marcada como respondida com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao atualizar pergunta:', err);
        }
      });
    }
    console.log(this.id);
  }

  ocultar() {
    const questionToUpdate = this.questions.find(
      (item: Question) => item.id === this.id
    );
    if (questionToUpdate) {
      questionToUpdate.isDeleted = true;
      this.questionService.updateQuestion(questionToUpdate).subscribe({
        next: () => {
          console.log('Pergunta ocultada com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao ocultar pergunta:', err);
        }
      });
    }
    console.log(this.id);
  }
  desocultar(){
    const questionToUpdate = this.questions.find(
      (item: Question) => item.id === this.id
    );
    if (questionToUpdate) {
      questionToUpdate.isDeleted = false;
      this.questionService.updateQuestion(questionToUpdate).subscribe({
        next: () => {
          console.log('Pergunta ocultada com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao ocultar pergunta:', err);
        }
      });
    }
    console.log(this.id);
  }
}
