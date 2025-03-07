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
import { FarmerListComponent } from "./farmer-list/farmer-list.component";
import { FarmerRoutingModule } from "./farmer-routing.module";
import { FarmerProfileComponent } from "./farmer-profile/farmer-profile.component";
import { SimplebarAngularModule } from "simplebar-angular";

@NgModule({
  declarations: [FarmerListComponent, FarmerProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    FarmerRoutingModule,
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
  ],
})
export class FarmerModule {}
