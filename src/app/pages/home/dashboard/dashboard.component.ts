import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronDown, faChevronUp, faLock, faUser, faUserGear, faUserLock, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { lastValueFrom, Observable } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { AccountModel } from 'src/app/models/account-model';
import { ActivityModel } from 'src/app/models/activity-model';
import { NewsModel } from 'src/app/models/news-model';

const ICON_DATA = {
  faUser: faUser,
  faAdmin: faUserLock,
  faOperator: faUserGear,
  faAllUser: faUsers,
  faArrowUp: faChevronUp,
  faArrowDown: faChevronDown,
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  icon = ICON_DATA
  allAccount: AccountModel[] = []
  allUser: AccountModel[] = []
  allAdmin: AccountModel[] = []
  allOperator: AccountModel[] = []
  allNews: NewsModel[] = []
  allActivity: ActivityModel[] = []
  dataUser: any[] = []
  date = this.getDate()
  month = this.getMonth()
  year = new Date().getFullYear()
  dataWeek: number[] = [0, 0, 0, 0, 0, 0, 0]
  newsWeek: number[] = [0, 0, 0, 0, 0, 0, 0]
  activityWeek: number[] = [0, 0, 0, 0, 0, 0, 0]
  constructor(private api: ApiService) { }

  getMonth() {
    let month = (new Date().getMonth() + 1).toString()
    if (month.length == 1) {
      month = '0' + month
    }
    return month
  }
  getDate() {
    let data = new Date().getDate().toString()
    if (data.length == 1) {
      data = '0' + data
    }
    return Number(data)
  }


  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllData().then((_) => {
      this.dataUser = []
      this.dataUser.push(this.allUser.length)
      this.dataUser.push(this.allAdmin.length)
      this.dataUser.push(this.allOperator.length)
      this.setDataPie()
      this.setDataBar()
    })

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  async getAllData() {
    await lastValueFrom(this.api.getAllAccount())
      .then((res) => {
        if (res.message == 'Success') {
          let data = res.data as AccountModel[]
          this.allAccount = data
        }
      })
    await lastValueFrom(this.api.getAllUser())
      .then((res) => {
        if (res.message == 'Success') {
          let data = res.data as AccountModel[]
          this.allUser = data
        }
      })
    await lastValueFrom(this.api.getAllAdmin())
      .then((res) => {
        if (res.message == 'Success') {
          let data = res.data as AccountModel[]
          this.allAdmin = data
        }
      })
    await lastValueFrom(this.api.getAllOperator())
      .then((res) => {
        if (res.message == 'Success') {
          let data = res.data as AccountModel[]
          this.allOperator = data
        }
      })

    await lastValueFrom(this.api.getAllNews())
      .then((res) => {
        if (res.message == 'Success') {
          let data = res.data as NewsModel[]
          this.allNews = data

        }
      })
    await lastValueFrom(this.api.getAllActivity())
      .then((res) => {
        if (res.message == 'Success') {
          let data = res.data as ActivityModel[]
          this.allActivity = data
        }
      })

    this.allAccount.forEach((val: AccountModel) => {
      let valDate = val.created_at.split('T')[0].split('-')
      if (valDate[0] == this.year.toString() && valDate[1] == this.month) {
        for (let index = 0; index < 7; index++) {
          if (valDate[2] == (this.date - index).toString()) {
            this.dataWeek[index] += 1
          } else {
            this.dataWeek[index] += 0
          }
        }
      }
    })
    this.allNews.forEach((val: NewsModel) => {
      let valDate = val.created_at.split('T')[0].split('-')
      if (valDate[0] == this.year.toString() && valDate[1] == this.month) {
        for (let index = 0; index < 7; index++) {
          if (valDate[2] == (this.date - index).toString()) {
            this.newsWeek[index] += 1
          } else {
            this.newsWeek[index] += 0
          }
        }
      }
    })
    this.allActivity.forEach((val: ActivityModel) => {
      let valDate = val.created_at.split('T')[0].split('-')
      if (valDate[0] == this.year.toString() && valDate[1] == this.month) {
        for (let index = 0; index < 7; index++) {
          if (valDate[2] == (this.date - index).toString()) {
            this.activityWeek[index] += 1
          } else {
            this.activityWeek[index] += 0
          }
        }
      }
    })

    console.log(this.activityWeek);
    console.log(this.newsWeek);
  }

  public barChartLegend = true;
  public barChartPlugins = [];

  public pieChartLegend = true;
  public pieChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Jumlah ' },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels = ['User', 'Admin', 'Operator'];

  public pieChartDatasets = [{
    data: [0, 0, 0]
  }];

  setDataBar() {
    this.barChartData = {
      labels: this.getLabelDataWeek().reverse(),
      datasets: [
        { data: this.dataWeek.reverse(), label: 'Pendaftaran Pengguna' },
        { data: this.activityWeek.reverse(), label: 'Pendaftaran Activity' },
        { data: this.newsWeek.reverse(), label: 'Pendaftaran News' },
      ]
    };
  }

  getLabelDataWeek() {
    let week = []
    for (let index = 0; index < 7; index++) {
      week.push((this.date - index) + '-' + this.month + '-' + this.year)
    }
    return week
  }

  setDataPie() {
    console.log(this.dataUser);

    this.pieChartDatasets = [
      {
        data: this.dataUser
      }
    ]
  }
}
