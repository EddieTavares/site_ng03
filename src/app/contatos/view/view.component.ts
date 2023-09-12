import { Component } from '@angular/core';
import { Contato } from '../Contato';
import { ApiContatoService } from '../api-contato.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html'
})


export class ViewComponent {
  id! : number;
  contato! : Contato;
  
  constructor(
    private apiContatoService : ApiContatoService,
    private route : ActivatedRoute  
  ){}

  ngOnInit() : void {
    this.buscar();
  }

  buscar(){

    debugger;

    this.id = this.route.snapshot.params['id'];

    this.apiContatoService.buscar(this.id)
      .subscribe( res => {this.contato = res} );
  }
}
