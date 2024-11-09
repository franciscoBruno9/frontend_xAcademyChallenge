import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

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
          Swal.fire('Éxito', 'Bienvenido!', 'success');
          this.router.navigate(['/search']);
        },
        error: (error) => {
          console.error('Error al registrarse:', error);
          Swal.fire('Error', 'Error al iniciar sesión. Verifica tus credenciales.', 'error');
          form.reset();
        }
      });
      
    
  }
}

irRegistrar() {
  this.router.navigate(['/register']);
}

}
