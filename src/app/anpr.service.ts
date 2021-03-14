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
    const POST_URL: string = environment.API_BASE_URL + 'process_plate';
    return this.http.post<any>(POST_URL, plateImage, { headers: params });
  }
}
