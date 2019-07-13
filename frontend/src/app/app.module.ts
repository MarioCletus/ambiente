import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ChartsComponent } from './components/charts/charts.component';
import { ChartModule } from 'angular-highcharts';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxDialogModule, IgxCalendarModule } from 'igniteui-angular';
import { NavegadorComponent } from './components/navegador/navegador.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { PrincipalComponent } from './components/principal/principal.component';
import { ActualComponent } from './components/actual/actual.component';
import { ConfigurarComponent } from './components/configurar/configurar.component';
import { GraficaComponent } from './components/grafica/grafica.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { PruebaGraficaComponent } from './components/prueba-grafica/prueba-grafica.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    CalendarioComponent,
    NavegadorComponent,
    RegistroComponent,
    PrincipalComponent,
    ActualComponent,
    ConfigurarComponent,
    GraficaComponent,
    PruebaComponent,
    PruebaGraficaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    BrowserAnimationsModule,
		IgxCalendarModule,
    IgxDialogModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}