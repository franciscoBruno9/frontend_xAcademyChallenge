import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../model/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private apiUrl = 'http://localhost:8080/players';

  constructor(private httpClient: HttpClient) { }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
  }

    getPlayer(id: number): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }

    getPlayers(filtros: any, page: number = 1, limit: number = 20): Observable<any> {
    let params = new HttpParams();
    if (filtros.id) params = params.set('id', filtros.id);
    if (filtros.long_name) params = params.set('long_name', filtros.long_name);
    if (filtros.nationality_name) params = params.set('nationality_name', filtros.nationality_name);
    if (filtros.club_name) params = params.set('club_name', filtros.club_name);
  
    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());
    return this.httpClient.get<any>(this.apiUrl, { params, headers: this.getHeaders() });
}
  
    postPlayer(newPlayer : Player) : Observable<{message: string}> {
      return this.httpClient.post<{message: string}>(this.apiUrl, newPlayer, { headers: this.getHeaders() });
    }
  
    putPlayer(updatedPlayer : Player) : Observable<{message: string}> {
      return this.httpClient.put<{message: string}>(`${this.apiUrl}/${updatedPlayer.id}`, updatedPlayer, { headers: this.getHeaders() }); 
    }

    uploadPlayers(file: File): Observable<any> {
      console.log("EN EL SERVICIO")
      const formData = new FormData();
      formData.append('file', file);
  
      return this.httpClient.post('http://localhost:8080/upload', formData);
    }
}
