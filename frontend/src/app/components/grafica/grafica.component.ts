import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnChanges {

  @Input() datosIn:number[];
  private myChart = new Chart ({
    chart: {
        type: 'line',
        margin: [70, 50, 60, 80],
        events: {
            click: function (e:any) {
                var x = Math.round(e.xAxis[0].value),
                    y = Math.round(e.yAxis[0].value);
                this.series[0].data[x].update(y);
                //this.devolverDatos.emit(y);
            }
        }
    },
    title: {
        text: 'Datos'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        allowDecimals: false,
        gridLineWidth: 1,
        minPadding: 0.2,
        maxPadding: 0.2,
        maxZoom: 60,
        min: 0,
        max: 23,
        categories: ['00hs', '01hs','02hs','03hs','04hs','05hs','06hs','07hs','08hs','09hs','10hs','11hs','12hs','13hs','14hs','15hs','16hs','17hs','18hs','19hs','20hs','21hs','22hs','23hs']
        
    },
    yAxis: {
        title: {
            text: ''
        },
        allowDecimals: false,
        minPadding: 0.2,
        maxPadding: 0.2,
        maxZoom: 60,
        gridLineWidth: 1,
         floor: 0,
  //      ceiling: 100,        
  
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: true
    },
    plotOptions: {
        series: {
            lineWidth: 1,
            point: {
            }
        }
    },
    series: []
  });

  
  constructor() { }
  
  ngOnChanges() {
    if(this.myChart.ref)
        this.myChart.removeSeries(this.myChart.ref.series.length-1);
    this.myChart.addSeries({name:'titulo',data:this.datosIn,type: 'line'},true,false);
    }
/**************************************************************************** */
//Funciones de la gráfica chart
/**************************************************************************** */
  //Se le pasa una lista de valores y titulo y refresca la grafica en pantalla
  public setValores(titulo:string,valores:number[]){
    if(this.myChart.ref)
      this.myChart.removeSeries(this.myChart.ref.series.length-1);
    this.myChart.addSeries({name:titulo,data:valores,type: 'line'},true,false);
   }

  public getValores():number[]{
    let variable:any;
    variable=this.myChart.ref.series[0];
    return variable.yData;
  }

  /*************************************************************************** */

}
