import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdvancedService } from "../../tables/advancedtable/advanced.service";
import { DecimalPipe } from "@angular/common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { SettingsService } from "../../settings/settings.service";
import { PropertyService } from "../../property/property.service";

@Component({
  selector: "app-estate-profile",
  templateUrl: "./estate-profile.component.html",
  styleUrls: ["./estate-profile.component.scss"],
  providers: [AdvancedService, DecimalPipe],
})

/**
 * Contacts-profile component
 */
export class EstateProfileComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  isLoading = false;
  estateId: string;
  estate: any;
  data = [];

  buildingStructures = [{ name: "Duplex" }];
  propertyTitles = [{ name: "C of O" }];

  estates$: Observable<any>;
  propertyTypes$: Observable<any>;
  propertySubTypeList = [];
  buildingStructures$: Observable<any>;
  negotiationStatus$: Observable<any>;
  facilities$: Observable<any>;
  propertyTitles$: Observable<any>;
  propertyTemplates$: Observable<any>;
  properties$: Observable<any>;

  files: File[] = [];
  public Editor = ClassicEditor;

  obj = {
    estateId: null,
    propertyTypeId: null,
    propertySubTypeId: null,
    templateName: null,
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

  propertyObj = {
    propertyTemplateId: null,
    properties: [{ propertyName: null }],
  };

  addItem() {
    this.propertyObj.properties.push({ propertyName: null });
  }

  removeItem(index: number) {
    this.propertyObj.properties.splice(index, 1);
  }

  constructor(
    private readonly route: ActivatedRoute,
    private modalService: NgbModal,
    private readonly propertyService: PropertyService,
    private readonly settingsService: SettingsService
  ) {
    this.route.params.subscribe((params) => {
      this.estateId = params["id"];
      this.getRecord();
    });

    this.viewRecord = this.viewRecord.bind(this);
  }

  viewRecord(evt: any) {
    const id = evt.row.data.id;
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

  async createPropertyTemplateModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  async createPropertyModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Estate" },
      { label: "Profile", active: true },
    ];

    this.estates$ = this.propertyService.getAllEstate({});
    this.propertyTypes$ = this.settingsService.getAllPropertyTypes({});
    this.negotiationStatus$ = this.settingsService.getAllNegotiationStatus({});
    this.facilities$ = this.settingsService.getAllPropertyFacilities({});
    this.propertyTemplates$ = this.propertyService.getAllPropertyTemplates({
      estateId: this.estateId,
    });

    this.getAllProperties();
  }

  getAllProperties() {
    this.properties$ = this.propertyService.getAllProperties({
      estateId: this.estateId,
    });
  }

  getRecord() {
    this.propertyService.getAllEstate({ estateId: this.estateId }).subscribe(
      (response: any) => {
        console.log(
          "🚀 ~ FarmerProfileComponent ~ getUser ~ response:",
          response
        );
        this.estate = response.data;
      },
      (error) => {
        console.log("🚀 ~ FarmerProfileComponent ~ getUser ~ error:", error);
      }
    );
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
      templateName: null,
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

    this.propertyObj = {
      propertyTemplateId: null,
      properties: [{ propertyName: null }],
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
    this.isLoading = true;
    let formData: FormData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formData.append("files", this.files[i]);
    }

    const images = await this.propertyService.uploadImages(formData);
    const data = {
      estateId: +this.estateId,
      propertyTypeId: this.obj.propertyTypeId,
      propertySubTypeId: this.obj.propertySubTypeId,
      templateName: this.obj.templateName,
      buildingStructure: this.obj.buildingStructure,
      mapUrl: this.obj.mapUrl,
      size: this.obj.size,
      price: this.obj.propertyPrice,
      negotiationStatusId: this.obj.negotiationStatusId,
      description: this.obj.description,
      images: images.map((image: any) => {
        return image.secure_url;
      }),
      facilities: this.obj.facilities,
      titles: this.obj.titles,
    };
    this.propertyService.createPropertyTemplate(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Property template successfully created!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getRecord();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          "Process Failed!",
          "Failed to create property template",
          "error"
        );
      }
    );
  }
  async onSubmitProperty() {
    this.isLoading = true;

    this.propertyService.createProperty(this.propertyObj).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Property successfully created!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        // this.getRecord();
        this.getAllProperties();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to create property", "error");
      }
    );
  }
}
