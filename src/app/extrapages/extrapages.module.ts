import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CarouselModule } from "ngx-owl-carousel-o";
import { NgOtpInputModule } from "ng-otp-input";

import { ExtrapagesRoutingModule } from "./extrapages-routing.module";

import { MaintenanceComponent } from "./maintenance/maintenance.component";
import { Page404Component } from "./page404/page404.component";
import { Page500Component } from "./page500/page500.component";
import { Lockscreen2Component } from "./lockscreen2/lockscreen2.component";

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    MaintenanceComponent,
    Page404Component,
    Page500Component,
    Lockscreen2Component,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    ExtrapagesRoutingModule,
    NgOtpInputModule,
  ],
})
export class ExtrapagesModule {}
