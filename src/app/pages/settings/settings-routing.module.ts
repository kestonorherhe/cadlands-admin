import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
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
import { PropertyLocationListComponent } from "./property-location-list/property-location-list.component";
import { FaqComponent } from "./faq/faq.component";

const routes: Routes = [
  {
    path: "gender",
    component: GenderListComponent,
  },
  {
    path: "nationality",
    component: NationalityListComponent,
  },
  {
    path: "negotiation-status",
    component: NegotiationStatusListComponent,
  },
  {
    path: "payment-plan",
    component: PaymentPlanListComponent,
  },
  {
    path: "precautionary-tips",
    component: PrecautionaryTipsComponent,
  },
  {
    path: "property-facility",
    component: PropertyFacilityListComponent,
  },
  {
    path: "property-purpose",
    component: PropertyPurposeListComponent,
  },
  {
    path: "property-types",
    component: PropertyTypeListComponent,
  },
  {
    path: "affiliate-packages",
    component: AffiliatePackageListComponent,
  },
  {
    path: "relationship",
    component: RelationshipListComponent,
  },
  {
    path: "property-locations",
    component: PropertyLocationListComponent,
  },
  {
    path: "faqs",
    component: FaqComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
