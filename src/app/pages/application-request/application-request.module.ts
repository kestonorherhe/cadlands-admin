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
import { NgxDropzoneModule } from "ngx-dropzone";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { ApplicationRequestRoutingModule } from "./application-request-routing.module";
import { ApplicationRequestListComponent } from "./application-request-list/application-request-list.component";
import { PendingApplicationRequestListComponent } from "./pending-application-request-list/pending-application-request-list.component";
import { ApprovedApplicationRequestListComponent } from "./approved-application-request-list/approved-application-request-list.component";
import { PaidApplicationRequestListComponent } from "./paid-application-request-list/paid-application-request-list.component";
import { OnGoingApplicationRequestListComponent } from "./on-going-application-request-list/on-going-application-request-list.component";
import { PendingAllocationListComponent } from "./pending-allocation-list/pending-allocation-list.component";
import { CancelledApplicationRequestListComponent } from "./cancelled-application-request-list/cancelled-application-request-list.component";
import { CompletedApplicationRequestListComponent } from "./completed-application-request-list/completed-application-request-list.component";

@NgModule({
  declarations: [
    ApplicationRequestListComponent,
    PendingApplicationRequestListComponent,
    ApprovedApplicationRequestListComponent,
    PaidApplicationRequestListComponent,
    CompletedApplicationRequestListComponent,
    CancelledApplicationRequestListComponent,
    OnGoingApplicationRequestListComponent,
    PendingAllocationListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ApplicationRequestRoutingModule,
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
    NgxDropzoneModule,
    // EditorModule,
    CKEditorModule,
  ],
})
export class ApplicationRequestModule {}
