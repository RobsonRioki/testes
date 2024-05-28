import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-container-pergunta',
  templateUrl: './container-pergunta.component.html',
  styleUrl: './container-pergunta.component.css'
})
export class ContainerPerguntaComponent {
  @Input() question: any;
  @Input() questions!: any[];
  @Input() isAdmin!: boolean;
  @Output() likeClicked = new EventEmitter<string>();

  onLikeClick(id: string) {
    this.likeClicked.emit(id);
  }

}
