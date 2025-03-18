import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SalesCommissionListComponent } from "./sales-commission-list/sales-commission-list.component";
import { PendingSalesCommissionListComponent } from "./pending-sales-commission-list/pending-sales-commission-list.component";
import { PaidSalesCommissionListComponent } from "./paid-sales-commission-list/paid-sales-commission-list.component";

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesCommissionRoutingModule {}
