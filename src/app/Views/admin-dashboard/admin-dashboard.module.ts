import { NgModule } from '@angular/core';


import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule
    
  ],
  exports: [AdminDashboardComponent]
})

export class AdminDashboardModule { }



