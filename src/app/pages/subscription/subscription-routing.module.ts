import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CancelledSubscriptionRequestListComponent } from './cancelled-subscription-request-list/cancelled-subscription-request-list.component';
import { PaidsubScriptionRequestListComponent } from './paid-subscription-request-list/paid-subscription-request-list.component';
import { AllsubScriptionRequestListComponent } from './all-subscription-request-list/all-subscription-request-list.component';
import { PendingSubscriptionRequestListComponent } from './pending-subscription-request-list/pending-subscription-request-list.component';
import { AllsubScriptionListComponent } from './all-subscription-list/all-subscription-list.component';

const routes: Routes = [
  {
    path: "subscription-request-list",
    component: AllsubScriptionRequestListComponent,
  },
  {
    path: "pending-subscription-requests",
    component: PendingSubscriptionRequestListComponent,
  },
  {
    path: "paid-subscription-requests",
    component: PaidsubScriptionRequestListComponent,
  },
  {
    path: "cancelled-subscription-requests",
    component: CancelledSubscriptionRequestListComponent,
  },
  {
    path: "subscriptions",
    component: AllsubScriptionListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule {}
