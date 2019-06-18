import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
   public userDetails: any;
   public gettrainedData: any;
   public trainedData: any;
   public trainedArticles: any;
   public userData: any;
   public userDataLength: any;
   public count = 0;
   public bookdata: any;
   public Databook: any;
   public counting = [];
   public resultDisplay = false;
  resultData: any;
  constructor(private userService: UserService, private router: Router, private adminService: AdminService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);

      }
    );

    this.getTrainBookData();
    this.getBookData();
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }




  getTrainBookData() {
    this.adminService.getTrainedData().subscribe((res) => {
      this.gettrainedData = res;
      this.trainedData = this.gettrainedData[0].trainedData.split(' ');
      this.trainedArticles = this.gettrainedData[0].trainedArticles.split(' ');
    });
    // this.trainedData = this.gettrainedData[0].trainedData.split(" ")
  }

  Solvation() {
   const  userData1 = this.userData.split(' ');
    this.userDataLength = userData1.length;
    for (let i = 0; i < userData1.length; i++) {
      for (let j = 0; j < this.trainedData.length; j++) {
        if (userData1[i] === this.trainedData[j]) {
          this.count = this.count + 1;
        }
      }
    }
    this.contentEvaluation();
  }

  contentEvaluation() {
    const negativeContentPercent = (this.count / this.userDataLength) * 100;
    // alert("")
    if (negativeContentPercent > 30) {
      alert('you are upset dont worry we will provide best solutions from famous books');
      this.problemSolving();
    } else {
      alert('you are happy still if u need any suggestions wait');
    }
  }

  getBookData() {
    this.adminService.getBookData().subscribe((res) => {
      this.bookdata = res;
      // for (let i = 0; i < this.bookdata.length; i++) {
      //   this.Databook[i] = this.bookdata[i];
      // }
    });
  }

  problemSolving() {
    const userData1 = this.userData.split(' ');
    const userData2 = this.removeArticles(userData1);
    const userData3 = userData2.split(' ');
    for (let i = 0; i < this.bookdata.length; i++) {
      this.counting[i] = 0;
      const split = this.bookdata[i].noArticlebookdata.split(' ');
      for (let k = 0; k < userData3.length; k++) {
        for (let j = 0; j < split.length; j++) {
          if (userData3[k] === split[j]) {
            this.counting[i] = this.counting[i] + 1;

          }
        }
      }
    }
    this.display();
  }

  removeArticles(articleData) {
    const data = articleData;
    let count = 0;
    let dummystring = '';
    const trainedArticles = this.trainedArticles;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < trainedArticles.length; j++) {
        if (data[i] === this.trainedArticles[j]) {
          count = count + 1;
        }
      }
      if (count > 0) {
        count = 0;
      } else {
        dummystring = dummystring + ' ' + data[i];
      }
    }
    return dummystring;
  }

  display() {
    let temp = this.counting[0];
    let index = 0;
    for (let i = 1; i < this.counting.length; i++) {
      if (temp <= this.counting[i]) {
      temp = this.counting[i];
      index = i;
      }
    }
    this.resultDisplay = true;
    // alert(JSON.stringify());
    this.resultData = this.bookdata[index].bookdata;
  }

}
