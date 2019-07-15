import { Component, OnInit, ViewChild } from '@angular/core';
import { GraficaComponent } from '../grafica/grafica.component';

@Component({
  selector: 'app-actual',
  templateUrl: './actual.component.html',
  styleUrls: ['./actual.component.css']
})
export class ActualComponent implements OnInit {
  @ViewChild(GraficaComponent) grafica: GraficaComponent;
  constructor() { 
    
  }
  datos=[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20]
  datos1=[40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,20,20,20,20,20,20,20,20,20,20,20]
  ngOnInit() {
  }
  enviarMensaje() {
    console.log("Enviar mensaje");
    this.grafica.setValores('titulo',this.datos1);
  }
  
}
