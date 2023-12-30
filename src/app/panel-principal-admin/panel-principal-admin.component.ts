import { Component } from '@angular/core';
import {ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout'
import { DataService } from '../data.service'


@Component({
  selector: 'app-panel-principal-admin',
  templateUrl: './panel-principal-admin.component.html',
  styleUrls: ['./panel-principal-admin.component.css']
})
export class PanelPrincipalAdminComponent {



  mobileQuery: MediaQueryList;

  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
 
   
  fillerNav=[
    {name:"Home", route:"", icon:"home"},
    {name:"Acuerdos", route:"Acuerdos", icon:"assignment"},
    {name:"Notificaciones", route:"Notificaciones", icon:"priority_high"},
    {name:"Propiedades", route:"Propiedades", icon:"explore", children: [
      {name:"Agregar", route:"Propiedades", icon:"assignment_ind", children: []},
      {name:"Consultar", route:"ConsultarPropiedades", icon:"class"}
    ]},
    {name:"Controlador",route:"Fraccionamientos", icon:"cast_connected"},
    {name:'Usuarios',route:"Usuarios", icon:"supervised_user_circle", children: [
      {name:"Agregar", route:"ConsultarUsuario", icon:"person_add", children: []},
      {name:"Consultar", route:"AgregarUsuario", icon:"class"}
    ]},
  //  {name:'Salir',route:'Home', icon:"exit_to_app"}

   // <font-awesome-icon icon="right-from-bracket" />
  ]


  exit() {
    location.reload();
  }

  fillerContent = Array.from(
    {length: 50},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  private _mobileQueryListener: () => void;
Nav: any;
usuario: any;

    

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private data: DataService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   
  }

 

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  ngOnInit(): void {
    this.usuario = this.data.obtener_usuario(2);
  }
}
