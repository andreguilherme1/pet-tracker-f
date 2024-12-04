import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'https://pet-tracker-b.onrender.com'

@Injectable({
  providedIn: 'root'
})
export class PetTrackerService {
  constructor(private readonly _http: HttpClient) { }


  getLocation(): Observable<any> {
    return this._http.get(`${API_URL}/current-location`)
  }

  checkLocation(location: any): Observable<any> {
    return this._http.post<any>(`${API_URL}/check-location`, location)
  }
}
