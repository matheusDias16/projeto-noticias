import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Corpo } from 'src/app/model/corpo';
import { Noticia } from 'src/app/model/noticia';
import { NoticiasService } from 'src/app/service/noticia.service';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit{
  modalAberto: boolean = false;
  edicaoNoticia: boolean = false;
  formularioNoticia: FormGroup;
  noticias:Noticia[] = []
  idDaUrl: number = 0
  categorias:Categoria[]=[]
  idDaEdicao: Number = 0;

  constructor(
    private apiNoticia: NoticiasService,
    private rotaAtiva: ActivatedRoute,
  ){
    this.formularioNoticia = new FormGroup({
      
      subtitulo: new FormControl('', [Validators.required]),
      manchete: new FormControl('', [Validators.required]),
      autor: new FormControl('', [Validators.required]),
      dataPublicacao: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      informacao: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      imagemPrincipal: new FormControl('', [Validators.required]),
    })
  }
  
  ngOnInit(): void{
    this.todasNoticias()
    this.idDaUrl = Number(this.rotaAtiva.snapshot.params['id'])
    // this.pegarInfos()
    this.todasCategorias()

  }
  abreModal(): void {
    this.formularioNoticia.controls['subtitulo'].setValue('')
    this.formularioNoticia.controls['manchete'].setValue('')
    this.modalAberto = true
    this.edicaoNoticia = false
  }
  abreModalEditar(idDaNoticia : Number): void {
    this.apiNoticia.getNoticiaPeloId(idDaNoticia).subscribe((respApi) =>{
      this.formularioNoticia.controls['subtitulo'].setValue(respApi.subtitulo)
      this.formularioNoticia.controls['manchete'].setValue(respApi.manchete)
      this.idDaEdicao = idDaNoticia
      this.edicaoNoticia = true
      this.modalAberto = true
    })
  }

  fechaModal(): void {
    this.modalAberto = false
  }
  criaNoticia():void{
    let noticiaNova = new Noticia()
    noticiaNova.subtitulo = this.formularioNoticia.value.subtitulo
    noticiaNova.manchete = this.formularioNoticia.value.manchete
    noticiaNova.dataPublicacao = this.dataEmISOString()
    noticiaNova.categoria= this.formularioNoticia.value.categoria
    noticiaNova.autor = Number(localStorage.getItem("idUser")),
    noticiaNova.imagemPrincipal = this.formularioNoticia.value.imagemPrincipal

    let corpoNoticia = new Corpo
    corpoNoticia.informacao = this.formularioNoticia.value.informacao
    corpoNoticia.tipo = this.formularioNoticia.value.tipo
    noticiaNova.corpo.push(corpoNoticia)

    this.apiNoticia.CriarNovaNoticia( noticiaNova ).subscribe( (data) => {
      alert('Postagem criada!')
    })
   
  }
  dataEmISOString(): string {
    let agora =  new Date()
    return agora.toISOString()
  }
todasNoticias(){
  this.apiNoticia.getTodasNoticias().subscribe((respApi) => {
    this.noticias = respApi
  })
}
todasCategorias(){
  this.apiNoticia.getCategorias().subscribe((respApi)=>{
    this.categorias = respApi

  })
}
  deletarNoticia(id: Number): void {
    this.apiNoticia.deleteNoticia(id).subscribe((respApi) => {
      this.todasNoticias()
    })
  }
  finalizarFormulario(): void {
    let noticiaParaEnviar: Noticia = new Noticia
    noticiaParaEnviar.subtitulo = this.formularioNoticia.value.subtitulo
    noticiaParaEnviar.manchete = this.formularioNoticia.value.manchete
    noticiaParaEnviar.dataPublicacao = this.dataEmISOString()
    noticiaParaEnviar.categoria= this.formularioNoticia.value.categoria
    noticiaParaEnviar.autor = Number(localStorage.getItem("idUser")),
    noticiaParaEnviar.imagemPrincipal = this.formularioNoticia.value.imagemPrincipal
   
    if( this.edicaoNoticia == true ){
      
      noticiaParaEnviar.id = this.idDaEdicao
      this.apiNoticia.editaNoticia(noticiaParaEnviar).subscribe( (respApi) => {
        this.todasNoticias()
        this.modalAberto = false
      })
    } else {
      this.apiNoticia.CriarNovaNoticia(noticiaParaEnviar).subscribe((respApi) => {
        this.todasNoticias()
        this.modalAberto = false
      })
    }
  }
  }
  
 

