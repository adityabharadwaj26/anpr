import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnprService {

  constructor(private http: HttpClient) { }

  getPlate(plateImage): Observable<any> {
    // console.log(plateImage);
    const params = new HttpHeaders({ accept: 'application/json' });
    const POST_URL: string = environment.API_BASE_URL + '/api/process_plate';
    return this.http.post<any>(POST_URL, plateImage, { headers: params });
  }

  login(logindetails): Observable<any> {
    const params = new HttpHeaders({ accept: 'application/json' });
    const POST_URL: string = environment.API_BASE_URL + 'auth';
    return this.http.post<any>(POST_URL, logindetails, { headers: params });
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    const token = sessionStorage.getItem('token');
    const authString = 'token ' + token;
    const headers = new HttpHeaders({ Authorization: authString, accept: 'application/json' });
    const POST_URL: string = environment.API_BASE_URL + 'logout/';
    return this.http.get<any>(POST_URL, { headers });
  }

}
