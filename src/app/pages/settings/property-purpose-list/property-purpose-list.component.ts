import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { SettingsService } from "../settings.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-property-purpose-list",
  templateUrl: "./property-purpose-list.component.html",
  styleUrls: ["./property-purpose-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class PropertyPurposeListComponent implements OnInit {
  isLoading = false;

  obj = {
    id: null,
    purpose: null,
    description: null,
  };

  propertyPurposeCommission = {
    propertyPurposeId: null,
    commission: null,
  };

  propertyPurpose$: Observable<any>;
  propertyPurpose: any;
  commissions$: Observable<any>;
  tabType = "commissions";
  showDetail = false;

  constructor(
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private readonly settingsService: SettingsService
  ) {}

  viewRecord(data: any) {
    this.showDetail = true;
    this.propertyPurpose = data;
    this.getPropertyPurposeInfo();
    this.commissions$ = this.settingsService.prices$;
    this.cdr.detectChanges();
  }

  getPropertyPurposeInfo() {
    this.settingsService
      .getAllPropertyPurpose({
        propertyPurposeId: this.propertyPurpose.id,
      })
      .subscribe(
        (response: any) => {
          this.settingsService.setPropertyPurposeCommissions(
            response?.data?.commissions
          );
          this.commissions$ = this.settingsService.propertyPurposeCommissions$;
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
    if (tabItem === "commissions")
      this.commissions$ = this.settingsService.propertyLocationCommissions$;
    this.cdr.detectChanges();
    this.tabType = tabItem;
  }

  closeDetail() {
    this.showDetail = false;
    this.propertyPurpose = null;
    this.cdr.detectChanges();
  }

  async createRecordModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }
  async updateRecordModal(content: any) {
    this.obj = this.propertyPurpose;
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  async showCreatePropertyPurposeCommissionModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  ngOnInit() {
    this.getAllPropertyPurpose();
  }

  getAllPropertyPurpose() {
    this.propertyPurpose$ = this.settingsService.getAllPropertyPurpose({});
  }

  resetForm() {
    this.obj = {
      id: null,
      purpose: null,
      description: null,
    };
    this.propertyPurposeCommission = {
      propertyPurposeId: null,
      commission: null,
    };
  }

  onSubmit() {
    this.isLoading = true;
    this.settingsService.createPropertyPurpose(this.obj).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Successfully created property purpose!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllPropertyPurpose();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          "Process Failed!",
          "Failed to create affiliate package",
          "error"
        );
      }
    );
  }
  onUpdate() {
    this.isLoading = true;
    const data = {
      id: this.obj.id,
      purpose: this.obj.purpose,
      description: this.obj.description,
    };
    this.settingsService.updatePropertyPurpose(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Successfully updated property purpose!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllPropertyPurpose();
        this.getPropertyPurposeInfo();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          "Process Failed!",
          "Failed to update affiliate package",
          "error"
        );
      }
    );
  }

  onSubmitPropertyPurposeCommission() {
    this.isLoading = true;
    const data = {
      propertyPurposeId: this.propertyPurpose.id,
      commission: this.propertyPurposeCommission.commission,
    };
    this.settingsService.createPropertyPurposeCommission(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Successfully updated property purpose commission!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getPropertyPurposeInfo();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to update package price", "error");
      }
    );
  }
}
