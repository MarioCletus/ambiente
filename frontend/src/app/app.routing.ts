import { ChartsComponent } from "./components/charts/charts.component";
import { RegistroComponent } from './components/registro/registro.component';

import {Routes} from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { GraficaComponent } from './components/grafica/grafica.component';
import { ActualComponent } from './components/actual/actual.component';
import { ConfigurarComponent } from './components/configurar/configurar.component';
import { PruebaComponent } from './components/prueba/prueba.component';

export const appRoutes: Routes = [

    {path: 'Principal',component: PrincipalComponent},
    {path: 'Grafica',component: GraficaComponent},
    {path: 'Registro',component: RegistroComponent},
    {path: 'Actual',component: ActualComponent},
    {path: 'Configuracion',component: ConfigurarComponent},
    {path: 'Charts',component: ChartsComponent},
    {path: 'Prueba',component: PruebaComponent}
];