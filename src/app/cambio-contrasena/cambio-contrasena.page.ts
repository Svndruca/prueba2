import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.page.html',
  styleUrls: ['./cambio-contrasena.page.scss'],
})
export class CambioContrasenaPage {
  usuario: string = '';
  contrasenaActual: string = '';
  contrasenaNueva: string = '';
  confirmarContrasena: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    
    this.route.queryParams.subscribe((params) => {
      this.usuario = params['usuario'] || ''; 
    });
  }

  cambiarContrasena() {
    const storedPassword = localStorage.getItem('password');
    if (this.contrasenaActual !== storedPassword) {
      this.mostrarAlerta('La contraseña actual no es correcta.');
    } else if (this.contrasenaNueva !== this.confirmarContrasena) {
      this.mostrarAlerta('Las contraseñas no coinciden. Favor intentar nuevamente.');
    } else {
      
      localStorage.setItem('password', this.contrasenaNueva);

      
      this.router.navigate(['/login']);
    }
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Contraseñas invalidas',
      message: mensaje,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}




