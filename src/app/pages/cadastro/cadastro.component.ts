import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { PessoaUsuaria } from 'src/app/core/types/type';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  perfilComponent=false;

constructor(
  private formularioService: FormularioService,
  private cadastroService: CadastroService,
  private router: Router
){

}
  cadastrar(){
    const formCadastro = this.formularioService.getCadastro()

    if(formCadastro?.valid){
      const novoCadastro = formCadastro.getRawValue() as PessoaUsuaria;
      console.log(novoCadastro);

      this.cadastroService.cadastrar(novoCadastro).subscribe({
        next: (value) => {
        },
        error: (err) => {
          console.log("erro ao realizar cadastro", err)
          this.router.navigate(['/login'])
        }
      })
    }

  }
}
