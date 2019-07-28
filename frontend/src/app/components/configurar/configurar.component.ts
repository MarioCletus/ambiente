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
import { IgxCalendarComponent, IgxDialogComponent } from 'igniteui-angular';
import { forEach } from '@angular/router/src/utils/collection';
import { Dia } from 'src/app/classes/dia';


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
  private cultivo:Cultivo=new Cultivo();//{id:null,nombre:"",perfiles:[]};
  private cultivos:Array<Cultivo>=[];
  private todosLosPerfiles=true;
  private todosLasMagnitudes=true;
  private selMag=false;     //Variable para activar a o desactivar botones de salvar Magnitudes.
  private selCultivo=false; //Variable para activar a o desactivar botones de salvar Cultivo.
  private selPerfil=false;  //Variable para activar a o desactivar botones de salvar Perfil.

  
  @ViewChild("calendar") public calendar: IgxCalendarComponent;
  
  private calendarioForm = new FormGroup({
    calendario: new FormControl('')
  });
  private perfilForm = new FormGroup({
    perfil: new FormControl('')
  });
  private magnitudForm = new FormGroup({
    magnitud: new FormControl('')
  });
  private cultivoForm = new FormGroup({
    cultivo: new FormControl('')
  });

  
  @ViewChild(GraficaComponent) grafica: GraficaComponent;

  constructor(private global:GlobalService,private servicio:BackendServiceService,private route:Router){}

  ngOnInit(){
    this.usuario=this.global.usuario;
    console.log("this.usuario",this.usuario);
    if(this.usuario){
        this.existeUsuario=true;
        this.cargarDatos();
        if(!this.usuario.magnitudes || this.usuario.magnitudes.length==0){
          this.datos=[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10];
        }
    }
  }
//Funciones

cargarDatos(){
  this.servicio.getCalendarioUsuario(this.global.usuario).subscribe((data: Calendario[]) =>{
    this.calendarios=data;//Carga los datos en magnitudes
    if(data.length){
      this.calendario=data[data.length-1];
    }
  });

  if(this.todosLasMagnitudes){
    console.log("Muestro todas las magnitudes");
    this.servicio.getMagnitudUsuario(this.global.usuario).subscribe((data: Magnitud[]) =>{
      this.magnitudes=data;//Carga los datos en magnitudes
      if(data.length){
        this.magnitud=data[data.length-1];
        this.datos=data[data.length-1].listOfFloats;
        this.selMag=false;
      }
      else{
        this.selMag=true;
      }
    });
  }
  
  if(this.todosLosPerfiles){
    this.servicio.getPerfilesUsuario(this.global.usuario).subscribe((data: Perfil[]) =>{
      this.perfiles=data;//Carga los datos en Perfiles
      if(data.length){
        this.selPerfil=false;
        this.perfil=data[data.length-1];  
      }
      else{
        this.selPerfil=true;
      }
    });
  }

  this.servicio.getCultivoUsuario(this.global.usuario).subscribe((data: Cultivo[]) =>{
    this.cultivos=data;//Carga los datos en cultivo
    if(data.length){
      this.selCultivo=false;
      this.cultivo=data[data.length-1];
      if(!this.todosLosPerfiles){
        this.servicio.getPerfilesCultivo(this.cultivo).subscribe((listPerfiles:Perfil[])=>{
          this.perfiles=listPerfiles;
        });
        console.log("getCultivoUsuario",this.perfiles);
      }
      if(this.perfiles.length){
        this.selPerfil=false;
        if(!this.todosLasMagnitudes){
          this.servicio.getMagnitudesPerfil(this.perfil).subscribe((data: Magnitud[]) =>{
            this.magnitudes=data;//Carga los datos en magnitudes
            if(data.length){
              this.magnitud=data[data.length-1];
              this.datos=data[data.length-1].listOfFloats;
              this.selMag=false;
            }
            else{
              this.selMag=true;
            }
          });
        }
      }
      else
        this.selPerfil=true;
    }
    else{
      this.selCultivo=true;
    }
  });
}
/***************************************************************
 *Selecciona una nombre desde el dropdown list y refresca 
 el grafico en pantalla. 
 ***************************************************************/
