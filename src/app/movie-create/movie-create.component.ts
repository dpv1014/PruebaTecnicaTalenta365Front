import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../api.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public apiService: ApiService
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      url: this.fb.control('')
    });
  }

  register(form){
    console.log(form);
    let values = form.value;
    const params = new HttpParams({
      fromObject: {
        name: values.name,
        description: values.description,
        url: values.url
      }
    });
    this.apiService.post('movies', params).subscribe((data) => {
      console.log(data);
    });
  }

}
