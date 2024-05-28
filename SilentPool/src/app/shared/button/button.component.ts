import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent{

  @Input() typeBtn: 'primary' | 'secondary' | 'tertiary' = 'primary' ;
  @Input() textBtn: string = '';
  @Input() widthBtn: string = '100';


}