public seleccionMagnitud(event){
  console.log("Seleccion de magnitud",event.target.value);
  let index=event.target.selectedIndex;
  if(index){
    index--;
    this.magnitud=this.magnitudes[index];
    this.datos=this.magnitud.listOfFloats;
    this.grafica.setValores('chart component',this.magnitud.listOfFloats);
    this.selMag=false;
  }
  else{
    this.selMag=true;
  }
}
/*****************************************************
 * Se agrega la magnitud con los valores de la grafica 
 * y el nombre que se escribe en el input magnitudForm
 * La magnitud estará asociada al usuario global.
 ****************************************************/
agregarMagnitud() {
  let nombre=this.magnitudForm.get('magnitud').value;
  console.log(nombre);
  let valores=this.grafica.getValores();
  this.magnitudForm.get('magnitud').setValue('');
  let magnitud:Magnitud=new Magnitud();
  magnitud.listOfFloats=valores;
  magnitud.nombre=nombre;
  this.servicio.usuarioAddMagnitud(this.usuario,magnitud).subscribe(()=>{
    this.servicio.getUsuario(this.usuario.id).subscribe((usr:Usuario)=>{
      this.usuario=usr;
      this.global.usuario=this.usuario;
      console.log("Usuario en agregar magnitud:",this.usuario,this.global.usuario);
      this.cargarDatos()
    });
  });
}

/*******************************************************************
 * Borra la magnitud this.magnitud del usuario y la base de datos.
 * Como está asociada al usuario primero hay que borrarla del 
 * usuario y luego se elimina la magnitud de la base de datos.
********************************************************************/
borrarMagnitud(){
  console.log("this.magnitud",this.magnitud.id);
  console.log("Usuario en borrar magnitud antes",this.usuario,this.global.usuario);
  let index=this.usuario.magnitudes.findIndex((mag:Magnitud)=>{
    return mag.id===this.magnitud.id;
  });
  console.log("Index: ",index );
  this.usuario.magnitudes.splice(index,1);
  this.servicio.editarUsuario(this.usuario).subscribe(()=>{
    this.servicio.getUsuario(this.usuario.id).subscribe((usr:Usuario)=>{
      this.usuario=usr;
      this.global.usuario=this.usuario;
      this.servicio.borrarMagnitud(this.magnitud).subscribe(()=>{
        console.log("Usuario despues:",this.usuario);
        this.cargarDatos();
      });
    });
  });
}
/**************************************************
 * Guarda en la magnitud los datos editados en la
 * grafica.
 **************************************************/
salvarMagnitud(){
  this.servicio.editarMagnitud(this.magnitud).subscribe();
}

//Funciones de perfil

salvarPerfil(){}
borrarPerfil(){}

seleccionPerfil(event){
  console.log("seleccion perfil")
  let index=event.target.selectedIndex;
  if(index){
    index--;
    this.perfil=this.perfiles[index];
    this.selPerfil=false;
  }else{
    this.selPerfil=true;
  }

}

agregarPerfil(){
  let perfil:Perfil={id:null,nombre:null,magnitudes:[]};
  let nombre=this.perfilForm.get('perfil').value;
  this.perfilForm.get('perfil').setValue('');
  perfil.nombre=nombre;
  console.log("Voy a agregar el perfil",perfil,"al usuario",this.global.usuario);
  this.servicio.usuarioAddPerfil(this.global.usuario,perfil).subscribe(()=>{
    this.servicio.getUsuario(this.usuario.id).subscribe((usr:Usuario)=>{
      this.usuario=usr;
      this.global.usuario=this.usuario;
      console.log("Usuario en agregar magnitud:",this.usuario,this.global.usuario);
      this.cargarDatos()
    });
  });
}
/********************************************************
 * Asocia la magnitud de la grafica al perfil actual
 *******************************************************/
