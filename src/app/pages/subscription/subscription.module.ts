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
import { SimplebarAngularModule } from "simplebar-angular";
import { SubscriptionRoutingModule } from "./subscription-routing.module";
import { CancelledSubscriptionRequestListComponent } from "./cancelled-subscription-request-list/cancelled-subscription-request-list.component";
import { PaidsubScriptionRequestListComponent } from "./paid-subscription-request-list/paid-subscription-request-list.component";
import { AllsubScriptionRequestListComponent } from "./all-subscription-request-list/all-subscription-request-list.component";
import { PendingSubscriptionRequestListComponent } from "./pending-subscription-request-list/pending-subscription-request-list.component";
import { AllsubScriptionListComponent } from "./all-subscription-list/all-subscription-list.component";

@NgModule({
  declarations: [
    AllsubScriptionRequestListComponent,
    PendingSubscriptionRequestListComponent,
    PaidsubScriptionRequestListComponent,
    CancelledSubscriptionRequestListComponent,
    AllsubScriptionListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SubscriptionRoutingModule,
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
export class SubscriptionModule {}
