import { Component, OnInit } from '@angular/core';
import { Magnitud } from 'src/app/classes/magnitud';
import { ChartsServiceService } from 'src/app/services/charts-service.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  misDatos;
  constructor(private service:ChartsServiceService) { }

  ngOnInit() {
    let magnitudes:Array<Magnitud>;
    this.service.getMagnitudes().subscribe((data:Magnitud[])=>{magnitudes=data;
      this.misDatos=magnitudes[0].listOfFloats;
      console.log(this.misDatos);
    });

  }
  click(){
    this.misDatos=[100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100]
  }

}
