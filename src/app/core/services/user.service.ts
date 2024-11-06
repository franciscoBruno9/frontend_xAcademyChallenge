import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

    getUser(filtros: any): Observable<any> {
    let params = new HttpParams();
    if (filtros.username) params = params.set('username', filtros.username);
      return this.httpClient.get<any>(this.apiUrl, { params });
    }
  
    postUser(newUser : User) : Observable<{message: string}> {
      return this.httpClient.post<{message: string}>(this.apiUrl, newUser);
    }
    

}
