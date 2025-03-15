import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UIModule } from "src/app/shared/ui/ui.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from "@ng-bootstrap/ng-bootstrap";
import {
  DxButtonModule,
  DxDataGridModule,
  DxLoadIndicatorModule,
  DxLoadPanelModule,
  DxTemplateModule,
} from "devextreme-angular";
import { NgApexchartsModule } from "ng-apexcharts";
import { StaffListComponent } from "./staff-list/staff-list.component";
import { StaffRoutingModule } from "./staff-routing.module";
import { StaffProfileComponent } from "./staff-profile/staff-profile.component";
import { SimplebarAngularModule } from "simplebar-angular";
import { AgentListComponent } from "./agent-list/agent-list.component";
import { AgentProfileComponent } from "./agent-profile/agent-profile.component";
import { MenuTreeComponent } from "./menu-tree/menu-tree.component";

@NgModule({
  declarations: [
    StaffListComponent,
    StaffProfileComponent,
    AgentListComponent,
    AgentProfileComponent,
    MenuTreeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StaffRoutingModule,
    UIModule,
    NgSelectModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    DxDataGridModule,
    DxButtonModule,
    DxLoadPanelModule,
    DxLoadIndicatorModule,
    DxTemplateModule,
    NgApexchartsModule,
    NgbNavModule,
    SimplebarAngularModule,
    // NgxSkeletonLoaderModule,
  ],
})
export class StaffModule {}
