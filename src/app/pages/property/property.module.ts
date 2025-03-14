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
import { PropertyRoutingModule } from "./property-routing.module";
import { PropertyListComponent } from "./property-list/property-list.component";
import { NgxDropzoneModule } from "ngx-dropzone";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { AvailablePropertyListComponent } from "./available-property-list/available-property-list.component";
import { SoldPropertyListComponent } from "./sold-property-list/sold-property-list.component";

@NgModule({
  declarations: [
    PropertyListComponent,
    AvailablePropertyListComponent,
    SoldPropertyListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PropertyRoutingModule,
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
    CKEditorModule,
  ],
})
export class PropertyModule {}
