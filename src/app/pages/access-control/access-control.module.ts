import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UIModule } from "src/app/shared/ui/ui.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import {
  NgbDropdownModule,
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
import { AccessControlRoutingModule } from "./access-control-routing.module";
import { FeatureComponent } from "./feature/feature.component";
import { MenuListingComponent } from "./menu-listing/menu-listing.component";
import { MenuAuthorizationListingComponent } from "./menu-authorization-listing/menu-authorization-listing.component";
import { MenuTreeComponent } from "./menu-tree/menu-tree.component";
import { RoleComponent } from "./role/role.component";

@NgModule({
  declarations: [
    RoleComponent,
    FeatureComponent,
    MenuListingComponent,
    MenuAuthorizationListingComponent,
    MenuTreeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AccessControlRoutingModule,
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
  ],
})
export class AccessControlModule {}
