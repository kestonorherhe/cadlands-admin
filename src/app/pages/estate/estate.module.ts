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
import { EstateListComponent } from "./estate-list/estate-list.component";
import { EstateRoutingModule } from "./estate-routing.module";
import { EstateProfileComponent } from "./estate-profile/estate-profile.component";
import { OtherListingComponent } from "./other-listing/other-listing.component";
import { OtherListingProfileComponent } from "./other-listing-profile/other-listing-profile.component";

@NgModule({
  declarations: [
    EstateListComponent,
    OtherListingComponent,
    EstateProfileComponent,
    OtherListingProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    EstateRoutingModule,
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
export class EstateModule {}
