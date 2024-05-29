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

  baixarCSV(data: any, filename: string) {
    const replacer = (_key: string, value: any) => (value === null ? '' : value); 
    const header = Object.keys(data[0]);
    const csv = data.map((row: { [x: string]: any; }) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
  
    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  onBaixarPerguntas() {
    if (this.questions.length > 0) {
      const filteredQuestions = this.questions.map(({ category, question, vote, workspace }) => ({ category, question, vote, workspace }));
      this.baixarCSV(filteredQuestions, 'questions');
    } else {
      alert('Nenhuma pergunta para exportar');
    }
  }

  exportarDados() {
    if (this.dados.length > 0) {
      this.baixarCSV(this.dados, 'dados');
    } else {
      alert('Nenhum dado para exportar');
    }
  }

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
