import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  BaixarButton: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.url.subscribe(url => {
      const currentUrl = this.router.url;
      this.BaixarButton = this.shouldButtonBeHiddenBasedOnUrl(currentUrl);
    });
  }

  shouldButtonBeHiddenBasedOnUrl(url: string): boolean {
    return url.includes('/perguntas');
  }
  
}
