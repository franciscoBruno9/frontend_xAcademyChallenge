import { Component } from '@angular/core';
import { PlayerService } from '../../core/services/player.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Player } from '../../core/model/player.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-player',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
  ],
  templateUrl: './create-player.component.html',
  styleUrl: './create-player.component.scss'
})
export class CreatePlayerComponent {

  mensaje: string = '';
  constructor(private playerService:PlayerService){}

  submitForm(form: NgForm) {
    if(form.valid) {
      const nuevo: Omit<Player, 'id' > = {
        long_name: form.value.long_name,
        nationality_name: form.value.nationality_name,
        age: form.value.age,
        player_face_url: form.value.player_face_url,
        fifa_version: form.value.fifa_version,
        fifa_update: form.value.fifa_update,
        club_name: form.value.club_name,
        player_positions: form.value.player_positions,
        overall: form.value.overall,
        potential: form.value.potential
      };

      this.playerService.postPlayer(nuevo).subscribe({
        next: (response) => {
          this.mensaje = response.message;
          form.reset();
        },
        error: (error) => {
          console.error('Error al crear el jugador:', error);
          this.mensaje = 'Error al crear el jugador';
        }
      
      });
    }
  }
}

