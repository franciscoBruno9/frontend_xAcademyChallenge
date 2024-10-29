import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../model/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private apiUrl = 'http://localhost:8080/players';

  constructor(private httpClient: HttpClient) { }

    getPlayer(id: number): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}/${id}`);
    }
  
    postPlayer(newPlayer : Player) : Observable<{message: string}> {
      return this.httpClient.post<{message: string}>(this.apiUrl, newPlayer);
    }
  
    putPlayer(updatedPlayer : Player) : Observable<{message: string}> {
      return this.httpClient.put<{message: string}>(`${this.apiUrl}/${updatedPlayer.id}`, updatedPlayer); 
    }
  
}
