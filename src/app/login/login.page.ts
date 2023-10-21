import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  formData = {
    username: '',
    password: ''
  };
  isLoading: boolean = false;
  isMouseOver: boolean = false; 
  apiUrl = 'http://localhost:5000/login';

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) {}

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Contraseña Erronea',
      message: mensaje,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  ngOnInit() {
    if (!localStorage.getItem('password')) {
      localStorage.setItem('password', '1234');

    }
    console.log(localStorage.getItem('token'))
  }

  redirectToResetPasswordPage() {
    this.router.navigate(['/cambio-contrasena']); 
  }

  ingresar(): void {
    const body = {
      username: this.formData.username,
      password: this.formData.password
    };

    this.http.post(this.apiUrl, this.formData).subscribe(
      (response: any) => {
        
        if (response.authenticated) {
          localStorage.setItem('token',response.token)
          localStorage.setItem('username',body.username)
          this.router.navigate(['/home'], { queryParams: { username: this.formData.username } });
        } else {
          console.log('Credenciales inválidas.');
          this.mostrarAlerta('Credenciales inválidas.');
        }
        this.isLoading = false;
      },
      (error) => {
        
        console.error('Error:', error);
        this.mostrarAlerta('Error al intentar iniciar sesión');
        this.isLoading = false;
      }
    );
  }
}







