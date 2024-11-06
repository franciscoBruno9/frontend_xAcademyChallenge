import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/model/user.model';

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

  mensaje: string = '';
  mostrarModal: boolean = false;

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
          this.mensaje = response.message;
          this.mostrarModal = true;
          form.reset();
        },
        error: (error) => {
          console.error('Error al crear el usuario:', error);
          this.mensaje = 'Error al crear el usuario';
          this.mostrarModal = true;
        }
      
      });
    }
  };

  cerrarModal() {
    this.mostrarModal = false;
    this.router.navigate(['/login']);
  };
}
