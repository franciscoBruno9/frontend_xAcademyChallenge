import { Component } from '@angular/core';
import { PlayerService } from '../../core/services/player.service';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Player } from '../../core/model/player.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-player',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-player.component.html',
  styleUrl: './create-player.component.scss'
})
export class CreatePlayerComponent {

  playerForm: FormGroup;
  mensaje: string = '';
  mostrarModal: boolean = false;

  constructor(
    private fb : FormBuilder,
    private playerService: PlayerService,
    private router: Router
  ){this.playerForm = this.fb.group({
    long_name: ['', Validators.required],
    nationality_name: ['', Validators.required],
    age: ['', [Validators.required, Validators.max(80)]],
    player_face_url: ['', Validators.required],
    fifa_version: ['', Validators.required],
    fifa_update: ['', Validators.required],
    club_name: ['', Validators.required],
    player_positions: ['', Validators.required],
    overall: ['', [Validators.required, Validators.max(99)]],
    potential: ['', [Validators.required, Validators.max(99)]],
    pace: ['', [Validators.required, Validators.max(99)]],
    shooting: ['', [Validators.required, Validators.max(99)]],
    passing: ['', [Validators.required, Validators.max(99)]],
    dribbling: ['', [Validators.required, Validators.max(99)]],
    defending: ['', [Validators.required, Validators.max(99)]],
    physic: ['', [Validators.required, Validators.max(99)]]}
  )};
  submitForm() {
      const nuevo: Omit<Player, 'id' > = this.playerForm.value;

      this.playerService.postPlayer(nuevo).subscribe({
        next: (response) => {
          this.mensaje = response.message;
          this.mostrarModal = true;
          this.mensaje = 'Jugador creado exitosamente';
        },
        error: (error) => {
          console.error('Error al crear el jugador:', error);
          this.mensaje = 'Error al crear el jugador';
          this.mostrarModal = true;
        }
      
      });
    }

  irA() {
    this.router.navigate(['/search']);
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
}

