import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DadosService } from '../../services/dados.service';

interface Dados {
  createAt: number;
  name: string;
  code: number;
  participants: number;
  timeLeft: Date;
  id: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() codigo: string = '';
  code = '';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private dadosService: DadosService,
    private route: ActivatedRoute
  ) {}

  dados: Array<Dados> = [];

  ngOnInit(): void {
    this.code = this.route.snapshot.params['codigo'];

    this.dadosService.getDados().subscribe({
      next: (dado) => {
        this.dados = dado;
        console.log(this.dados);
      },
    });
  }

  entrarSala() {
    const codigoExistente = this.dados.find((item) => item.code.toString() === this.codigo);

    if (codigoExistente) {
      this.router.navigate(['/perguntas', this.codigo]);
    } else {

      alert('Código inválido. Por favor, insira um código válido.');
    }
  }

  openDialog() {
    this.dialog.open(ModalComponent);
  }
}
