import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { SettingsService } from "../settings.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-property-location-list",
  templateUrl: "./property-location-list.component.html",
  styleUrls: ["./property-location-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class PropertyLocationListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  data = [];
  isLoading = false;

  obj = {
    id: null,
    name: null,
    description: null,
  };

  propertyLocationCommission = {
    propertyLocationId: null,
    commission: null,
  };

  propertyLocations$: Observable<any>;
  propertyLocation: any;
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
    this.propertyLocation = data;
    this.getPropertyLocationInfo();
    this.commissions$ = this.settingsService.prices$;
    this.cdr.detectChanges();
  }

  getPropertyLocationInfo() {
    this.settingsService
      .getAllPropertyLocations({
        propertyLocationId: this.propertyLocation.id,
      })
      .subscribe(
        (response: any) => {
          this.settingsService.setPropertyLocationCommissions(
            response?.data?.commissions
          );
          this.commissions$ = this.settingsService.propertyLocationCommissions$;
          this.cdr.detectChanges();
        },
        (error) => {
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
    this.propertyLocation = null;
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
    this.obj = this.propertyLocation;
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  async showCreatePropertyLocationCommissionModal(content: any) {
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

    this.getAllPropertyLocations();
  }

  getAllPropertyLocations() {
    this.propertyLocations$ = this.settingsService.getAllPropertyLocations({});
  }

  resetForm() {
    this.obj = {
      id: null,
      name: null,
      description: null,
    };
    this.propertyLocationCommission = {
      propertyLocationId: null,
      commission: null,
    };
  }

  onSubmit() {
    this.isLoading = true;
    this.settingsService.createPropertyLocation(this.obj).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Successfully created affiliate package!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllPropertyLocations();
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
      name: this.obj.name,
      description: this.obj.description,
    };
    this.settingsService.updatePropertyLocation(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Successfully updated affiliate package!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllPropertyLocations();
        this.getPropertyLocationInfo();
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

  onSubmitPackagePrice() {
    this.isLoading = true;
    const data = {
      propertyLocationId: this.propertyLocation.id,
      commission: this.propertyLocationCommission.commission,
    };
    this.settingsService.createPropertyLocationCommission(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Successfully updated package price!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getPropertyLocationInfo();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to update package price", "error");
      }
    );
  }
}
