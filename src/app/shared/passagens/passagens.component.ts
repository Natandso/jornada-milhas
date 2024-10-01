import { Component, Input } from '@angular/core';
import { Passagem } from 'src/app/core/types/type';

@Component({
  selector: 'app-passagens',
  templateUrl: './passagens.component.html',
  styleUrls: ['./passagens.component.scss']
})
export class PassagensComponent {
  @Input() passagem!: Passagem;


  get textoIdaVolta(){
    if(!this.passagem.dataVolta){
      return "Somente ida"
    }
      return "Ida e volta"
  }
}
