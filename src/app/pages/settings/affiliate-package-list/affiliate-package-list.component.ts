import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { SettingsService } from "../settings.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-affiliate-package-list",
  templateUrl: "./affiliate-package-list.component.html",
  styleUrls: ["./affiliate-package-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class AffiliatePackageListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  data = [];
  statusList = [
    { id: true, name: "Yes, make default" },
    { id: false, name: "No, not default" },
  ];
  isLoading = false;

  obj = {
    id: null,
    packageName: null,
    description: null,
    default: false,
  };

  packagePrice = {
    amount: null,
  };

  directSaleCommission = {
    commission: null,
  };

  indirectSaleCommission = {
    commission: null,
  };

  affiliatePackages$: Observable<any>;
  affiliatePackage: any;
  packagePrices$: Observable<any>;
  directSaleCommissions$: Observable<any>;
  indirectSaleCommissions$: Observable<any>;
  tabType = "price-history";
  showDetail = false;
  constructor(
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private readonly settingsService: SettingsService
  ) {}

  viewRecord(data: any) {
    console.log("we are editing ::", data);
    this.showDetail = true;
    this.affiliatePackage = data;
    this.getAffiliatePackages();
    this.packagePrices$ = this.settingsService.prices$;
    this.cdr.detectChanges();
  }

  getAffiliatePackages() {
    this.settingsService
      .getAllAffiliatePackages({
        affiliatePackageId: this.affiliatePackage.id,
      })
      .subscribe(
        (response: any) => {
          console.log(
            "🚀 ~ MealTypeComponent ~ viewRecord ~ response:",
            response
          );
          this.settingsService.setPackagePrices(response?.data?.prices);
          this.settingsService.setDirectSaleCommissions(
            response?.data?.directCommissions
          );
          this.settingsService.setIndirectSaleCommissions(
            response?.data?.indirectCommissions
          );
          this.packagePrices$ = this.settingsService.prices$;
          this.directSaleCommissions$ =
            this.settingsService.directSaleCommissions$;
          this.indirectSaleCommissions$ =
            this.settingsService.indirectSaleCommissions$;
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
    if (tabItem === "direct-sale-commission")
      this.directSaleCommissions$ = this.settingsService.directSaleCommissions$;
    this.cdr.detectChanges();
    this.tabType = tabItem;
  }

  closeDetail() {
    this.showDetail = false;
    this.affiliatePackage = null;
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
    this.obj = this.affiliatePackage;
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  async showCreatePakagePriceModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  async showCreateDirectSaleCommissionModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  async showCreateIndirectSaleCommissionModal(content: any) {
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

    this.getAllAffiliatePackages();
  }

  getAllAffiliatePackages() {
    this.affiliatePackages$ = this.settingsService.getAllAffiliatePackages({});
  }

  resetForm() {
    this.obj = {
      id: null,
      packageName: null,
      description: null,
      default: false,
    };
    this.packagePrice = {
      amount: null,
    };
    this.directSaleCommission = {
      commission: null,
    };
    this.indirectSaleCommission = {
      commission: null,
    };
  }

  onSubmit() {
    this.isLoading = true;
    this.settingsService.createAffiliatePackage(this.obj).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Successfully created affiliate package!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllAffiliatePackages();
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
      packageName: this.obj.packageName,
      description: this.obj.description,
      default: this.obj.default,
    };
    this.settingsService.updateAffiliatePackage(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Successfully updated affiliate package!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllAffiliatePackages();
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
      affiliatePackageId: this.affiliatePackage.id,
      amount: this.packagePrice.amount,
    };
    this.settingsService.createPackagePrice(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Successfully updated package price!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAffiliatePackages();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to update package price", "error");
      }
    );
  }

  onSubmitDirectSaleCommission() {
    this.isLoading = true;
    const data = {
      affiliatePackageId: this.affiliatePackage.id,
      commission: this.directSaleCommission.commission,
    };
    this.settingsService.createDirectSaleCommission(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Successfully updated direct sale commission!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAffiliatePackages();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          "Process Failed!",
          "Failed to update direct sale commission",
          "error"
        );
      }
    );
  }

  onSubmitIndirectSaleCommission() {
    this.isLoading = true;
    const data = {
      affiliatePackageId: this.affiliatePackage.id,
      commission: this.indirectSaleCommission.commission,
    };
    this.settingsService.createIndirectSaleCommission(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Successfully updated indirect sale commission!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAffiliatePackages();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          "Process Failed!",
          "Failed to update indirect sale commission",
          "error"
        );
      }
    );
  }
}
