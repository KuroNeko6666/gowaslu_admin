import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faXmark, faHome, faChevronDown, faChevronRight, faCircle, faTableColumns, faUser, faNewspaper, faCalendar } from '@fortawesome/free-solid-svg-icons';

const ICON_DATA = {
  faX: faXmark,
  faHome: faHome,
  faArrowDown: faChevronDown,
  faArrowRight: faChevronRight,
}

const MENU_DATA = [
  {
    name: 'Dashboard',
    icon: faTableColumns,
    path: '/home/dashboard',
    collapse: false,
    children: []
  },
  {
    name: 'Account Master',
    icon: faUser,
    path: '/home/account-master/',
    collapse: false,
    children: [
      {
        name: 'User',
        path: '/home/account-master/user',
      },
      {
        name: 'Admin',
        path: '/home/account-master/admin',
      },
      {
        name: 'Operator',
        path: '/home/account-master/operator',
      }
    ]
  },
  {
    name: 'News Master',
    icon: faNewspaper,
    path: '/home/news',
    collapse: false,
    children: []
  },
  {
    name: 'Activity Master',
    icon: faCalendar,
    path: '/home/activity',
    collapse: false,
    children: []
  },
]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Output('hideSideBar') hideSideBar : EventEmitter<any> = new EventEmitter()

  icon = ICON_DATA
  isHidden = false
  menu = MENU_DATA
  currentPath: string | null = null

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.currentPath == null){
      this.currentPath = this.router.url
    }
  }

  changePage(url : string){
    this.router.navigateByUrl(url).then((res)=>{
      if(res){
        this.currentPath = url;
        this.menu = MENU_DATA;
      }
    })
  }


}
