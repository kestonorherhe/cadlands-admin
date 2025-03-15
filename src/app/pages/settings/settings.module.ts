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
import { SettingsRoutingModule } from "./settings-routing.module";
import { GenderListComponent } from "./gender-list/gender-list.component";
import { NationalityListComponent } from "./nationality-list/nationality-list.component";
import { PropertyTypeListComponent } from "./property-type-list/property-type-list.component";
import { NegotiationStatusListComponent } from "./negotiation-status-list/negotiation-status-list.component";
import { PaymentPlanListComponent } from "./payment-plan-list/payment-plan-list.component";
import { PrecautionaryTipsComponent } from "./precautionary-tips/precautionary-tips.component";
import { PropertyFacilityListComponent } from "./property-facility-list/property-facility-list.component";
import { PropertyPurposeListComponent } from "./property-purpose-list/property-purpose-list.component";
import { RelationshipListComponent } from "./relationship-list/relationship-list.component";
import { AffiliatePackageListComponent } from "./affiliate-package-list/affiliate-package-list.component";

@NgModule({
  declarations: [
    GenderListComponent,
    NationalityListComponent,
    PropertyTypeListComponent,
    NegotiationStatusListComponent,
    PaymentPlanListComponent,
    PrecautionaryTipsComponent,
    PropertyFacilityListComponent,
    PropertyPurposeListComponent,
    RelationshipListComponent,
    AffiliatePackageListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule,
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
export class SettingsModule {}
