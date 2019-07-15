import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { Usuario } from 'src/app/classes/usuario';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  userForm = new FormGroup({
    nombreUsuario: new FormControl(''),
    passWord: new FormControl('')
  });
  
  constructor(private formBuilder: FormBuilder,private servicio:BackendServiceService ) { }
  ngOnInit() {
 /*   this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]]
    });*/
  }

  onSubmit(){
    if(this.userForm.valid){
      console.log(this.userForm.get('nombreUsuario').value);
      console.log(this.userForm.get('passWord').value);
      let usuario:Usuario={id:null,nombre:'',apellido:'',password:this.userForm.get('passWord').value,userName:this.userForm.get('nombreUsuario').value};
      this.servicio.isRegistered(usuario);
    }
  }
  Registrar(){
    
  }
}