asociarMagnitud(){
  console.log("asociarMagnitud")
  let yaEstaAsociada=false;
  this.perfil.magnitudes.forEach(mag=>{
    if(mag.nombre==this.magnitud.nombre){
      yaEstaAsociada=true;
      return;
    }
  });

  if(yaEstaAsociada)
    return;
/*  if(!this.perfil.magnitudes){//Si perfil.magnitudes no existe lo creo vacio.
    this.perfil.magnitudes=[];}
  this.perfil.magnitudes.push(this.magnitud);
  this.servicio.editarPerfil(this.perfil).subscribe();*/
  console.log("Llego aca?",this.perfil,this.magnitud);
  this.servicio.perfilAddMagnitud(this.perfil,this.magnitud).subscribe((perfil:Perfil)=>{
    this.perfil=perfil;
  });


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

agregarCalendario(){
  let calendario:Calendario=new Calendario();
  let nombre=this.calendarioForm.get('calendario').value;
  this.calendarioForm.get('calendario').setValue('');
  calendario.nombre=nombre;
  console.log("Voy a agregar el calendario",calendario,"al usuario",this.global.usuario);
  this.servicio.usuarioAddCalendario(this.global.usuario,calendario).subscribe(()=>{
    this.servicio.getUsuario(this.usuario.id).subscribe((usr:Usuario)=>{
      this.usuario=usr;
      this.global.usuario=this.usuario;
      console.log("Usuario en agregar magnitud:",this.usuario,this.global.usuario);
      this.cargarDatos()
    });
  });  
}

seleccionCalendario(event){
  let index=event.target.selectedIndex;
  this.calendario=this.calendarios[index];
}

seleccionCultivo(event){
  let index=event.target.selectedIndex;
  if(index){
    this.selCultivo=false;
    this.cultivo=this.cultivos[index-1];
  }
  else
  this.selCultivo=true;
  
}

agregarCultivo(){
  let cultivo:Cultivo=new Cultivo();
  let nombre=this.cultivoForm.get('cultivo').value;
  this.cultivoForm.get('cultivo').setValue('');
  cultivo.nombre=nombre;
  console.log("Voy a agregar el cultivo",cultivo,"al usuario",this.global.usuario);
  this.servicio.usuarioAddCultivo(this.global.usuario,cultivo).subscribe(()=>{
    this.servicio.getUsuario(this.usuario.id).subscribe((usr:Usuario)=>{
      this.usuario=usr;
      this.global.usuario=this.usuario;
      console.log("Usuario en agregar magnitud:",this.usuario,this.global.usuario);
      this.cargarDatos()
    });
  });  
}
borrarCultivo(){
  let id = this.cultivo.id;
  let index;

  index=this.cultivos.find(function(cul){
    return cul.id==id
  });
  this.cultivos.splice(index,1);
  this.servicio.borrarCultivo(this.cultivo).subscribe(()=>{   

  });
  
}

/****************************************************************************
 * Asocia el perfil actual al rango de fechas seleccionadas en el calendario
 ****************************************************************************/
asociarPerfil(){
  console.log("Asociar perfil",this.calendar.value[0]);
  if(this.calendar.selectedDates.length==0){
    console.log("No hay fechas seleccionadas");
    return;
  }
  let dias:Array<Dia>=[];
  for(let date of this.calendar.selectedDates){
    let dia:Dia=new Dia();
    dia.fecha=date;
    dia.perfil_id=this.perfil.id;
    dias.push(dia);
  }
  this.servicio.agregarDia(this.cultivo,dias).subscribe();
}


irARegistro(){
  this.route.navigate(['Registro']);

}
onItemMagChange(opcion){
  if(opcion=='todo'){
    this.todosLasMagnitudes=true;
  }else{
    this.todosLasMagnitudes=false;
  }
  this.cargarDatos();
}
onItemPerfChange(opcion){
  if(opcion=='todo'){
    this.todosLosPerfiles=true;
  }else{
    this.todosLosPerfiles=false;
  }
  this.cargarDatos();
}

verifyRange(dates:Date[]){
  //console.log(dates[0],dates.length)
  console.log(this.calendar.value[0],"Largo:");

}
}
