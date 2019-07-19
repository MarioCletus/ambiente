import { Component, OnInit, ViewChild } from '@angular/core';
import { Magnitud } from 'src/app/classes/magnitud';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Perfil } from 'src/app/classes/perfil';
import { GraficaComponent } from '../grafica/grafica.component';

@Component({
  selector: 'app-prueba-config',
  templateUrl: './prueba-config.component.html',
  styleUrls: ['./prueba-config.component.css']
})
export class PruebaConfigComponent implements OnInit {

  private magnitudes : Array<Magnitud>=[];
  private magnitud:Magnitud={id:0,nombre:"",listOfFloats:[]};
  private perfiles : Array<Perfil>=[];
  private perfil:Perfil={id:0,nombre:"",magnitudes:[]};
  private datos;

  magnitudForm = new FormGroup({
    magnitud: new FormControl(''),
  });
  perfilForm = new FormGroup({
    perfil: new FormControl(''),
  });
  
  @ViewChild(GraficaComponent) grafica: GraficaComponent;

  constructor(private servicio:BackendServiceService) {
    this.cargarDatos();
  }
  
  ngOnInit(){
    this.cargarDatos();
  }

  cargarDatos(){
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
    let index=event.target.selectedIndex;
    if(event.target.length-1 == index){//Caso en que se seleccina una nueva nombre.
      this.magnitud={id:null,listOfFloats:[],nombre:"Nuevo"};
    }
    else{//Muestra los valores para la magnitud dada
      this.magnitud=this.magnitudes[index];
      this.datos=this.magnitud.listOfFloats;
      this.grafica.setValores('chart component',this.magnitud.listOfFloats);
    }
  }

  agregarMagnitud() {
    let titulo=this.magnitudForm.get('magnitud').value;
    let valores=this.grafica.getValores();
    this.magnitudForm.get('magnitud').setValue('');
    this.servicio.nuevoMagnitud(valores,titulo).subscribe(()=>this.cargarDatos());
    this.cargarDatos();
  }

  borrarMagnitud(){
    this.servicio.borrarMagnitud(this.magnitud).subscribe(()=>this.cargarDatos());
    this.cargarDatos();
  }

  salvarMagnitud(){
    this.servicio.editarMagnitud(this.magnitud).subscribe();
  }

  //Funciones de perfil

  salvarPerfil(){}
  borrarPerfil(){}

  seleccionPerfil(event){
    let index=event.target.selectedIndex;
    if(event.target.length-1 == index){//Caso en que se seleccina una nueva nombre.
      this.perfil={id:null,nombre:"Nuevo",magnitudes:[]};
    }
    else{//Muestra los valores para la magnitud dada
      this.perfil=this.perfiles[index];
    }
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

}
