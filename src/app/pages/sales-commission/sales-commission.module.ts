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
import { SalesCommissionRoutingModule } from "./sales-commission-routing.module";
import { SalesCommissionListComponent } from "./sales-commission-list/sales-commission-list.component";
import { PendingSalesCommissionListComponent } from "./pending-sales-commission-list/pending-sales-commission-list.component";
import { PaidSalesCommissionListComponent } from "./paid-sales-commission-list/paid-sales-commission-list.component";

@NgModule({
  declarations: [
    SalesCommissionListComponent,
    PendingSalesCommissionListComponent,
    PaidSalesCommissionListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SalesCommissionRoutingModule,
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
export class SalesCommissionModule {}
