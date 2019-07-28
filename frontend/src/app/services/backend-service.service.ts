import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Magnitud } from '../classes/magnitud';
import { Perfil } from '../classes/perfil';
import { Usuario } from '../classes/usuario';
import { Calendario } from '../classes/calendario';
import { Cultivo } from '../classes/cultivo';
import { Dia } from '../classes/dia';

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
  urlBase='http://localhost:8080';

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
private urlUsuario='http://localhost:8080/usuario';
getUsuarios(){
  let respuesta=this._http.get(this.urlUsuario);
  return respuesta;
}

getUsuario(id:number){
  let respuesta=this._http.get(this.urlUsuario+'/'+id);
  return respuesta;
}

nuevoUsuario(usuario:Usuario){
  console.log("Nuevo usuario",usuario);
  let respuesta=this._http.post(this.urlUsuario,usuario);
  return respuesta;
}

editarUsuario(usuario:Usuario){
    let respuesta=this._http.put(this.urlUsuario,usuario);
    return respuesta;

}

borrarUsuario(usuario:Usuario){
  let respuesta=this._http.delete(this.urlUsuario + '/' + usuario.id,this.httpOtions);
  return respuesta;
}


//Devuelve la lista de magnitudes del usuario pasado como argumento.
getMagnitudUsuario(usuario:Usuario){
  let respuesta=this._http.get(this.urlUsuario +'/magnitud/'+ usuario.id);
  return respuesta;
}

getPerfilesUsuario(usuario:Usuario){
  let respuesta=this._http.get(this.urlUsuario +'/perfil/' + usuario.id);
  return respuesta;
}


getCalendarioUsuario(usuario:Usuario){
  let respuesta=this._http.get(this.urlUsuario +'/calendario/' + usuario.id);
  return respuesta;
}

getCultivoUsuario(usuario:Usuario){
  let respuesta=this._http.get(this.urlUsuario +'/cultivo/' + usuario.id);
  return respuesta;
}

getPerfilesCultivo(cultivo:Cultivo){
  let respuesta=this._http.get(this.urlBase +'/cultivo/perfil/' + cultivo.id);
  return respuesta;
}

getMagnitudesPerfil(perfil:Perfil){
  let respuesta=this._http.get(this.urlBase +'/perfil/magnitud/' + perfil.id);
  return respuesta;
}

usuarioAddMagnitud(usuario:Usuario,magnitud:Magnitud){
  console.log("UsuarioAddMagnitud",usuario,magnitud);
  let respuesta=this._http.put(this.urlUsuario + '/' +'magnitud',{usuario,magnitud});
  return respuesta;
}

usuarioAddPerfil(usuario:Usuario,perfil:Perfil){
  console.log("UsuarioAddPerfil",usuario,perfil);
  let respuesta=this._http.put(this.urlUsuario + '/'+ 'perfil' ,{usuario,perfil});
  return respuesta;
}

usuarioAddCultivo(usuario:Usuario,cultivo:Cultivo){
  let respuesta=this._http.put(this.urlUsuario + '/'+ 'cultivo',{usuario,cultivo});
  return respuesta;
}

usuarioAddCalendario(usuario:Usuario,calendario:Calendario){
  let respuesta=this._http.put(this.urlUsuario + '/'+ 'calendario/'+ usuario.id,calendario);
  return respuesta;
}


isRegistered(usuario:Usuario){
  let urlPassword='http://localhost:8080/password';
  let respuesta=this._http.post(urlPassword,usuario);
  return respuesta;
}

//Servicios para Calendario
getCalendario(){
  let urlValores='http://localhost:8080/calendario';
  let respuesta=this._http.get(urlValores);
  return respuesta;
}

nuevoCalendario(calendario:Calendario){
  let urlSalvar='http://localhost:8080/calendario';
  let respuesta=this._http.post(urlSalvar,calendario);
  return respuesta;
}

editarCalendario(calendario:Calendario){
    let urlSalvar='http://localhost:8080/perfil';
    let respuesta=this._http.put(urlSalvar,calendario);
    return respuesta;

}

borrarCalendario(calendario:Calendario){
  let urlBorrar='http://localhost:8080/perfil';
  let respuesta=this._http.delete(urlBorrar + '/' + calendario.id,this.httpOtions);
  console.log("Respuesta: ",respuesta);
  return respuesta;
}

//Servicios para perfil
getCultivos(){
  let urlValores='http://localhost:8080/cultivo';
  let respuesta=this._http.get(urlValores);
  return respuesta;
}

nuevoCultivo(cultivo:Cultivo){
  console.log("Servicio nuevo cultivo");
  let urlSalvar='http://localhost:8080/cultivo';
  let respuesta=this._http.post(urlSalvar,cultivo);
  return respuesta;
}

editarCultivo(cultivo:Cultivo){
    let urlSalvar='http://localhost:8080/cultivo';
    let respuesta=this._http.put(urlSalvar,cultivo);
    return respuesta;

}

borrarCultivo(cultivo:Cultivo){
  let urlBorrar='http://localhost:8080/cultivo';
  let respuesta=this._http.delete(urlBorrar + '/' + cultivo.id,this.httpOtions);
  console.log("Respuesta: ",respuesta);
  return respuesta;
}

agregarDia(cultivo:Cultivo,dias:Array<Dia>){
  let respuesta=this._http.put(this.urlBase + '/cultivo/dia',{cultivo,dias});
  return respuesta; 
}

nuevoDia(dia:Dia){
  let respuesta=this._http.post(this.urlBase + '/dia',dia);
  return respuesta; 
}

perfilAddMagnitud(perfil:Perfil,magnitud:Magnitud){
  let respuesta=this._http.put(this.urlBase + '/perfil/magnitud',{perfil,magnitud});
  return respuesta; 

}
}
