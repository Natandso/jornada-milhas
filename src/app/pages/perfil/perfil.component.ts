import { FormularioService } from './../../core/services/formulario.service';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { TokenService } from './../../core/services/token.service';
import { PessoaUsuaria } from './../../core/types/type';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit{
titulo = 'Olá ';
textoBotao = 'ATUALIZAR'
perfilComponent = true;

token = '';
nome = '';
cadastro!: PessoaUsuaria;
form!: FormGroup<any>| null;

constructor(
  private tokenService: TokenService,
  private cadastroService: CadastroService,
  private formularioService: FormularioService,
  private router: Router,
  private userService: UserService,
){}

  ngOnInit(): void {
    this.token = this.tokenService.retornarToken();
    this.cadastroService.buscarCadastro().subscribe(cadastro => {
      this.cadastro = cadastro;
      this.nome = this.cadastro.nome;
      this.carregarFormulario();
    })
  }


  carregarFormulario() {
    this.form = this.formularioService.getCadastro();
    this.form?.patchValue({
      nome: this.cadastro.nome,
      nascimento: this.cadastro.nascimento,
      cpf: this.cadastro.cpf,
      telefone: this.cadastro.telefone,
      email: this.cadastro.email,
      senha: this.cadastro.senha,
      cidade: this.cadastro.cidade,
      estado: this.cadastro.estado,
      genero: this.cadastro.genero,
    })
  }
  atualizar(){
   const dadosAtualizados = {
    nome: this.form?.value.nome,
    nascimento: this.form?.value.nascimento,
    cpf: this.form?.value.cpf,
    telefone: this.form?.value.telefone,
    email: this.form?.value.email,
    senha: this.form?.value.senha,
    cidade: this.form?.value.cidade,
    estado: this.form?.value.estado,
    genero: this.form?.value.genero,
   }

   this.cadastroService.editarCadastro(dadosAtualizados).subscribe({
    next: () => {
      alert('Cadastro realizado com sucesso')
      this.router.navigate(['/'])
    },
    error: (err) => {
      console.log('Erro ao atualizar o cadastro', err)
    }
   })

  }

deslogar(){
this.userService.logout();
this.router.navigate(['/login'])

}


}
