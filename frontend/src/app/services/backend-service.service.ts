import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Magnitud } from '../classes/magnitud';
import { Perfil } from '../classes/perfil';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  httpOtions={
    headers: new HttpHeaders({
      'Content-Type': 'aplication/json',
    })
  };
  constructor(private _http: HttpClient) { 
  }

  getMagnitudes(){
    let urlValores='http://localhost:8080/magnitud';
    let respuesta=this._http.get(urlValores);
    return respuesta;
  }

  nuevoMagnitud(Valores:number[],nombre:string){
    let urlSalvar='http://localhost:8080/magnitud';
    let respuesta=this._http.post(urlSalvar,{"nombre":nombre,"listOfFloats":Valores,"id":null});
    return respuesta;
  }

  editarMagnitud(magnitud:Magnitud){
      let urlSalvar='http://localhost:8080/magnitud';
      let respuesta=this._http.put(urlSalvar,magnitud);
      return respuesta;
  
  }

  borrarMagnitud(magnitud:Magnitud){
    let urlBorrar='http://localhost:8080/magnitud';
    let respuesta=this._http.delete(urlBorrar + '/' + magnitud.id,this.httpOtions);
    return respuesta;
 }

//Servicios para perfil
getPerfiles(){
  let urlValores='http://localhost:8080/perfil';
  let respuesta=this._http.get(urlValores);
  return respuesta;
}

nuevoPerfil(perfil:Perfil){
  let urlSalvar='http://localhost:8080/perfil';
  let respuesta=this._http.post(urlSalvar,perfil);
  return respuesta;
}

editarPerfil(perfil:Perfil){
    let urlSalvar='http://localhost:8080/perfil';
    let respuesta=this._http.put(urlSalvar,perfil);
    return respuesta;

}

borrarPerfil(perfil:Perfil){
  let urlBorrar='http://localhost:8080/perfil';
  let respuesta=this._http.delete(urlBorrar + '/' + perfil.id,this.httpOtions);
  console.log("Respuesta: ",respuesta);
  return respuesta;
}


//Servicios para Usuario
getUsuarios(){
  let urlValores='http://localhost:8080/usuario';
  let respuesta=this._http.get(urlValores);
  return respuesta;
}


nuevoUsuario(usuario:Usuario){
  let urlSalvar='http://localhost:8080/usuario';
  let respuesta=this._http.post(urlSalvar,usuario);
  return respuesta;
}

editarUsuario(usuario:Usuario){
    let urlSalvar='http://localhost:8080/usuario';
    let respuesta=this._http.put(urlSalvar,usuario);
    return respuesta;

}

borrarUsuario(usuario:Usuario){
  let urlBorrar='http://localhost:8080/usuario';
  let respuesta=this._http.delete(urlBorrar + '/' + usuario.id,this.httpOtions);
  return respuesta;
}

isRegistered(usuario:Usuario){
  let urlPassword='http://localhost:8080/password';
  let respuesta=this._http.post(urlPassword,usuario);
  return respuesta;
}


}
