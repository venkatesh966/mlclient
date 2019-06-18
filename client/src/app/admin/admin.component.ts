import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { BookData } from '../interfaces/admin2';
import { TrainingData } from '../interfaces/admin';
declare let $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public index = 0;
  public trainBookString: string;
  public BookDataString: BookData;
  public trained: TrainingData;
  public gettrainedData: any = [];

  constructor(private adminService: AdminService, private _router: Router) {
    this.trained = {
      trainedData: '',
      trainedArticles: ''
    };

    this.BookDataString = {
      bookdata: '',
      noArticlebookdata: '',
      Rating: ''
    };
  }

  addBookData() {
    let dummybookdataString = '';
    let count = 0;
    const bookdata = this.BookDataString.bookdata;
    const dummybookdata = bookdata.split(' ');
    if (this.gettrainedData[this.index]) {
    const trainedArticles = this.gettrainedData[this.index].trainedArticles;
  const dummytrainedArticles = trainedArticles.split(' ');

    for (let i = 0; i < dummybookdata.length; i++) {
      for (let j = 0; j < dummytrainedArticles.length; j++) {
        if (dummybookdata[i] === dummytrainedArticles[j]) {
          count = count + 1;
        }
      }
      if (count > 0) {
        count = 0;
      } else {
        dummybookdataString =  dummybookdataString +  ' ' + dummybookdata[i] ;
      }
    }
    this.BookDataString.noArticlebookdata = dummybookdataString;
  }
      this.adminService.addBookData(this.BookDataString).subscribe((res) => {
      console.log(res); });
  }



  addTrainBookData() {
    if (this.gettrainedData.length > 0) {
      this.updateTrainBookData();
    } else {
      this.adminService.addTrainedData(this.trained).subscribe((res) => {
      });
    }
  }

  getTrainBookData() {
    this.adminService.getTrainedData().subscribe((res) => {
      this.gettrainedData = res;
    });
  }

  updateTrainBookData() {
    this.gettrainedData[this.index].trainedData = this.gettrainedData[this.index].trainedData + ' ' + this.trained.trainedData;
    this.gettrainedData[this.index].trainedArticles = this.gettrainedData[this.index].trainedArticles + ' ' + this.trained.trainedArticles;
    const query = {
      trainedData: this.gettrainedData[this.index].trainedData,
      trainedArticles: this.gettrainedData[this.index].trainedArticles
    };
    this.adminService.updateTrainedData(this.gettrainedData[this.index]._id, query).subscribe((res) => {
    });
  }

  // addBookData() {
  //   this.adminService.addTrainedData(this.trainBookString).subscribe();
  // }

  // getBookData() {
  //   this.adminService.addTrainedData(this.trainBookString).subscribe();
  // }

  logout() {
    this._router.navigate(['/']);
  }

  ngOnInit() {
    this.getTrainBookData();
  }

}
