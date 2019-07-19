import { Injectable } from '@angular/core';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  usuario:Usuario;
  hayUsuario:boolean=false;
}
