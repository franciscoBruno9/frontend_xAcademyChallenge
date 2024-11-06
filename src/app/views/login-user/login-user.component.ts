import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.scss'
})
export class LoginComponent {
  username : string = '';
  password : string = '';
  mensaje: string = '';
  mostrarModal: boolean = false;

constructor(
  private router : Router,
  private authService : AuthService
){}

submitForm(form: NgForm) {
  if(form.valid){
      this.authService.login(form.value.username, form.value.password).subscribe({
        next: (response) => {
          console.log(response)
          this.authService.saveToken(response);
          this.router.navigate(['/search']);
        },
        error: (error) => {
          this.mensaje = 'Error al iniciar sesión. Verifica tus credenciales.';
          this.mostrarModal = true;
        }
      });
      
    
  }
}

cerrarModal() {
  this.mostrarModal = false;
}

/*irA(){
  this.router.navigate(['/search']);
}*/

irRegistrar() {
  this.router.navigate(['/register']);
}

}
