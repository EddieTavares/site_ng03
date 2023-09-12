import { Component } from '@angular/core';
import { Contato } from '../Contato';
import { ApiContatoService } from '../api-contato.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent {

  contatos! : Contato[];

  constructor(private apiContatoService : ApiContatoService) {}

  ngOnInit() : void {
    this.listar();
  }

  listar() {
    this.apiContatoService.listar()
      .subscribe(result => {this.contatos = result;})
  }

  excluir(id  : number){
    if (confirm("Deseja excluir o registro?")) {
      this.apiContatoService.excluir(id)
      .subscribe( () => {this.listar()})
    }
  }
}
