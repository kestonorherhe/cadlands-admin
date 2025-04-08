import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationRequestListComponent } from './application-request-list/application-request-list.component';
import { PendingApplicationRequestListComponent } from './pending-application-request-list/pending-application-request-list.component';
import { ApprovedApplicationRequestListComponent } from './approved-application-request-list/approved-application-request-list.component';
import { PaidApplicationRequestListComponent } from './paid-application-request-list/paid-application-request-list.component';
import { OnGoingApplicationRequestListComponent } from './on-going-application-request-list/on-going-application-request-list.component';
import { PendingAllocationListComponent } from './pending-allocation-list/pending-allocation-list.component';
import { CancelledApplicationRequestListComponent } from './cancelled-application-request-list/cancelled-application-request-list.component';

const routes: Routes = [
  {
    path: "all-applications",
    component: ApplicationRequestListComponent,
  },
  {
    path: "pending-applications",
    component: PendingApplicationRequestListComponent,
  },
  {
    path: "approved-applications",
    component: ApprovedApplicationRequestListComponent,
  },
  {
    path: "on-going-applications",
    component: OnGoingApplicationRequestListComponent,
  },
  {
    path: "paid-applications",
    component: PaidApplicationRequestListComponent,
  },
  {
    path: "cancelled-applications",
    component: CancelledApplicationRequestListComponent,
  },
  {
    path: "pending-allocation",
    component: PendingAllocationListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRequestRoutingModule {}
