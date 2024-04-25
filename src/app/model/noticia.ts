import { Corpo } from "./corpo"


export class Noticia {
  
  public id: Number
  public manchete: string
  public subtitulo: string
  public dataPublicacao: string
  public imagemPrincipal: string
  public corpo: Corpo[]
  public autor: number
  public categoria: number

  constructor(){
    
    this.id = 0
    this.manchete = ''
    this.subtitulo = ''
    this.dataPublicacao = ''
    this.imagemPrincipal = ''
    this.corpo = []
    this.autor = 0
    this.categoria = 0
  }

}