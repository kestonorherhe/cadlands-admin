import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './default/default.component';
import { AffiliateDashboardComponent } from './affiliate-dashboard/affiliate-dashboard.component';

const routes: Routes = [
  {
    path: "default",
    component: DefaultComponent,
  },
  {
    path: "my-dashboard",
    component: AffiliateDashboardComponent,
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {}
