import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";
import { UserWiseLinksComponent } from "./user-wise-links/user-wise-links.component";
import { SupportListComponent } from "./support-list/support-list.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserListComponent,
    UserWiseLinksComponent,
    SupportListComponent,
    RouterModule.forChild([
      { path: '', redirectTo: 'user-list', pathMatch: 'full' },
      { path: 'user-list', component: UserListComponent },
      { path: 'user-wise-links/:userId', component: UserWiseLinksComponent },
      { path: 'support-list', component: SupportListComponent }
    ])
  ],
  exports: [],
})
export class ManageUserAdminModule {}



