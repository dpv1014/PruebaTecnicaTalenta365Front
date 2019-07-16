import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = 'http://localhost:3000/';
  constructor(
    private http: HttpClient
  ) { }

  get(path, params){
    return this.http.get(this.API_URL + path, params);
  }

  post(path, params){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post(this.API_URL + path, params, httpOptions);
  }
}
