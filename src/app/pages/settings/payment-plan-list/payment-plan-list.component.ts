import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
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

  obj = {
    paymentPlan: null,
    description: null,
  };

  paymentSubPlanObj = {
    paymentSubPlan: null,
    duration: null,
    description: null,
  };

  paymentPlans$: Observable<any>;
  paymentPlan: any;
  paymentSubPlans$: Observable<any>;
  tabType = "payment-sub-plan";
  showDetail = false;
  constructor(
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private readonly settingsService: SettingsService
  ) {
    this.viewRecord = this.viewRecord.bind(this);
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
      paymentSubPlan: null,
      duration: null,
      description: null,
    };
  }

  onSubmit() {
    this.isLoading = true;
    const data = {
      name: this.obj.paymentPlan,
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
        Swal.fire("Process Failed!", "Failed to capture farmer", "error");
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
        Swal.fire("Process Failed!", "Failed to capture farmer", "error");
      }
    );
  }
}
