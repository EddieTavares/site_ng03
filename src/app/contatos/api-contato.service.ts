import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Contato } from './Contato';

@Injectable({
  providedIn: 'root'
})

export class ApiContatoService {

  url: string = "http://localhost:8083";

  constructor(private http : HttpClient) { }

  // autenticar() : string {
  //   return  this.http.get<string>(usuario, senha);
  // }

  listar() : Observable<Contato[]> {
    return this.http.get<Contato[]>(this.url);
  } 

  criar(contato : Contato) : Observable<any> {
    if (contato.id > 0)
    {
      return this.http.post<Contato>(this.url + "/atualizar", contato)
    } 
    return this.http.post<Contato>(this.url + "/add", contato)
  }

  excluir(id : number) : Observable<any> {
    return this.http.get<any>(this.url + "/deletar/" + id);
  }

  buscar(id : number) : Observable<any> {
    return this.http.get<Contato>(this.url + "/" + id);
  }
}
