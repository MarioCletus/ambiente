import { Magnitud } from './magnitud';

export class Perfil {
    constructor(public id:number,public nombre:string,public magnitudes:Array<Magnitud>){}
}
