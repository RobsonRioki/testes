import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  @Input() dados!: any[];

  @Output() baixarPerguntas = new EventEmitter<void>();

  onBaixarPerguntas() {
    this.baixarPerguntas.emit();
  }
}
