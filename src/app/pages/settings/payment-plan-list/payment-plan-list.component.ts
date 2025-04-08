import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { SettingsService } from "../settings.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-payment-plan-list",
  templateUrl: "./payment-plan-list.component.html",
  styleUrls: ["./payment-plan-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class PaymentPlanListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  data = [];

  isLoading = false;
  showPaymentPlanDetail = true;

  obj = {
    paymentPlan: null,
    description: null,
  };

  paymentSubPlanObj = {
    id: null,
    paymentSubPlan: null,
    duration: null,
    description: null,
  };

  paymentSubPlanCommission = {
    paymentSubPlanId: null,
    commission: null,
  };

  paymentPlans$: Observable<any>;
  paymentPlan: any;
  paymentSubPlans$: Observable<any>;
  tabType = "payment-sub-plan";

  paymentSubPlan: any;
  paymentSubPlanCommissions$: Observable<any>;
  tabType2 = "commissions";

  showDetail = false;

  @ViewChild("editPaymentSubPlanModal")
  editPaymentSubPlanModalRef: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private readonly settingsService: SettingsService
  ) {}

  showEditItemModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {
        centered: false,
        size: "lg",
        animation: true,
        backdrop: "static",
        keyboard: false,
      })
      .result.then((result) => {
        console.log("Modal closed" + result);
      })
      .catch((res) => {});
  }

  edit(data: any) {
    console.log("🚀 ~ PaymentPlanListComponent ~ edit ~ data:", data);
    this.paymentSubPlanObj = data;
    this.paymentSubPlanObj.paymentSubPlan = data.name;
    this.showEditItemModal(this.editPaymentSubPlanModalRef);
  }

  viewRecord(data: any) {
    console.log("we are editing ::", data);
    this.showDetail = true;
    this.paymentPlan = data;
    this.getAllPaymentPlan();
    this.paymentSubPlans$ = this.settingsService.paymentSubPlans$;
    this.cdr.detectChanges();
  }

  getAllPaymentPlan() {
    this.settingsService
      .getAllPaymentPlans({ paymentPlanId: this.paymentPlan.id })
      .subscribe(
        (response: any) => {
          console.log(
            "🚀 ~ PaymentPlanListComponent ~ getAllPaymentPlans ~ response:",
            response
          );
          this.settingsService.setPaymentSubPlans(
            response?.data?.paymentSubPlans
          );
          this.paymentSubPlans$ = this.settingsService.paymentSubPlans$;
          this.cdr.detectChanges();
        },
        (error) => {
          console.log("🚀 ~ MealTypeComponent ~ viewRecord ~ error:", error);
        }
      );
  }

  viewPaymentSubTypeRecord(data: any) {
    console.log("we are editing ::", data);
    this.paymentSubPlan = data;
    this.getPaymentSubTypeInfo();
    this.paymentSubPlanCommissions$ =
      this.settingsService.paymentSubPlanCommissions$;
    this.showPaymentPlanDetail = false;
    this.cdr.detectChanges();
  }

  getPaymentSubTypeInfo() {
    this.settingsService
      .getAllPaymentSubPlans({ paymentSubPlanId: this.paymentSubPlan.id })
      .subscribe(
        (response: any) => {
          console.log(
            "🚀 ~ PaymentPlanListComponent ~ getAllPaymentPlans ~ response:",
            response
          );
          this.settingsService.setPaymentSubPlanCommissions(
            response?.data?.commissions
          );
          this.paymentSubPlanCommissions$ =
            this.settingsService.paymentSubPlanCommissions$;
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
    if (tabItem === "payment-sub-plan")
      this.paymentSubPlans$ = this.settingsService.paymentSubPlans$;
    this.cdr.detectChanges();
    this.tabType = tabItem;
  }

  closeDetail() {
    this.showDetail = false;
    this.paymentPlan = null;
    this.cdr.detectChanges();
  }

  goBck() {
    this.showPaymentPlanDetail = true;
    this.cdr.detectChanges();
  }

  async createRecordModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  async showCreatePaymentSubPlanModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  async showCreatePaymentSubPlanCommissionModal(content: any) {
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

    this.getAllPaymentPlans();
  }

  getAllPaymentPlans() {
    this.paymentPlans$ = this.settingsService.getAllPaymentPlans({});
  }

  resetForm() {
    this.obj = {
      paymentPlan: null,
      description: null,
    };
    this.paymentSubPlanObj = {
      id: null,
      paymentSubPlan: null,
      duration: null,
      description: null,
    };
    this.paymentSubPlanCommission = {
      paymentSubPlanId: null,
      commission: null,
    };
  }

  onSubmit() {
    this.isLoading = true;
    const data = {
      name: this.obj.paymentPlan,
      description: this.obj.description,
    };
    this.settingsService.createPaymentPlan(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Property type successfully created!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllPaymentPlans();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to create property type", "error");
      }
    );
  }

  onSubmitPaymentSubPlan() {
    this.isLoading = true;
    const data = {
      paymentPlanId: this.paymentPlan.id,
      name: this.paymentSubPlanObj.paymentSubPlan,
      duration: this.paymentSubPlanObj.duration,
      description: this.paymentSubPlanObj.description,
    };
    this.settingsService.createPaymentSubPlan(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Property sub-type successfully created!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllPaymentPlan();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          "Process Failed!",
          "Failed to create property sub-type",
          "error"
        );
      }
    );
  }

  onUpdatePaymentSubPlan() {
    this.isLoading = true;
    const data = {
      id: this.paymentSubPlanObj.id,
      // paymentPlanId: this.paymentPlan.id,
      name: this.paymentSubPlanObj.paymentSubPlan,
      duration: this.paymentSubPlanObj.duration,
      description: this.paymentSubPlanObj.description,
    };
    this.settingsService.updatePaymentSubPlan(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Property sub-type successfully updated!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllPaymentPlan();
        this.paymentSubPlan = response.data.data;
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          "Process Failed!",
          "Failed to update property sub-type",
          "error"
        );
      }
    );
  }

  onSubmitPaymentSubPlanCommission() {
    this.isLoading = true;
    const data = {
      paymentSubPlanId: this.paymentSubPlan.id,
      commission: this.paymentSubPlanCommission.commission,
    };
    this.settingsService.createPaymentSubPlanCommission(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          // "Process Successful!",
          "Successfully updated payment commission!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllPaymentPlan();
        this.getPaymentSubTypeInfo();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          // "Process Failed!",
          `${error}`,
          "error"
        );
      }
    );
  }
}
