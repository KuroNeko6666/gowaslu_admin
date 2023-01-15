import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMasterComponent } from './account-master/admin-master/admin-master.component';
import { OperatorMasterComponent } from './account-master/operator-master/operator-master.component';
import { UserMasterComponent } from './account-master/user-master/user-master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'account-master/user',
        component: UserMasterComponent
      },
      {
        path: 'account-master/admin',
        component: AdminMasterComponent
      },
      {
        path: 'account-master/operator',
        component: OperatorMasterComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'account-master',
        redirectTo: 'account-master/user',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
