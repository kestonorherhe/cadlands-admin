import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StaffListComponent } from "./staff-list/staff-list.component";
import { StaffProfileComponent } from "./staff-profile/staff-profile.component";
import { AgentListComponent } from "./agent-list/agent-list.component";
import { AgentProfileComponent } from "./agent-profile/agent-profile.component";

const routes: Routes = [
  {
    path: "staff-listings",
    component: StaffListComponent,
  },

  {
    path: "agents",
    component: AgentListComponent,
  },
  {
    path: "agent/:id",
    component: AgentProfileComponent,
  },
  {
    path: ":id",
    component: StaffProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
