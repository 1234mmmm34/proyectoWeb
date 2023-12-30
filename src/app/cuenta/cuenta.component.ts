import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { usuario, usuarios } from "../modelos/usuarios"
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent {

  usuario = new usuario();
  usuarios: usuarios[] = [];
  UserGroup: FormGroup;

  ngOnInit(): void {

    this.fetchDataUsers(this.dataService.obtener_usuario(1));
   // this.fetchData(this.dataService.obtener_usuario(1));
  }

  fetchDataUsers(id_administrador: any) {
    this.dataService.fetchDataUsers(id_administrador).subscribe((usuarios: usuarios[]) => {
      console.log("fetch", usuarios);
      this.usuarios = usuarios;
    });
  }

  
  constructor(private http: HttpClient, private dataService: DataService, private fb: FormBuilder) {

    this.UserGroup = this.fb.group({
      id_persona: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido_pat: ['', Validators.required],
      apellido_mat: ['', Validators.required],
      tipo_usuario: ['', Validators.required],
      id_lote: ['', Validators.required],
      telefono: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      correo: ['', Validators.required],
      contrasenia: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
      id_fraccionamiento: ['', Validators.required],

    })
  }




  
  actualizar_usuario(
    usuarios: {
      id_persona: string,
      nombre: string,
      apellido_pat: string,
      apellido_mat: string,
      tipo_usuario: string,
      telefono: any,
      fecha_nacimiento: any,
      intercomunicador: any,
      codigo_Acceso: any,
      id_fraccionamiento: number,
      correo: any,
      contrasenia: any
    }
  ) {

    const params = {
      id_persona: this.dataService.obtener_usuario(1),
      nombre: usuarios.nombre,
      apellido_pat: usuarios.apellido_pat,
      apellido_mat: usuarios.apellido_mat,
      telefono: usuarios.telefono,
      id_fraccionamiento: this.dataService.obtener_usuario(1),
      tipo_usuario: "administrador",
      intercomunicador: "123",
      codigo_acceso: "123",
      fecha_nacimiento: usuarios.fecha_nacimiento,
      correo: "urquidy12@gmail.com",
      contrasenia: usuarios.contrasenia,
      id_lote: 1
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log("params  ", params);



    return this.http.put("https://localhost:44397/api/Personas/Actualizar_Persona", params).subscribe(
      (_response) => {
        console.log("hola");
        console.log("https://localhost:44397/api/Personas/Actualizar_Persona", params);
        
    
        this.ngOnInit();

      }
    )
  }
}
