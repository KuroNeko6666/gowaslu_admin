import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronDown, faChevronUp, faLock, faUser, faUserGear, faUserLock, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api/api.service';
import { AccountModel } from 'src/app/models/account-model';

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
  allAccount : number = 0
  allUser : number = 0
  allAdmin : number = 0
  allOperator : number = 0

  constructor(private api: ApiService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.api.getAllAccount().subscribe((res) => {
      if(res.message == 'Success'){
        let data = res.data as AccountModel[]
        this.allAccount = data.length
      }
    })
    this.api.getAllUser().subscribe((res) => {
      if(res.message == 'Success'){
        let data = res.data as AccountModel[]
        this.allUser = data.length
      }
    })
    this.api.getAllAdmin().subscribe((res) => {
      if(res.message == 'Success'){
        let data = res.data as AccountModel[]
        this.allAdmin = data.length
      }
    })
    this.api.getAllOperator().subscribe((res) => {
      if(res.message == 'Success'){
        let data = res.data as AccountModel[]
        this.allOperator = data.length
      }
    })
  }
}
