import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contato } from '../Contato';
import { ApiContatoService } from '../api-contato.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent {
  public form! : FormGroup;
  public contato! : Contato;
  public id! : number;

  constructor(
      private apiContatoService : ApiContatoService,
      private router : Router,
      private route : ActivatedRoute
      ) {}

  ngOnInit(){
    this.criaForm();
  }

  get f() {
    return this.form.controls;
  }

  criaForm() {
    this.form = new FormGroup({
      id : new FormControl(''),
      nome : new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
      email : new FormControl('', [Validators.required, Validators.email])
    });

    this.id = this.route.snapshot.params['id'];

    if (this.id > 0){

      this.apiContatoService.buscar(this.id).subscribe(
          (resultado : Contato) => {
            this.contato = resultado;
            this.form.setValue({
              id : this.contato.id,
              nome : this.contato.nome,
              email : this.contato.email
            });
          }
        )
    }
  }

  salvar (){
    this.apiContatoService.criar(this.form.value)
      .subscribe(
        () => { 

          if (this.id > 0)           
            alert('Registro atualizado com sucesso');
          else
            alert('Registro incluído com sucesso');

          // retorna para a página do index
          this.router.navigateByUrl('contato/index')
        }
      );
  }
}
