import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {DateFormatPipe} from '../date-format.pipe';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(
    public apiService: ApiService,
    private dateFormatPipe: DateFormatPipe
  ) { }

  ngOnInit() {
    this.apiService.get('movies', {}).subscribe((data) => {
      let dataArray = new Int8Array(data);
      let movies: Object[] = [];
      for(let i in dataArray){
        movies[i] = data[i];
        console.log(movies[i]);
      }
      this.apiService.movies = movies;
      this.apiService.refreshMovies();
    });
  }

  updateMoviesWithFilter(filter){
    let dates = JSON.parse(filter);
    console.log(dates);
    let from = dates.from;
    let to = dates.to;
    if(from && to){
      from = this.dateFormatPipe.transformShortFormat(new Date(from.year, from.month-1, from.day));
      to = this.dateFormatPipe.transformShortFormat(new Date(to.year, to.month-1, to.day));
      this.apiService.get('movies', {params: {date_start: from, date_end: to}}).subscribe((data) => {
        let dataArray = new Int8Array(data);
        let movies: Object[] = [];
        for(let i in dataArray){
          movies[i] = data[i];
          console.log(movies[i]);
        }
        this.apiService.movies = movies;
        this.apiService.refreshMovies();
      });
    }
  }

  openModalReservation(movie_id){
    $(".modal_reservation").modal("show");
    $("#movie-id").val(movie_id);
  }
}
