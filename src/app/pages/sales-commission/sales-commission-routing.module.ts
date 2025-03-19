import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SalesCommissionListComponent } from "./sales-commission-list/sales-commission-list.component";
import { PendingSalesCommissionListComponent } from "./pending-sales-commission-list/pending-sales-commission-list.component";
import { PaidSalesCommissionListComponent } from "./paid-sales-commission-list/paid-sales-commission-list.component";
import { PendingWithdrawalRequestListComponent } from "./pending-withdrawal-request-list/pending-withdrawal-request-list.component";
import { PaidWithdrawalRequestListComponent } from "./paid-withdrawal-request-list/paid-withdrawal-request-list.component";
import { CancelledWithdrawalRequestListComponent } from "./cancelled-withdrawal-request-list/cancelled-withdrawal-request-list.component";

const routes: Routes = [
  {
    path: "all-listing",
    component: SalesCommissionListComponent,
  },
  {
    path: "pending-commissions",
    component: PendingSalesCommissionListComponent,
  },
  {
    path: "paid-commissions",
    component: PaidSalesCommissionListComponent,
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
export class SalesCommissionRoutingModule {}
