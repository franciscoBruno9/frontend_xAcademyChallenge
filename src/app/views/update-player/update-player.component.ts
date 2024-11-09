import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../core/services/player.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Player } from '../../core/model/player.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GraficoSkillsComponent } from '../../core/graficoSkills/grafico-skills.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-player',
  standalone: true,
  imports: [CommonModule, FormsModule, GraficoSkillsComponent],
  templateUrl: './update-player.component.html',
  styleUrls: ['./update-player.component.scss']
})
export class UpdatePlayerComponent implements OnInit {
  long_name: string = '';
  nationality_name: string = '';
  age: number = 0;
  player_face_url: string = '';
  fifa_version: string = '';
  fifa_update: string = '';
  club_name: string = '';
  player_positions: string = '';
  overall: number = 0;
  potential: number = 0;
  pace: number = 0;
  shooting: number = 0;
  passing:number = 0;
  dribbling:number = 0;
  defending:number = 0;
  physic:number = 0

  playerData: any;

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id = parseInt(idString);
      this.playerService.getPlayer(id).subscribe({
        next: (data) => {
          this.playerData = data;
          this.long_name = data.long_name;
          this.nationality_name = data.nationality_name;
          this.age = data.age;
          this.player_face_url = data.player_face_url;
          this.fifa_version = data.fifa_version;
          this.fifa_update = data.fifa_update;
          this.club_name = data.club_name;
          this.player_positions = data.player_positions;
          this.overall = data.overall;
          this.potential = data.potential;
          this.pace = data.pace;
          this.shooting = data.shooting;
          this.passing = data.passing;
          this.dribbling = data.dribbling;
          this.defending = data.defending;
          this.physic = data.physic;
        },
        error: (error) => {
          console.error("Error al obtener detalles del jugador:", error);
        }
      });
    }
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      const idString = this.route.snapshot.paramMap.get('id');
  
      if (idString !== null) {
        const id = parseInt(idString);
        const jugador: Player = {
          id: id, 
          long_name: form.value.long_name,
          nationality_name: form.value.nationality_name,
          age: form.value.age,
          player_face_url: form.value.player_face_url,
          fifa_version: form.value.fifa_version,
          fifa_update: form.value.fifa_update,
          club_name: form.value.club_name,
          player_positions: form.value.player_positions,
          overall: form.value.overall,
          potential: form.value.potential,
          pace: form.value.pace,
          shooting:form.value.shooting,
          passing:form.value.passing,
          dribbling:form.value.dribbling,
          defending:form.value.defending,
          physic:form.value.physic
        };
  
        this.playerService.putPlayer(jugador).subscribe({
          next: (response) => {
            Swal.fire('Éxito', response.message, 'success');
          },
          error: (error) => {
            console.error('Error al modificar el jugador:', error);
            Swal.fire('Error', 'Error al crear el jugador', 'error');
          }
        });
      } else {
        Swal.fire('Error', 'Jugador no encontrado.', 'error');
      }
    }
  }

  irA() {
    this.router.navigate(['/search']);
  }
}
