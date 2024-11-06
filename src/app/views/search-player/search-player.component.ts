import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Player } from '../../core/model/player.model';
import { PlayerService } from '../../core/services/player.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-search-player',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.scss'] 
})
export class SearchPlayerComponent {
  players: Player[] = [];
  filtros = {
    id: '',
    long_name: '',
    nationality_name: '',
    club_name: ''
  };
  mensaje: string = '';
  currentPage: number = 1;
  totalPages: number = 1;

  mostrarModal: boolean = false;
  mostrarUpload: boolean = false;

  constructor(
    private playerService: PlayerService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.getPlayers();  
  }

  getPlayers(): void {
    this.playerService.getPlayers(this.filtros, this.currentPage).subscribe({
      next: (data) => {
        this.players = data.players; 
        this.totalPages = data.totalPages; 
      },
      error: (error) => {
        console.error("Error cargar jugadores:", error);
        this.mensaje = "No existen jugadores con los criterios dados."
        this.mostrarModal = true;
      }
    });
  }

  verDetalle(id: any): void {
    this.router.navigate(['/update', id]);
  }

  filtrar(): void {
    this.currentPage = 1; 
    this.getPlayers(); 
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getPlayers(); 
    }
}

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPlayers();
    }
  }

  irA() {
    this.router.navigate(['/create']);
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  importar(){
    this.router.navigate(['/upload']);
  }

  exportar(){
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.players);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Jugadores');
    console.log(worksheet, workbook);
    XLSX.writeFile(workbook, 'jugadores_filtrados.xlsx');
  }

}
