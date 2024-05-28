import { Component, OnInit } from '@angular/core';
import { DadosService } from '../../services/dados.service';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';

interface Dados {
  createAt: number
  name: string
  code: number
  participants: number
  timeLeft: Date
  id: string
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  nomeSala: string = '';
  tempo: number = 0;
  codigo: string = ""

  constructor(private dadosService: DadosService, private route: ActivatedRoute, private router: Router,) { }
  dados: Array<Dados> = []




  CriarSala(): void {

    const min = 100000;
    const max = 999999;
    const code = Math.floor(Math.random() * (max - min + 1)) + min;


    const novaSala = {
      createAt: Number,
      name: this.nomeSala,
      code: code,
      participants: Number,
      timeLeft: this.tempo,
      id: ''
    };


    this.dadosService.postDados(novaSala).subscribe({
      next: () => {

        localStorage.setItem('salaCodigo', code.toString());
        this.router.navigate(['/admin', code]);
      },
      error: (error) => {
        console.error('Erro ao criar sala:', error);
      },
    });

    // this.dadosService.postDados(novaSala).subscribe(
    //   response => {
    //     console.log('Sala enviada com sucesso:', response);
    //     this.nomeSala = '';
    //     this.tempo = 0;
    //   },
    //   error => {
    //     console.error('Erro ao criar sala:', error);
    //   }
    // );

    // this.router.navigate(['/admin', code])
  }
}
