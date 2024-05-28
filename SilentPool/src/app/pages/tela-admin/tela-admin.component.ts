import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { DadosService } from '../../services/dados.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  selector: 'app-tela-admin',
  templateUrl: './tela-admin.component.html',
  styleUrls: ['./tela-admin.component.css'],
})
export class TelaAdminComponent implements OnInit {
  categoria: string = '';
  pergunta: string = '';
  code: string = '';
  id: string = '';

  questions: Array<Question> = [];
  dados: Array<Dados> = [];

  constructor(
    private questionService: QuestionService,
    private dadosService: DadosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const codigo = this.route.snapshot.params['codigo'];
    console.log(this.code);
    this.code = codigo;

    const codigoSalvo = localStorage.getItem('salaCodigo');
     if (codigoSalvo !== this.code) {
      alert('Você não tem permissão para acessar esta página.');
      this.router.navigate(['/']); 
      return;
    }

    this.dadosService.getDados().subscribe({
      next: (dado) => {
        this.dados = dado.filter(
          (item: Dados) => String(item.code) === codigo
        );
        console.log(dado);
      },
      error: (err) => {
        console.error('Erro ao buscar dados:', err);
      }
    });

    this.getPerguntas();

    setInterval(() => this.getPerguntas(), 20000);
  }

  getPerguntas() {
    this.questionService.getQuestions().subscribe({
      next: questions => {
        this.questions = questions.filter(
          (item: Question) => item.workspace === String(this.code));
          this.sortQuestionsByDeleted();
        
      },
      error: (err) => {
        console.error('Erro ao buscar perguntas:', err);
      }
    });
  }

  like(id: string) {
    const questionToUpdate = this.questions.find(
      (item: Question) => item.id === id
    );
    if (questionToUpdate) {
      questionToUpdate.vote++;
      this.questionService.updateQuestion(questionToUpdate).subscribe({
        next: () => {
          console.log('Voto atualizado com sucesso!');
          this.getPerguntas(); 
        },
        error: (err) => {
          console.error('Erro ao atualizar voto:', err);
        }
      });
    }
  }

  // atualizar() {
  //   this.dadosService.getDados().subscribe({
  //     next: (dado) => {
  //       this.dados = dado.filter(
  //         (item: Dados) => String(item.code) === this.code
  //       );
  //     },
  //     error: (err) => {
  //       console.error('Erro ao buscar dados:', err);
  //     }
  //   });

  //   this.getPerguntas();
  // }

  // sortQuestionsByDeleted() {
  //   this.questions.sort((a, b) => {

  //     if (!a.isReplied && !a.isDeleted && !b.isReplied && !b.isDeleted) {
  //       return 0;
  //     }

  //     else if (a.isDeleted && !b.isDeleted) {
  //       return 1;
  //     }
  //     else if (!a.isDeleted && b.isDeleted) {
  //       return -1;
  //     }

  //     else if (a.isReplied && !b.isReplied) {
  //       return 1;
  //     }
  //     else if (!a.isReplied && b.isReplied) {
  //       return -1;
  //     }

  //     else {
  //       return b.vote - a.vote;
  //     }
  //   });
  // }
  sortQuestionsByDeleted() {
    this.questions.sort((a, b) => {
      if (a.isDeleted !== b.isDeleted) {
        return a.isDeleted ? 1 : -1;
      }
      if (a.isReplied !== b.isReplied) {
        return a.isReplied ? 1 : -1;
      }
      return b.vote - a.vote;
    });
  }
  
}
