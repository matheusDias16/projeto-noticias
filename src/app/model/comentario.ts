export class Comentario {

    public id: number
    public texto: string
    public postId: number
    public autor: number
    public data: string
    public like: number[]
  
    constructor() {
      this.id = 0
      this.texto = ''
      this.postId = 0
      this.autor = 0
      this.data = ''
      this.like = []
    }
  
  }