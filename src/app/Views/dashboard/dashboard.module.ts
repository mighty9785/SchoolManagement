import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { LoaderModule } from '../Shared/loader/loader.module';

// import { PlacementDashboardModule } from '../placement-dashboard/placement-dashboard.module';
// import { PrincipleDashboardModule } from '../principle-dashboard/principle-dashboard.module';
// import { StudentDashboardModule } from '../student-dashboard/student-dashboard.module';
// import { StaffDashboardModule } from '../staff-dashboard/staff-dashboard.module';
// import { AdminDashboardITIModule } from '../ITI/admin-dashboard-iti/admin-dashboard-iti.module'
// import { CopyCheckerDashboardModule } from '../CopyChecker/copy-checker-dashboard/copy-checker-dashboard.module';
import { AdminDashboardModule } from '../admin-dashboard/admin-dashboard.module';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule,
    AdminDashboardModule,
  ]
})
export class dashboardModule { }
