import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffiliateListComponent } from './affiliate-list/affiliate-list.component';
import { AffiliateProfileComponent } from './affiliate-profile/affiliate-profile.component';
import { VerifiedAffiliateListComponent } from './verified-affiliate-list/verified-affiliate-list.component';
import { PendingAffiliateListComponent } from './pending-affiliate-list/pending-affiliate-list.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyWithdrawalComponent } from './my-withdrawal/my-withdrawal.component';
import { MyReferralsComponent } from './my-referrals/my-referrals.component';
import { MySalesHistoryComponent } from './my-sales-history/my-sales-history.component';

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
    path: "my-profile",
    component: MyProfileComponent,
  },
  {
    path: "my-withdrawal",
    component: MyWithdrawalComponent,
  },
  {
    path: "my-referrals",
    component: MyReferralsComponent,
  },
  {
    path: "my-sales-history",
    component: MySalesHistoryComponent,
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
