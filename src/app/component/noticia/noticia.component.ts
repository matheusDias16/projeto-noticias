import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiasService } from 'src/app/service/noticia.service';
import { Noticia } from 'src/app/model/noticia';
import { Categoria } from 'src/app/model/categoria';
import { Usuario } from 'src/app/model/usuario';
import { Comentario } from 'src/app/model/comentario';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss']
})
export class NoticiaComponent implements OnInit{

  idDaUrl: number = 0
  noticia: Noticia = new Noticia()
  categorias: Categoria[] = []
  autores: Usuario[] = []
  comentarios: Comentario[] = []

  constructor(
    private rotaAtiva: ActivatedRoute,
    private apiNoticias: NoticiasService
  ){}

  ngOnInit(): void {
    this.idDaUrl = this.rotaAtiva.snapshot.params['id']
    this.pegaInfo()
  }

  pegaInfo(): void {
    this.apiNoticias.getCategorias().subscribe( (categorias) => {
      this.categorias = categorias

      this.apiNoticias.getUsuarios().subscribe( (usuarios) => {
        this.autores = usuarios

        this.apiNoticias.getNoticiaPeloId(this.idDaUrl).subscribe( (data) => {
          this.noticia = data
          console.log(data)
        })
        this.apiNoticias.getComentarioPorPost(this.idDaUrl).subscribe((comentarios) => {
          this.comentarios = comentarios
        })

      })


    })
  }

  findCategoria(id: number): string {
    let categ = this.categorias.find((obj) => obj.id == id)
    if(categ){
      return categ.categoria
    } else {
      return ''
    }
  }

  findAutor(id: number): string {
    let autor = this.autores.find((obj) => obj.id == id)
    if(autor){
      return autor.nomeCompleto
    } else {
      return ''
    }
  }

  converteHoras(isoData: string): string{
    let data = new Date(isoData)
    // 10/07/2023 10h45
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} ${data.getHours()}h${data.getMinutes()}`
  }

}