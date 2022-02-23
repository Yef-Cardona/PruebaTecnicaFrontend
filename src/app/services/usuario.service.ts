import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse  } from '@angular/common/http';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8080/usuario/';

  obtenerUsuarios(){
    return this.http.get<Usuario[]>(this.url + 'listar');
  }

  crearUsuario(usuario : Usuario){
    return this.http.post<Usuario>(this.url + 'crear', usuario);
  }

  editarUsuario(usuario: Usuario){
    return this.http.put<Usuario>(this.url + 'actualizar/'+ usuario.id_Usuario, usuario);
  }

  eliminarUsuario(id_Usuario: number){
    return this.http.delete(this.url + 'eliminar/' + id_Usuario);
  }

  buscarUSuario(nombre : string){
    return this.http.get<Usuario[]>(this.url + 'buscar/' + nombre);
  }
}
