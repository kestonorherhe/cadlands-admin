import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstateListComponent } from './estate-list/estate-list.component';
import { EstateProfileComponent } from './estate-profile/estate-profile.component';
import { OtherListingComponent } from './other-listing/other-listing.component';
import { OtherListingProfileComponent } from './other-listing-profile/other-listing-profile.component';

const routes: Routes = [
  {
    path: "list",
    component: EstateListComponent,
  },
  {
    path: "our-estates",
    component: EstateListComponent,
  },
  {
    path: "other-listings",
    component: OtherListingComponent,
  },
  {
    path: "other-listing/:id",
    component: OtherListingProfileComponent,
  },
  {
    path: "info/:id",
    component: EstateProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstateRoutingModule {}
