import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  public moviesSubject = new BehaviorSubject([]);
  public movies: Object[];

  public reservationsSubject = new BehaviorSubject([]);
  public reservations: Object[];

  API_URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  public refreshMovies() {
    this.moviesSubject.next(this.movies);
  }

  getCountMovies(){
    if (!this.movies)
      return 0;
    return this.movies.length;
  }

  public refreshReservations() {
    this.reservationsSubject.next(this.reservations);
  }

  getMovies(){
    return this.moviesSubject.asObservable();
  }

  getReservations(){
    return this.reservationsSubject.asObservable();
  }

  get(path, options){
    return this.http.get(this.API_URL + path, options);
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
