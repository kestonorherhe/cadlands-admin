import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { SettingsService } from "../settings.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-property-type-list",
  templateUrl: "./property-type-list.component.html",
  styleUrls: ["./property-type-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class PropertyTypeListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  data = [];

  isLoading = false;

  obj = {
    name: null,
    description: null,
  };

  propertySubType = {
    name: null,
    description: null,
  };

  propertyTypes$: Observable<any>;
  propertyType: any;
  propertySubTypes$: Observable<any>;
  tabType = "property-sub-type";
  showDetail = false;
  constructor(
    private modalService: NgbModal,
    private readonly _router: Router,
    private cdr: ChangeDetectorRef,
    private readonly settingsService: SettingsService
  ) {
    this.viewRecord = this.viewRecord.bind(this);
  }

  viewRecord(data: any) {
    console.log("we are editing ::", data);
    this.showDetail = true;
    this.propertyType = data;
    this.getPropertyType();
    this.propertySubTypes$ = this.settingsService.propertySubTypes$;
    this.cdr.detectChanges();
  }

  getPropertyType() {
    this.settingsService
      .getAllPropertyTypes({
        propertyTypeId: this.propertyType.id,
      })
      .subscribe(
        (response: any) => {
          console.log(
            "🚀 ~ MealTypeComponent ~ viewRecord ~ response:",
            response
          );
          this.settingsService.setPropertySubTypes(
            response?.data?.propertySubTypes
          );
          this.propertySubTypes$ = this.settingsService.propertySubTypes$;
          this.cdr.detectChanges();
        },
        (error) => {
          console.log("🚀 ~ MealTypeComponent ~ viewRecord ~ error:", error);
        }
      );
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

  toggleTab(tabItem: string) {
    if (tabItem === "property-sub-type")
      this.propertySubTypes$ = this.settingsService.propertySubTypes$;
    this.cdr.detectChanges();
    this.tabType = tabItem;
  }

  closeDetail() {
    this.showDetail = false;
    this.propertyType = null;
    this.cdr.detectChanges();
  }

  async createRecordModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  async showCreatePropertySubTypeModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Contacts" },
      { label: "Profile", active: true },
    ];

    this.getAllPropertyTypes();
  }

  getAllPropertyTypes() {
    // this.settingsService.getAllPropertyTypes({}).subscribe(
    //   (response: any) => {
    //     this.data = response.data;
    //     this.isLoading = false;
    //   },
    //   (error) => {
    //     this.isLoading = false;
    //   }
    // );
    this.propertyTypes$ = this.settingsService.getAllPropertyTypes({})
  }

  resetForm() {
    this.obj = {
      name: null,
      description: null,
    };
    this.propertySubType = {
      name: null,
      description: null,
    };
  }

  onSubmit() {
    this.isLoading = true;
    this.settingsService.createPropertyType(this.obj).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Property type successfully created!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllPropertyTypes();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to capture farmer", "error");
      }
    );
  }
  onSubmitPropertySubType() {
    this.isLoading = true;
    const data = {
      propertyTypeId: this.propertyType.id,
      name: this.propertySubType.name,
    };
    this.settingsService.createPropertySubType(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Property sub-type successfully created!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getPropertyType();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to capture farmer", "error");
      }
    );
  }
}
