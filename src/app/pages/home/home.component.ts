import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faChevronDown, faChevronRight, faCircle, faHome, faTableColumns, faUser, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api/api.service';

const ICON_DATA = {
  faBars: faBars,
  faX: faXmark,
  faHome: faHome,
  faArrowDown: faChevronDown,
  faArrowRight: faChevronRight,
  faDot: faCircle
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  icon = ICON_DATA
  isHidden = false
  user:any

  constructor(
    private router: Router,
    private api: ApiService
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(!this.api.checkLogin()){
      this.router.navigateByUrl('login')
    }

    this.user = JSON.parse(localStorage.getItem('user')!)
    console.log(this.user);

  }

  logout(){
    this.api.logout()
  }

  hideSideBar() {
    this.isHidden = !this.isHidden
  }
}
