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
  }

}
