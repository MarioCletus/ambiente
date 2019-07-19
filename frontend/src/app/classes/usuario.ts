import { Calendario } from './calendario';
import { Cultivo } from './cultivo';
import { Magnitud } from './magnitud';
import { Perfil } from './perfil';

export class Usuario {
    public id:number;
    public nombre:string;
    public apellido:string;
    public password:string;
    public userName:string;
    public calendarios:Array<Calendario>
    public cultivos:Array<Cultivo>
    
    public magnitudes:Array<Magnitud>
    public perfiles:Array<Perfil>


}
