import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { NoticiasService } from 'src/app/service/noticia.service';
import { Usuario } from 'src/app/model/usuario';
import { Login } from 'src/app/model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin = new FormGroup({
    user: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required])
  })
  isSignUp: boolean = false;
  formSignUp = new FormGroup({
    user: new FormControl('', [Validators.required]),
    nomeCompleto: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),
    confirmPass: new FormControl('', [Validators.required]),
  })

  constructor(
    private apiNoticia: NoticiasService
  ){}

  ngOnInit(): void{

  }

  fazLogin(): void{
    if(this.formLogin.value.user && this.formLogin.value.pass){
      this.apiNoticia.fazerLogin(this.formLogin.value.user, this.formLogin.value.pass).subscribe((respLogin) => {
        if(respLogin.length > 0){
          console.log('LOGADO')
          localStorage.setItem('idUser', String(respLogin[0].idUsuario))
          this.apiNoticia.getUsuarioPorId(respLogin[0].idUsuario).subscribe((respUsuario) => {
            localStorage.setItem('nameUser', String(respUsuario.nomeCompleto))
            localStorage.setItem('typeUser', respUsuario.tipo)
          })
        } else {
          console.log('FALHA NO LOGIN')
        }
      })
    }
  }

  mudaSignUp(): void{
    if(this.isSignUp){
      this.isSignUp = false
    } else {
      this.isSignUp = true
    }
  }

  criaLogin(): void{
    if(this.formSignUp.value.user && this.formSignUp.value.nomeCompleto){
      let usuarioToSend: Usuario = {
        id: 0,
        username: this.formSignUp.value.user,
        nomeCompleto: this.formSignUp.value.nomeCompleto,
        tipo: 'cliente'
      }
      this.apiNoticia.postCriaUsuario(usuarioToSend).subscribe((usuario) => {
        if(this.formSignUp.value.user && this.formSignUp.value.pass){
          let loginToSend: Login = {
            id: 0,
            username: this.formSignUp.value.user,
            senha: this.formSignUp.value.pass,
            idUsuario: usuario.id
          }
          this.apiNoticia.postCriaLogin(loginToSend).subscribe((login) => {
            alert('Usuário criado!')
            this.isSignUp = false
          })
        }
      })
    } else {
      alert('Preencha o formulário corretamente!')
    }
  }

}