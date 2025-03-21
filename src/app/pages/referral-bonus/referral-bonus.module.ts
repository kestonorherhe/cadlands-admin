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
import { ReferralBonusRoutingModule } from "./referral-bonus-routing.module";
import { ReferralBonusListComponent } from "./referral-bonus-list/referral-bonus-list.component";
import { PendingReferralBonusListComponent } from "./pending-referral-bonus-list/pending-referral-bonus-list.component";
import { PaidReferralBonusListComponent } from "./paid-referral-bonus-list/paid-referral-bonus-list.component";
import { PendingWithdrawalRequestListComponent } from "./pending-withdrawal-request-list/pending-withdrawal-request-list.component";
import { PaidWithdrawalRequestListComponent } from "./paid-withdrawal-request-list/paid-withdrawal-request-list.component";
import { CancelledWithdrawalRequestListComponent } from "./cancelled-withdrawal-request-list/cancelled-withdrawal-request-list.component";

@NgModule({
  declarations: [
    ReferralBonusListComponent,
    PendingReferralBonusListComponent,
    PaidReferralBonusListComponent,
    PendingWithdrawalRequestListComponent,
    PaidWithdrawalRequestListComponent,
    CancelledWithdrawalRequestListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReferralBonusRoutingModule,
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
export class ReferralBonusModule {}
