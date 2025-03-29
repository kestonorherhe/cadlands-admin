import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { PropertyService } from "../property.service";
import { SettingsService } from "../../settings/settings.service";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Observable } from "rxjs";

@Component({
  selector: "app-available-property-list",
  templateUrl: "./available-property-list.component.html",
  styleUrls: ["./available-property-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class AvailablePropertyListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  data = [];
  buildingStructures = [{ name: "Duplex" }];
  propertyTitles = [{ name: "C of O" }];

  properties$: Observable<any>;

  estates$: Observable<any>;
  propertyTypes$: Observable<any>;
  propertySubTypeList = [];
  buildingStructures$: Observable<any>;
  negotiationStatus$: Observable<any>;
  facilities$: Observable<any>;
  propertyTitles$: Observable<any>;

  files: File[] = [];
  public Editor = ClassicEditor;

  isLoading = false;

  obj = {
    estateId: null,
    propertyTypeId: null,
    propertySubTypeId: null,
    propertyName: null,
    buildingStructure: null,
    mapUrl: null,
    size: null,
    propertyPrice: null,
    negotiationStatusId: null,
    description: null,
    images: null,
    facilities: [],
    titles: [],
  };

  constructor(
    private modalService: NgbModal,
    private readonly _router: Router,
    private readonly propertyService: PropertyService,
    private readonly settingsService: SettingsService
  ) {
    this.viewRecord = this.viewRecord.bind(this);
  }

  viewRecord(evt: any) {
    const id = evt.row.data.id;
    this._router.navigate(["staff", id]);
  }

  closeModal() {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you would like to cancel?",
      showDenyButton: true,
      allowOutsideClick: false,
      confirmButtonText: "Yes, cancel it!",
      confirmButtonColor: "#1B84FF",
      denyButtonText: `No, return`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.resetForm();
        this.modalService.dismissAll();
      }
    });
  }

  async createRecordModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: false,
      size: "lg",
    });
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Contacts" },
      { label: "Profile", active: true },
    ];

    this.estates$ = this.propertyService.getAllEstate({});
    this.propertyTypes$ = this.settingsService.getAllPropertyTypes({});
    this.negotiationStatus$ = this.settingsService.getAllNegotiationStatus({});
    this.facilities$ = this.settingsService.getAllPropertyFacilities({});
    // this.propertyTitles$ = this.settingsService.getAllPro({});
    this.getAllProperties();
  }

  getAllProperties() {
    this.isLoading = true;
    this.properties$ = this.propertyService.getAllProperties({
      status: "Available",
    });
    // .subscribe(
    //   (response: any) => {
    //     this.data = response.data;
    //     this.isLoading = false;
    //   },
    //   (error) => {
    //     this.isLoading = false;
    //   }
    // );
  }

  onSelectPropertyType(evt: any) {
    console.log(
      "🚀 ~ PropertyListComponent ~ onSelectPropertyType ~ evt:",
      evt
    );
    this.propertySubTypeList = evt.propertySubTypes;
  }

  resetForm() {
    this.obj = {
      estateId: null,
      propertyTypeId: null,
      propertySubTypeId: null,
      propertyName: null,
      buildingStructure: null,
      mapUrl: null,
      size: null,
      propertyPrice: null,
      negotiationStatusId: null,
      description: null,
      images: null,
      facilities: [],
      titles: [],
    };
  }

  // dropzone methods
  onSelect(event: any) {
    console.log(event);
    if (this.files.length > 1) {
      Swal.fire("", "You can add only one image", "warning");
    }
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  async onSubmit() {
    let formData: FormData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formData.append("files", this.files[i]);
    }

    this.isLoading = true;
    const data = {
      estateId: this.obj.estateId,
      propertyTypeId: this.obj.propertyTypeId,
      propertySubTypeId: this.obj.propertySubTypeId,
      name: this.obj.propertyName,
      buildingStructure: this.obj.buildingStructure,
      mapUrl: this.obj.mapUrl,
      size: this.obj.size,
      price: this.obj.propertyPrice,
      negotiationStatusId: this.obj.negotiationStatusId,
      description: this.obj.description,
      images: await this.propertyService.uploadImages(formData),
      facilities: [],
      titles: [],
    };
    this.propertyService.createProperty(data).subscribe(
      (response: any) => {
        console.log(
          "🚀 ~ PropertyListComponent ~ onSubmit ~ response:",
          response
        );
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Property successfully created!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllProperties();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to create property", "error");
      }
    );
  }
}
