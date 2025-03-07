import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {
  NgbNavModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbTooltipModule,
  NgbCollapseModule,
} from "@ng-bootstrap/ng-bootstrap";
import { NgApexchartsModule } from "ng-apexcharts";
import { SimplebarAngularModule } from "simplebar-angular";

import { WidgetModule } from "../shared/widget/widget.module";
import { UIModule } from "../shared/ui/ui.module";

import { PagesRoutingModule } from "./pages-routing.module";

import { DashboardsModule } from "./dashboards/dashboards.module";
import { TablesModule } from "./tables/tables.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    DashboardsModule,
    HttpClientModule,
    UIModule,
    TablesModule,
    WidgetModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    SimplebarAngularModule,
  ],
})
export class PagesModule {}
