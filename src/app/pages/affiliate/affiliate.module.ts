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
import { AffiliateRoutingModule } from "./affiliate-routing.module";
import { AffiliateListComponent } from "./affiliate-list/affiliate-list.component";
import { AffiliateProfileComponent } from "./affiliate-profile/affiliate-profile.component";
import { VerifiedAffiliateListComponent } from "./verified-affiliate-list/verified-affiliate-list.component";
import { PendingAffiliateListComponent } from "./pending-affiliate-list/pending-affiliate-list.component";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { MyWithdrawalComponent } from "./my-withdrawal/my-withdrawal.component";
import { MyReferralsComponent } from "./my-referrals/my-referrals.component";
import { MySalesHistoryComponent } from "./my-sales-history/my-sales-history.component";
import { MySubscriptionComponent } from "./my-subscription/my-subscription.component";

@NgModule({
  declarations: [
    AffiliateListComponent,
    VerifiedAffiliateListComponent,
    PendingAffiliateListComponent,
    AffiliateProfileComponent,
    MyProfileComponent,
    MyWithdrawalComponent,
    MyReferralsComponent,
    MySalesHistoryComponent,
    MySubscriptionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AffiliateRoutingModule,
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
export class AffiliateModule {}
