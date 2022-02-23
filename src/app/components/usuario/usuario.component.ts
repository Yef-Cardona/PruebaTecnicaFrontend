import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarioBuscar: any;
  flagBuscar = false;
  usuarios: Usuario[] = [];
  constructor(
    private http: UsuarioService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.http.obtenerUsuarios().subscribe(
      (data) => {
        if (data.length > 0) {
          this.usuarios = data;
          console.log(data);
        } else {
          console.log("No hay usuarios registrados");
        }
      },
      (error) => {
        console.log("Ocurrió un error");
      }
    );
  }

  crearUsuario(){
    this.router.navigate(['crear-usuario']);
  }

  editarUsuario(usuario : Usuario){
    console.log(usuario);
    localStorage.setItem('data', JSON.stringify(usuario));
    this.router.navigate(['editar-usuario']);
  }

  eliminarUsuario(id_Usuario : number){
    this.http.eliminarUsuario(id_Usuario).subscribe(
      (data) => {
        alert('usuario Eliminado');
        this.obtenerUsuarios();
      },
      (error) => {
        console.log("Ocurrió un error");
      }
    )
  }

  regresar(){
    this.flagBuscar = false;
    this.usuarioBuscar = "";
    this.obtenerUsuarios();
  }

  buscarUsuario(){
    this.flagBuscar = true;
    this.http.buscarUSuario(this.usuarioBuscar).subscribe(
      (data) => {
        if (data.length > 0) {
          this.usuarios = data;
          console.log(data);
        } else {
          alert("No se encontraron coincidencias");
          this.regresar();
        }
      },
      (error) => {
        alert("Ocurrió un error");
      }
    )
  }

}
