import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffiliateListComponent } from './affiliate-list/affiliate-list.component';
import { AffiliateProfileComponent } from './affiliate-profile/affiliate-profile.component';
import { VerifiedAffiliateListComponent } from './verified-affiliate-list/verified-affiliate-list.component';
import { PendingAffiliateListComponent } from './pending-affiliate-list/pending-affiliate-list.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyReferralsComponent } from './my-referrals/my-referrals.component';
import { MySalesHistoryComponent } from './my-sales-history/my-sales-history.component';
import { MySubscriptionComponent } from './my-subscription/my-subscription.component';
import { MyCommissionWithdrawalComponent } from './my-commission-withdrawal/my-commission-withdrawal.component';
import { MyBonusWithdrawalComponent } from './my-bonus-withdrawal/my-bonus-withdrawal.component';

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
    path: "my-commission-withdrawal",
    component: MyCommissionWithdrawalComponent,
  },
  {
    path: "my-bonus-withdrawal",
    component: MyBonusWithdrawalComponent,
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
    path: "my-subscriptions",
    component: MySubscriptionComponent,
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
