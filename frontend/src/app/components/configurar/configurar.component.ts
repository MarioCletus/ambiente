import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Usuario } from 'src/app/classes/usuario';
import { Perfil } from 'src/app/classes/perfil';
import { FormGroup, FormControl } from '@angular/forms';
import { GraficaComponent } from '../grafica/grafica.component';
import { Magnitud } from 'src/app/classes/magnitud';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { Router } from '@angular/router';
import { Calendario } from 'src/app/classes/calendario';
import { Cultivo } from 'src/app/classes/cultivo';


@Component({
  selector: 'app-configurar',
  templateUrl: './configurar.component.html',
  styleUrls: ['./configurar.component.css']
})
export class ConfigurarComponent implements OnInit {
  private datos;
  private usuario:Usuario=new Usuario();
  private existeUsuario=false;
  private perfiles:Array<Perfil>=[];
  private perfil:Perfil={nombre:'',id:null,magnitudes:[{listOfFloats:[],nombre:"",id:null}]};
  private magnitudes : Array<Magnitud>=[];
  private magnitud:Magnitud={id:0,nombre:"",listOfFloats:[]};
  private calendarios:Array<Calendario>=[];
  private calendario:Calendario={nombre:"",id:null,cultivo:null,date:new Date()};
  private cultivo:Cultivo={id:null,nombre:"",perfiles:[]};
  private cultivos:Array<Cultivo>=[];

  private calendarioForm = new FormGroup({
    calendario: new FormControl(''),
  });
  private perfilForm = new FormGroup({
    perfil: new FormControl(''),
  });
  private magnitudForm = new FormGroup({
    magnitud: new FormControl(''),
  });
  
  @ViewChild(GraficaComponent) grafica: GraficaComponent;

  constructor(private global:GlobalService,private servicio:BackendServiceService,private route:Router){}

  ngOnInit(){
    this.usuario=this.global.usuario;
    console.log("this.usuario",this.usuario);
    if(this.usuario){
        this.existeUsuario=true;
        this.cargarDatos();
    }
  }
//Funciones

cargarDatos(){
  this.servicio.getCalendario().subscribe((data: Calendario[]) =>{
    this.calendarios=data;//Carga los datos en magnitudes
    if(data.length){
      this.calendario=data[data.length-1];
    }
  });

  this.servicio.getMagnitudes().subscribe((data: Magnitud[]) =>{
    this.magnitudes=data;//Carga los datos en magnitudes
    if(data.length){
      this.magnitud=data[data.length-1];
      this.datos=data[data.length-1].listOfFloats;
    }
  });
  this.servicio.getPerfiles().subscribe((data: Perfil[]) =>{
    this.perfiles=data;//Carga los datos en Perfiles
    if(data.length){
      this.perfil=data[data.length-1];  
    }
  });
}

//Selecciona una nombre desde el dropdown list y refresca el grafico en pantalla.
public seleccionMagnitud(event){
  console.log("Seleccion de magnitud");
  let index=event.target.selectedIndex;
  this.magnitud=this.magnitudes[index];
  this.datos=this.magnitud.listOfFloats;
  this.grafica.setValores('chart component',this.magnitud.listOfFloats);
}

agregarMagnitud() {
  let nombre=this.magnitudForm.get('magnitud').value;
  console.log(nombre);
  let valores=this.grafica.getValores();
  this.magnitudForm.get('magnitud').setValue('');
  let magnitud:Magnitud=new Magnitud();
  magnitud.listOfFloats=valores;
  magnitud.nombre=nombre;
  this.servicio.usuarioAddMagnitud(this.usuario,magnitud).subscribe(()=>{this.cargarDatos()});
}

borrarMagnitud(){
  this.servicio.borrarMagnitud(this.magnitud).subscribe(()=>this.cargarDatos());
}

salvarMagnitud(){
  this.servicio.editarMagnitud(this.magnitud).subscribe();
}

//Funciones de perfil

salvarPerfil(){}
borrarPerfil(){}

seleccionPerfil(event){
  let index=event.target.selectedIndex;
  this.perfil=this.perfiles[index];
}

agregarPerfil(){
  let perfil:Perfil={id:null,nombre:null,magnitudes:[]};
  let nombre=this.perfilForm.get('perfil').value;
  this.perfilForm.get('perfil').setValue('');
  perfil.nombre=nombre;
  this.servicio.nuevoPerfil(perfil).subscribe(()=>this.cargarDatos())
}

asociarMagnitud(){
  let yaEstaAsociada=false;
  this.perfil.magnitudes.forEach(mag=>{
    if(mag.nombre==this.magnitud.nombre){
      yaEstaAsociada=true;
      return;
    }
  });
  if(yaEstaAsociada)
    return;
  if(!this.perfil.magnitudes){//Si perfil.magnitudes no existe lo creo vacio.
    this.perfil.magnitudes=[];}

  this.perfil.magnitudes.push(this.magnitud);
  this.servicio.editarPerfil(this.perfil).subscribe();

}

desasociarMagnitud(magnitud){
  let pos = this.perfil.magnitudes.indexOf(magnitud);
  this.perfil.magnitudes.splice(pos, 1);
  this.servicio.editarPerfil(this.perfil).subscribe();
}

nuevoCalendario(){
  let newCalendario:Calendario={id:null,nombre:this.calendarioForm.get('calendario').value,cultivo:null,date:new Date()};
  this.servicio.nuevoCalendario(newCalendario).subscribe(()=>{
      console.log("Nuevo calendario creado",newCalendario.id,newCalendario.nombre);
      this.cargarDatos();
    });
}

seleccionCalendario(event){
  let index=event.target.selectedIndex;
  this.calendario=this.calendarios[index];
}

seleccionCultivo(event){
  let index=event.target.selectedIndex;
  this.cultivo=this.cultivos[index];
}


}
