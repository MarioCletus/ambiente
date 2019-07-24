import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { Usuario } from 'src/app/classes/usuario';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  userForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    nombreUsuario: new FormControl(''),
    passWord: new FormControl('')
  });
  registro=false;
  estaRegistrado=false;
  
  constructor(private formBuilder: FormBuilder,private servicio:BackendServiceService,private global:GlobalService ,private route:Router) { }
  ngOnInit() {
/*    this.userForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      apellido: ['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]]
      email: ['', [Validators.required, Validators.email]]
    });*/
  }

  /*********************************************************************************
   * Chequeo si los datos de usuario ingresados son correctos. Si lo son inicializo
   * el usuario global en el serivico global.
   *********************************************************************************/
  onSubmit(){
    if(this.userForm.valid){
      let usuario:Usuario=new Usuario();
      usuario.password=this.userForm.get('passWord').value;
      usuario.userName=this.userForm.get('nombreUsuario').value;
      this.servicio.isRegistered(usuario).subscribe((respuesta:Usuario)=>{usuario=respuesta
          if(usuario){
            console.log("Esta registrado",usuario);
            this.global.usuario=usuario;
            this.global.hayUsuario=true;
            this.userForm.get('passWord').setValue('');
            this.userForm.get('nombreUsuario').setValue('');
            this.route.navigate(['Principal']);
          }
          else{
            console.log("No esta registrado");
            this.global.usuario=null;
            this.global.hayUsuario=false;
          }
      });
    }
  }
  registrar(){
    this.registro=true;
  }

  
  guardarUsuario(){
    let usuario:Usuario=new Usuario();
    usuario.nombre=this.userForm.get('nombre').value;
    usuario.apellido=this.userForm.get('apellido').value;
    usuario.userName=this.userForm.get('nombreUsuario').value;
    usuario.password=this.userForm.get('passWord').value;
    usuario.cultivos=[];
    usuario.calendarios=[];
    usuario.magnitudes=[];
    usuario.perfiles=[];
    this.servicio.nuevoUsuario(usuario).subscribe(()=>{console.log("Se creo el usuario",usuario.userName)});

    this.userForm.get('nombre').setValue('');
    this.userForm.get('apellido').setValue('');
    this.userForm.get('nombreUsuario').setValue('');
    this.userForm.get('passWord').setValue('');

    this.registro=false;
  }
  cancelRegistro(){
    this.registro=false;
  }
}
