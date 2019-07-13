import { Component, OnInit, Output, EventEmitter, Input, HostListener, HostBinding, ViewChild } from '@angular/core';
import { Magnitud } from 'src/app/classes/magnitud';
import { ChartsServiceService } from 'src/app/services/charts-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Perfil } from 'src/app/classes/perfil';
import { GraficaComponent } from '../grafica/grafica.component';

@Component({
  selector: 'app-configurar',
  templateUrl: './configurar.component.html',
  styleUrls: ['./configurar.component.css']
})
export class ConfigurarComponent implements OnInit {

 // we could pass lots of thing to the HostBinding function. 
  // like class.valid or attr.required etc.

  private magnitudes : Array<Magnitud>=[];
  private magnitud:Magnitud={id:0,nombre:"",listOfFloats:[]};
  private perfiles : Array<Perfil>=[];
  private perfil:Perfil={id:0,nombre:"",magnitudes:[]};
  private datos;

  @ViewChild(GraficaComponent) grafica: GraficaComponent;

  constructor(private servicio:ChartsServiceService) {
  }
  
  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos(){
    this.servicio.getMagnitudes().subscribe((data: Magnitud[]) =>{
      this.magnitudes=data;//Carga los datos en magnitudes
      console.log("Magnitudes al inicio:",data);
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


magnitudForm = new FormGroup({
  magnitud: new FormControl(''),
});
perfilForm = new FormGroup({
  perfil: new FormControl(''),
});
  //Selecciona una nombre desde el dropdown list y refresca el grafico en pantalla.
  public seleccionMagnitud(event){
    let index=event.target.selectedIndex;
    console.log("Seleccion:",this.magnitudes);
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
    console.log("Agregue: ",this.magnitudForm.get('magnitud').value,this.magnitudForm);
    let etiqueta=this.magnitudForm.get('magnitud').value;
    this.magnitudForm.get('magnitud').setValue('');
    let valores=this.grafica.getValores();
    console.log("agregar: ",this.servicio.nuevoMagnitud(valores,etiqueta));
    this.cargarDatos();
  }

  borrarMagnitud(){
    console.log("borrar",this.magnitud);
    this.servicio.borrarMagnitud(this.magnitud);
    this.cargarDatos();
  }

  salvarMagnitud(){
    console.log("salvar");
    this.servicio.editarMagnitud(this.magnitud);
  }

  //Funciones de perfil

  salvarPerfil(){}
  borrarPerfil(){}

  seleccionPerfil(event){
    let index=event.target.selectedIndex;
    console.log("Seleccion:",this.perfiles);
    if(event.target.length-1 == index){//Caso en que se seleccina una nueva nombre.
      console.log("Caso nuevo");
      this.perfil={id:null,nombre:"Nuevo",magnitudes:[]};
    }
    else{//Muestra los valores para la magnitud dada
      this.perfil=this.perfiles[index];
    }
  }

  agregarPerfil(){
    let perfil:Perfil={id:null,nombre:null,magnitudes:[]};
    console.log("Agregue: ",this.perfilForm.get('perfil').value);
    let nombre=this.perfilForm.get('perfil').value;
    this.perfilForm.get('perfil').setValue('');
    perfil.nombre=nombre;
    console.log("agregar: ",this.servicio.nuevoPerfil(perfil));
    this.cargarDatos();
  }
  
  asociarMagnitud(){
    let existeIndice=this.perfil.magnitudes.indexOf(this.magnitud);
    if(existeIndice!=-1)
      return;

    if(!this.perfil.magnitudes){
      this.perfil.magnitudes=[];}

    this.perfil.magnitudes.push(this.magnitud);
    this.servicio.editarPerfil(this.perfil);

  }

  desasociarMagnitud(magnitud){
    console.log("Desasociar: ",magnitud);
    let pos = this.perfil.magnitudes.indexOf(magnitud);
    console.log("Desasocie",pos,magnitud);
    this.perfil.magnitudes.splice(pos, 1);
    this.servicio.editarPerfil(this.perfil);
  }
}
