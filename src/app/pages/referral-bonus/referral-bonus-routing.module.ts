import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReferralBonusListComponent } from "./referral-bonus-list/referral-bonus-list.component";
import { PendingReferralBonusListComponent } from "./pending-referral-bonus-list/pending-referral-bonus-list.component";
import { PaidReferralBonusListComponent } from "./paid-referral-bonus-list/paid-referral-bonus-list.component";
import { PendingWithdrawalRequestListComponent } from "./pending-withdrawal-request-list/pending-withdrawal-request-list.component";
import { PaidWithdrawalRequestListComponent } from "./paid-withdrawal-request-list/paid-withdrawal-request-list.component";
import { CancelledWithdrawalRequestListComponent } from "./cancelled-withdrawal-request-list/cancelled-withdrawal-request-list.component";

const routes: Routes = [
  {
    path: "all-referral-bonus",
    component: ReferralBonusListComponent,
  },
  {
    path: "pending-referral-bonus",
    component: PendingReferralBonusListComponent,
  },
  {
    path: "paid-referral-bonus",
    component: PaidReferralBonusListComponent,
  },
  {
    path: "pending-withdrawal-requests",
    component: PendingWithdrawalRequestListComponent,
  },
  {
    path: "paid-withdrawal-requests",
    component: PaidWithdrawalRequestListComponent,
  },
  {
    path: "cancelled-withdrawal-requests",
    component: CancelledWithdrawalRequestListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferralBonusRoutingModule {}
