import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  datosLocalStorage: any = localStorage.getItem('data');
  datos = JSON.parse(this.datosLocalStorage);

  user : Usuario = new Usuario;


  profileForm = new FormGroup({
    nombre: new FormControl(this.datos.nombre),
    rol: new FormControl(this.datos.id_Rol),
    activo: new FormControl(true),
  });
  constructor(private router:Router, private http:UsuarioService) {
  }

  ngOnInit(): void {

  }

  volver(){
    this.router.navigate(['usuario']);
  }

  guardar(){
    this.user.id_Usuario = this.datos.id_Usuario;
    this.user.nombre = this.profileForm.value.nombre;
    this.user.id_Rol = this.profileForm.value.rol;
    if(this.profileForm.value.activo){
      this.user.activo = 'S';
    }else{
      this.user.activo = 'N';
    }
    this.http.editarUsuario(this.user).subscribe(
      (data) =>{
        alert('Usuario editado');
        this.router.navigate(['usuario'])
      },(error)=>{
        alert('Ocurrió un problema editando');
      }
    )
  }
}
