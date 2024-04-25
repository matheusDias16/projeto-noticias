import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Corpo } from 'src/app/model/corpo';
import { Noticia } from 'src/app/model/noticia';
import { NoticiasService } from 'src/app/service/noticia.service';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';

@Component({
  selector: 'app-crud-categorias',
  templateUrl: './crud-categorias.component.html',
  styleUrls: ['./crud-categorias.component.scss']
})
export class CrudCategoriasComponent implements OnInit{
  modalAberto: boolean = false;
  formularioCategoria: FormGroup;
  idDaUrl: number = 0
  categorias:Categoria[]=[]
  constructor(
    private apiNoticia: NoticiasService,
    private rotaAtiva: ActivatedRoute,
  ){
    this.formularioCategoria= new FormGroup({
      corTexto: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
    })
  }
  
  ngOnInit(): void{
   
    this.idDaUrl = Number(this.rotaAtiva.snapshot.params['id'])
    this.todasCategorias()

  }
  abreModal(): void {
    this.formularioCategoria.controls['categoria'].setValue('')
    this.modalAberto = true
  }

  fechaModal(): void {
    this.modalAberto = false
  }
  criaCategoria():void{
    let categoriaNova = new Categoria()
    // categoriaNova.corTexto = this.formularioCategoria.value.corTexto
    categoriaNova.categoria= this.formularioCategoria.value.categoria
    // categoriaNova.id = Number(localStorage.getItem("idUser")),
   

    this.apiNoticia.CriarNovaCategoria( categoriaNova ).subscribe( (data) => {
      alert('Postagem criada!')
    })
   
  }
  dataEmISOString(): string {
    let agora =  new Date()
    return agora.toISOString()
  }
// todasNoticias(){
//   this.apiNoticia.getTodasNoticias().subscribe((respApi) => {
//     this.noticias = respApi
//   })
// }
todasCategorias(){
  this.apiNoticia.getCategorias().subscribe((respApi)=>{
    this.categorias = respApi

  })
}
  deletarCategoria(id: number): void {
    this.apiNoticia.deleteCategoria(id).subscribe((respApi) => {
      this.todasCategorias()
    })
  }
  // pegarInfos(): void{
  //   this.apiNoticia.getNoticiaPorCategoria(this.idDaUrl).subscribe( (respNoticias) => {
  //     this.noticias = respNoticias
  //   })
  // }
  }
  
 

