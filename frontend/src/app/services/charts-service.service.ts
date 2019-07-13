import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Magnitud } from '../classes/magnitud';
import { Perfil } from '../classes/perfil';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class ChartsServiceService {

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
    console.log("Guardando en base de datos");
    console.log("nombre:", nombre,"Valores: ",Valores);
    let urlSalvar='http://localhost:8080/magnitud';
    let respuesta=this._http.post(urlSalvar,{"nombre":nombre,"listOfFloats":Valores,"id":null}).subscribe();
    console.log("Respuesta: ",respuesta);
    return respuesta;
  }

  editarMagnitud(magnitud:Magnitud){
      console.log("Editando en base de datos");
      console.log("Magnitud:", magnitud);
      let urlSalvar='http://localhost:8080/magnitud';
      let respuesta=this._http.put(urlSalvar,magnitud).subscribe();
      console.log("Respuesta: ",respuesta);
      return respuesta;
  
  }

  borrarMagnitud(magnitud:Magnitud){
    let urlBorrar='http://localhost:8080/magnitud';
    let respuesta=this._http.delete(urlBorrar + '/' + magnitud.id,this.httpOtions).subscribe();
    console.log("Respuesta: ",respuesta);
    return respuesta;
 }

//Servicios para perfil
getPerfiles(){
  let urlValores='http://localhost:8080/perfil';
  let respuesta=this._http.get(urlValores);
  return respuesta;
}

nuevoPerfil(perfil:Perfil){
  console.log("Guardando en base de datos");
  console.log("perfil:",perfil);
  let urlSalvar='http://localhost:8080/perfil';
  let respuesta=this._http.post(urlSalvar,perfil).subscribe();
  console.log("Respuesta: ",respuesta);
  return respuesta;
}

editarPerfil(perfil:Perfil){
    console.log("Editando en base de datos");
    console.log("Perfil:", perfil);
    let urlSalvar='http://localhost:8080/perfil';
    let respuesta=this._http.put(urlSalvar,perfil).subscribe();
    console.log("Respuesta: ",respuesta);
    return respuesta;

}

borrarPerfil(perfil:Perfil){
  let urlBorrar='http://localhost:8080/perfil';
  let respuesta=this._http.delete(urlBorrar + '/' + perfil.id,this.httpOtions).subscribe();
  console.log("Respuesta: ",respuesta);
  return respuesta;
}
/*

//Servicios para perfil
getPerfiles(){
  let urlValores='http://localhost:8080/perfil';
  let respuesta=this._http.get(urlValores);
  return respuesta;
}


nuevoPerfil(perfil:Perfil){
  console.log("Guardando en base de datos");
  console.log("perfil:",perfil);
  let urlSalvar='http://localhost:8080/perfil';
  let respuesta=this._http.post(urlSalvar,perfil).subscribe();
  console.log("Respuesta: ",respuesta);
  return respuesta;
}

editarPerfil(perfil:Perfil){
    console.log("Editando en base de datos");
    console.log("Perfil:", perfil);
    let urlSalvar='http://localhost:8080/perfil';
    let respuesta=this._http.put(urlSalvar,perfil).subscribe();
    console.log("Respuesta: ",respuesta);
    return respuesta;

}

borrarPerfil(perfil:Perfil){
  let urlBorrar='http://localhost:8080/perfil';
  let respuesta=this._http.delete(urlBorrar + '/' + perfil.id,this.httpOtions).subscribe();
  console.log("Respuesta: ",respuesta);
  return respuesta;
}
]
isRegistered(usuario:Usuario){
  console.log("isRegistered: ",usuario);
  let urlPassword='http://localhost:8080/password';
  let respuesta=this._http.post(urlPassword,usuario).subscribe();
  console.log(respuesta);
  return respuesta;
}
*/

}
