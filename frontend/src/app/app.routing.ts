import { RegistroComponent } from './components/registro/registro.component';

import {Routes} from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { ActualComponent } from './components/actual/actual.component';
import { ConfigurarComponent } from './components/configurar/configurar.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { PruebaConfigComponent } from './components/prueba-config/prueba-config.component';
import { NuevoCalendarioComponent } from './components/nuevo-calendario/nuevo-calendario.component';

export const appRoutes: Routes = [

    {path: '',component: PrincipalComponent},
    {path: 'Principal',component: PrincipalComponent},
    {path: 'Registro',component: RegistroComponent},
    {path: 'Actual',component: ActualComponent},
    {path: 'Configuracion',component: ConfigurarComponent},
    {path: 'Prueba',component: PruebaComponent},
    {path: 'PruebaConfig',component: PruebaConfigComponent},
    {path: 'NuevoCalendario',component: NuevoCalendarioComponent},
    {path: '**',component: PrincipalComponent}
];