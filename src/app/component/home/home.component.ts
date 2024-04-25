import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/categoria';
import { Noticia } from 'src/app/model/noticia';
import { NoticiasCategoria } from 'src/app/model/noticias-categoria';
import { NoticiasService } from 'src/app/service/noticia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ultimasNoticias: Noticia[] = []
  categorias: Categoria[] = []
  noticiaPorCategoria: NoticiasCategoria[] = []
  

  constructor(
    private noticiaApi: NoticiasService
  ){}

  ngOnInit(): void {
    
    this.pegaCategorias()
    this.pegaNoticias()
  }

  pegaCategorias(): void{
    // chama a API para pegar todas as categorias
    this.noticiaApi.getCategorias().subscribe( (categorias) => {
      this.categorias = categorias
      // para cada categoria vai fazer uma chamada pegando as 3 noticias mais novas de cada categoria
      for(let categ of this.categorias){
        this.noticiaApi.getUltimas3NoticiasPorCategoria(categ.id).subscribe((noticiasResp) => {
          console.log(noticiasResp)
          // cria um objeto no modelo NoticiasCategoria para guardar na variavel
          let noticiaCategoria: NoticiasCategoria = {
            categoria: categ,
            noticias: noticiasResp
          }
          this.noticiaPorCategoria.push(noticiaCategoria)
          console.log(this.noticiaPorCategoria)
        })
      }
    })
  }

  pegaNoticias(): void{
    this.noticiaApi.getUltimas3Noticias().subscribe( (respNoticias) => {
      this.ultimasNoticias = respNoticias
      // console.log(this.ultimasNoticias)
    })
  }

}