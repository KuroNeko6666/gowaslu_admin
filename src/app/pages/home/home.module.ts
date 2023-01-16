import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserMasterComponent } from './account-master/user-master/user-master.component';
import { AdminMasterComponent } from './account-master/admin-master/admin-master.component';
import { OperatorMasterComponent } from './account-master/operator-master/operator-master.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { CardDashboardComponent } from './components/card-dashboard/card-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewsMasterComponent } from './news-master/news-master.component';
import { ActivityMasterComponent } from './activity-master/activity-master.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    UserMasterComponent,
    AdminMasterComponent,
    OperatorMasterComponent,
    SidebarComponent,
    HeaderComponent,
    CardDashboardComponent,
    NewsMasterComponent,
    ActivityMasterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
