import { Noticia } from "./noticia";
import { Categoria } from "./categoria";

export class NoticiasCategoria {
  public categoria: Categoria;
  public noticias: Noticia[];

  constructor(){
    this.categoria = new Categoria()
    this.noticias = []
  }
}
