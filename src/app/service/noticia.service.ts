import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../model/noticia';
import { Categoria } from '../model/categoria';
import { Usuario } from '../model/usuario';
import { Comentario } from '../model/comentario';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private http: HttpClient ) { }

  readonly urlDaApi: string = 'http://localhost:3000';

  getTodasNoticias(): Observable<Noticia[]>{
    return this.http.get<Noticia[]>(`${this.urlDaApi}/noticias`)
  }

  getUltimas3Noticias(): Observable<Noticia[]>{
    return this.http.get<Noticia[]>(`${this.urlDaApi}/noticias?_sort=dataPublicacao&_order=desc&_limit=3`)
  }

  getUltimas3NoticiasPorCategoria(idCategoria: Number): Observable<Noticia[]>{
    return this.http.get<Noticia[]>(`${this.urlDaApi}/noticias?_sort=dataPublicacao&_order=desc&_limit=3&categoria=${idCategoria}`)
  }
  // http://localhost:3000/noticias?_sort=dataPublicacao&_order=desc&_limit=3&categoria=2
  // _sort=PROPRIEDADE | para ordenar os itens pela propriedade informada
  // _order=asc ou _order=desc | para ordenar por ascendente ou decrescente
  // _limit=NUMERO | para colocar um limite máxima de itens que voltarão
  // categoria | para filtrar as noticias somente pela categoria enviada

  getNoticiaPeloId(id: Number): Observable<Noticia>{
    return this.http.get<Noticia>(`${this.urlDaApi}/noticias/${id}`)
  }

  getNoticiaPorCategoria(idCategoria: Number): Observable<Noticia[]>{
    return this.http.get<Noticia[]>(`${this.urlDaApi}/noticias?categoria=${idCategoria}`)  // http://localhost:3000/noticias?categoria=2
  }

  getNoticiaPorAutor(idAutor: Number): Observable<Noticia[]>{
    return this.http.get<Noticia[]>(`${this.urlDaApi}/noticias?autor=${idAutor}`) 
  }

  getNoticiaPorAutorECategoria(idAutor: Number, idCategoria: Number): Observable<Noticia[]>{
    return this.http.get<Noticia[]>(`${this.urlDaApi}/noticias?autor=${idAutor}&categoria=${idCategoria}`) 
  }

  // API CATEGORIAS
  getCategorias(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.urlDaApi}/categorias`) 
  }

  getCategoriaPeloId(id:Number): Observable<Categoria>{
    return this.http.get<Categoria>(`${this.urlDaApi}/categorias/${id}`)
  }

  // API AUTORES / USUARIOS
  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.urlDaApi}/usuarios`)
  }

  getUsuarioPorId(id: Number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlDaApi}/usuarios/${id}`)
  }

  postCriaUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.urlDaApi}/usuarios`, usuario)
  }

  // API COMENTARIOS
  getComentarioPorPost(postId: Number): Observable<Comentario[]>{
    return this.http.get<Comentario[]>(`${this.urlDaApi}/comentarios?postId=${postId}`)
  }

  // API LOGIN
  fazerLogin(username: string, senha: string): Observable<Login[]>{
    return this.http.get<Login[]>(`${this.urlDaApi}/fazerLogin?username=${username}&senha=${senha}`) // http://localhost:3000/fazerLogin?username=andersonDias&senha=123abc
  }

  postCriaLogin(login: Login): Observable<Login>{
    return this.http.post<Login>(`${this.urlDaApi}/fazerLogin`, login)
  }
  deleteNoticia( idDaNoticia: Number ): Observable<Noticia>{
    return this.http.delete<Noticia>(`${this.urlDaApi}/noticias/${idDaNoticia}`)  }

  CriarNovaNoticia( noticiaNova: Noticia ): Observable<Noticia>{
      return this.http.post<Noticia>(`${this.urlDaApi}/noticias`, noticiaNova) // Passamos URL e o objeto do novo produto
    }
  CriarNovaCategoria( noticiaNova: Categoria ): Observable<Categoria>{
      return this.http.post<Categoria>(`${this.urlDaApi}/categorias`, noticiaNova) // Passamos URL e o objeto do novo produto
    }
  deleteCategoria( idDaNoticia: Number ): Observable<Categoria>{
      return this.http.delete<Categoria>(`${this.urlDaApi}/categorias/${idDaNoticia}`) 
     }
  editaNoticia( noticiaAlterada:Noticia ): Observable<Noticia>{
        return this.http.put<Noticia>(`${this.urlDaApi}/noticias/${noticiaAlterada.id}`, noticiaAlterada)
      }
  
}