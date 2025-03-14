import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstateListComponent } from './estate-list/estate-list.component';
import { EstateProfileComponent } from './estate-profile/estate-profile.component';

const routes: Routes = [
  {
    path: "list",
    component: EstateListComponent,
  },
  {
    path: ":id",
    component: EstateProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstateRoutingModule {}
