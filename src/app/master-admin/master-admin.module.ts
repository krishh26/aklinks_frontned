import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { UserListComponent } from "./user-list/user-list.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    UserListComponent,
    RouterModule.forChild([
      { path: '', redirectTo: 'user-list', pathMatch: 'full' },
      { path: 'user-list', component: UserListComponent }
    ])
  ],
  exports: [],
})
export class MasterAdminModule {}




