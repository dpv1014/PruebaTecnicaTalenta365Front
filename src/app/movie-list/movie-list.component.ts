import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  public columns = ['id', 'name', 'description', 'url', 'days'];
  public rows;

  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('movies', {}).subscribe((data) => {
      this.rows = data;
    });
  }

}
