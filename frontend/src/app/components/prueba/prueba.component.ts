import { Component, OnInit } from '@angular/core';
import { Magnitud } from 'src/app/classes/magnitud';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { Calendario } from 'src/app/classes/calendario';
import { Perfil } from 'src/app/classes/perfil';
import { Usuario } from 'src/app/classes/usuario';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  misDatos;
  constructor(private service:BackendServiceService) { }

  ngOnInit() {
    let magnitudes:Array<Magnitud>;
    this.service.getMagnitudes().subscribe((data:Magnitud[])=>{magnitudes=data;
      this.misDatos=magnitudes[0].listOfFloats;
    });

  }

  click(){
    console.log("Creando nuevo cultivo");
    this.service.nuevoCultivo({id:null,nombre:"Nuevo Cultivo",perfiles:[]}).subscribe();
 
    this.misDatos=[100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100];
    let calendario:Calendario=new Calendario();
    let fecha:Date=new Date();
    calendario.date=fecha;
    calendario.nombre="Mi Calendario";
    console.log("Prueba");
    let miPerfil:Perfil={id:null,nombre:"MiPerfilDePrueba",magnitudes:[]};
    this.service.nuevoPerfil(miPerfil).subscribe(()=>{console.log("Creé el perfil"); 
        calendario.perfiles=[miPerfil];
        this.service.nuevoCalendario(calendario).subscribe(()=>{
            this.service.getCalendario().subscribe((cal:Array<Calendario>)=>{
                console.log("Cantidad de calendarios:",cal.length);
                let usuarios:Array<Usuario>;
                this.service.getUsuarios().subscribe((data:Array<Usuario>)=>{
                    usuarios=data;
                    console.log("What!!");
                    let usuario:Usuario;
                    usuario=usuarios.pop();
                    if(!usuario.calendarios)
                      usuario.calendarios=[];
                    usuario.calendarios.push(cal[0]);
                    usuario.userName='Va-nina';
                    console.log("Hasta acá bien",usuario);
                    this.service.editarUsuario(usuario).subscribe(()=>{
                        console.log("Usuario actualizado",usuario);
                        this.service.getUsuarios().subscribe((user:Array<Usuario>)=>console.log("usuario:",user.pop()));
                    });
                });
            });
        });
    });
  }

}
