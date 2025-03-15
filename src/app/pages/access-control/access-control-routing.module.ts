import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FeatureComponent } from "./feature/feature.component";
import { MenuListingComponent } from "./menu-listing/menu-listing.component";
import { MenuAuthorizationListingComponent } from "./menu-authorization-listing/menu-authorization-listing.component";
import { RoleComponent } from "./role/role.component";

const routes: Routes = [
  {
    path: "roles",
    component: RoleComponent,
  },
  {
    path: "features",
    component: FeatureComponent,
  },
  {
    path: "menu-listing",
    component: MenuListingComponent,
  },
  {
    path: "menu-authorization-listing",
    component: MenuAuthorizationListingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessControlRoutingModule {}
