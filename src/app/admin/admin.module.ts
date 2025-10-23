import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { WithdrawsComponent } from "./withdraws/withdraws.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    DashboardComponent,
    WithdrawsComponent,
    RouterModule.forChild([
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'withdraws', component: WithdrawsComponent }
    ])
  ],
  exports: [],
})
export class AdminModule {}
