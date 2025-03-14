import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffiliateListComponent } from './affiliate-list/affiliate-list.component';
import { AffiliateProfileComponent } from './affiliate-profile/affiliate-profile.component';
import { VerifiedAffiliateListComponent } from './verified-affiliate-list/verified-affiliate-list.component';
import { PendingAffiliateListComponent } from './pending-affiliate-list/pending-affiliate-list.component';

const routes: Routes = [
  {
    path: "",
    component: AffiliateListComponent,
  },
  {
    path: "verified-affiliates",
    component: VerifiedAffiliateListComponent,
  },
  {
    path: "pending-affiliates",
    component: PendingAffiliateListComponent,
  },
  {
    path: ":id",
    component: AffiliateProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AffiliateRoutingModule {}
