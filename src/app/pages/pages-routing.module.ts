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
  {
    path: "tractor-requests",
    loadChildren: () =>
      import("./tractor-request/tractor-request.module").then(
        (m) => m.TractorRequestModule
      ),
  },
  {
    path: "farmers",
    loadChildren: () =>
      import("./farmer/farmer.module").then((m) => m.FarmerModule),
  },
  {
    path: "staff",
    loadChildren: () =>
      import("./staff/staff.module").then((m) => m.StaffModule),
  },
  {
    path: "tractor-owner",
    loadChildren: () =>
      import("./tractor-owner/tractor-owner.module").then(
        (m) => m.TractorOwnerModule
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
