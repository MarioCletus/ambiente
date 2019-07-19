import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { GlobalService } from 'src/app/services/global.service';
import { Calendario } from 'src/app/classes/calendario';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nuevo-calendario',
  templateUrl: './nuevo-calendario.component.html',
  styleUrls: ['./nuevo-calendario.component.css']
})
export class NuevoCalendarioComponent implements OnInit {

  private userForm = new FormGroup({
    nombre: new FormControl(''),
  });
  private registro=false;
  private estaRegistrado=false;
  


  
  constructor(private formBuilder: FormBuilder,private servicio:BackendServiceService,private global:GlobalService,private router:Router) { }
  ngOnInit() {

  }

  onSubmit(){
    if(this.userForm.valid){
      let calendario:Calendario={id:null,nombre:'',perfiles:[],date:new Date()};
      this.servicio.nuevoCalendario(calendario).subscribe(()=>{
        if(this.global.hayUsuario){
          this.servicio.editarUsuario(this.global.usuario).subscribe(()=>
          this.router.navigate(['/Configurar'])  
          );
        }
        else
          this.router.navigate(['/Principal'])
      });

    }
  }
}
