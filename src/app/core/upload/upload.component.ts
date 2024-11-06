import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent {
  private archivoSeleccionado: File | null = null;

  constructor(private playerService: PlayerService) {}

  archivoCargado(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log("archivoCargado", input.files)
    this.archivoSeleccionado = input.files ? input.files[0] : null;
    
    if (!this.archivoSeleccionado) {
      console.warn('No se ha seleccionado ningún archivo');
    }
  }

  subirArchivo() {
    if (this.archivoSeleccionado) {
      this.playerService.uploadPlayers(this.archivoSeleccionado).subscribe({
        next: response => {
          console.log('Archivo subido con éxito:', response);
        },
        error: error => {
          console.error('Error al subir el archivo:', error);
        },
        complete: () => {
          console.log('Subida de archivo completada.');
        }
      });
    } else {
      console.warn('Seleccione un archivo antes de intentar subirlo');
    }
  }
}