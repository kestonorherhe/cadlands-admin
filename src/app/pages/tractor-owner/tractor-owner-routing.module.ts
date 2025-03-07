import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TractorOwnerListComponent } from "./tractor-owner-list/tractor-owner-list.component";
import { TractorOwnerProfileComponent } from "./tractor-owner-profile/tractor-owner-profile.component";

const routes: Routes = [
  {
    path: "list",
    component: TractorOwnerListComponent,
  },

  {
    path: ":id",
    component: TractorOwnerProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TractorOwnerRoutingModule {}
