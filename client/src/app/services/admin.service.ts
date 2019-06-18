import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

const url = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: Http) {

   }

  getTrainedData() {
    return this.http.get('http://localhost:3000/api/traineddata')
    .pipe(map(res => res.json()));
  }

  addTrainedData(info) {
    return this.http.post('http://localhost:3000/api/traineddata', info)
    .pipe(map(res => res.json()));
  }

  updateTrainedData(id, query) {
    return this.http.put('http://localhost:3000/api/traineddata/' + id, query)
    .pipe(map(res => res.json()));
  }

  getBookData() {
    return this.http.get('http://localhost:3000/api/admin')
    .pipe(map(res => res.json()));
  }

  addBookData(info) {
    return this.http.post('http://localhost:3000/api/admin', info)
    .pipe(map(res => res.json()));
  }


}
