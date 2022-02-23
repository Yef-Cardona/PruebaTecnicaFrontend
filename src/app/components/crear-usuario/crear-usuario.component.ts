import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  user : Usuario = new Usuario;

  profileForm = new FormGroup({
    nombre: new FormControl(''),
    rol: new FormControl(''),
    activo: new FormControl(''),
  });
  constructor(private router : Router, private http : UsuarioService){}

  ngOnInit(): void {
  }

  guardar(){
    this.user.nombre = this.profileForm.value.nombre;
    this.user.id_Rol = this.profileForm.value.rol;
    if(this.profileForm.value.activo){
      this.user.activo = 'S';
    }else{
      this.user.activo = 'N';
    }
    this.http.crearUsuario(this.user).subscribe(
      (data) =>{
        alert('Usuario agregado');
        this.router.navigate(['usuario'])
      },(error)=>{
        alert('Ocurrió un problema creando al usuario');
      }
    )
  }

  volver(){
    this.router.navigate(['usuario']);
  }
}
