import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SolicitudService } from './services/solicitud.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PanelInicialComponent } from './panel-inicial/panel-inicial.component';

import { HttpClientModule } from '@angular/common/http'; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, PanelInicialComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  username: string = '';
  password: string = '';
  loginStatus: string = '';
  isLoggedIn: boolean = false;


  constructor(private  solicituService : SolicitudService, private router: Router) {}

  login() {
    const credentials = { username: this.username, password: this.password };
    this.solicituService.login(credentials).subscribe(
      (response) => {
        this.loginStatus = response.message;
        this.isLoggedIn = true; // Cambiar estado a "logueado"
        this.loginStatus = '';
        console.log('Login Exitoso:', response);
      },
      (error) => {
        this.loginStatus = 'Usuario/Contraseña incorrectos.';
        this.isLoggedIn = false;
        this.loginStatus = 'Usuario o contraseña incorrectos';
        console.error('Error en login:', error);
      }
    );
  }



  



  
}
