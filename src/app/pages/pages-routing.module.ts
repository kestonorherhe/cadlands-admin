import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DefaultComponent } from "./dashboards/default/default.component";

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },

  { path: "dashboard", component: DefaultComponent },
  {
    path: "dashboards",
    loadChildren: () =>
      import("./dashboards/dashboards.module").then((m) => m.DashboardsModule),
  },
  // {
  //   path: "estates",
  //   component: EstateListComponent,
  // },
  {
    path: "application-request",
    loadChildren: () =>
      import("./application-request/application-request.module").then(
        (m) => m.ApplicationRequestModule
      ),
  },
  {
    path: "access-control",
    loadChildren: () =>
      import("./access-control/access-control.module").then(
        (m) => m.AccessControlModule
      ),
  },
  {
    path: "estate",
    loadChildren: () =>
      import("./estate/estate.module").then((m) => m.EstateModule),
  },
  {
    path: "property",
    loadChildren: () =>
      import("./property/property.module").then((m) => m.PropertyModule),
  },
  {
    path: "staff",
    loadChildren: () =>
      import("./staff/staff.module").then((m) => m.StaffModule),
  },
  {
    path: "affiliate",
    loadChildren: () =>
      import("./affiliate/affiliate.module").then((m) => m.AffiliateModule),
  },
  {
    path: "subscription",
    loadChildren: () =>
      import("./subscription/subscription.module").then((m) => m.SubscriptionModule),
  },
  {
    path: "sales-commission",
    loadChildren: () =>
      import("./sales-commission/sales-commission.module").then(
        (m) => m.SalesCommissionModule
      ),
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then((m) => m.SettingsModule),
  },
  // { path: "tables",
  //   loadChildren: () =>
  //     import("./tables/tables.module").then((m) => m.TablesModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
