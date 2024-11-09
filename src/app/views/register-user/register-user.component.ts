import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/model/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {

  constructor( 
    private userService: UserService,
    private router: Router
  ){}

  submitForm(form: NgForm) {
    if(form.valid) {
      const nuevo: Omit<User, 'id' > = {
        username: form.value.username,
        password: form.value.password
      };

      this.userService.postUser(nuevo).subscribe({
        next: (response) => {
          Swal.fire('Éxito', response.message, 'success');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al registrarse:', error);
          Swal.fire('Error', 'Error al registrarse', 'error');
        }
      
      });
    }
  };

  irLogin(){
    this.router.navigate(['/login'])
  }
}
