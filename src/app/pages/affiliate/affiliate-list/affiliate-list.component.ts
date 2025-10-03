import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AffiliateService } from "../affiliate.service";

@Component({
  selector: "app-affiliate-list",
  templateUrl: "./affiliate-list.component.html",
  styleUrls: ["./affiliate-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class AffiliateListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  data = [];
  affiliateEarnings = [];
  stateList = [{ id: 1, name: "Nasarawa" }];
  cityList = [{ id: 1, name: "Akwanga" }];
  isLoading = false;

  // filter parameters
  filter = {
    startDate: "",
    endDate: "",
    customerName: "",
    paymentReference: "",
    pageNumber: 0,
    type: "",
  };
  pageable: any = {};

  obj = {
    firstName: null,
    lastName: null,
    otherName: null,
    phone: null,
    email: null,
    address: null,
    state: null,
    city: null,
  };

  @ViewChild("createdRecordModal")
  createdRecordModalRef: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private readonly _router: Router,
    private readonly affiliateService: AffiliateService
  ) {}

  viewRecord(evt: any) {
    const id = evt.id;
    this._router.navigate(["affiliate", id]);
  }

  showCreateRecordModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {
        centered: true,
        size: "lg",
        animation: true,
        backdrop: "static",
        keyboard: false,
      })
      .result.then((result) => {})
      .catch((res) => {});
  }

  onShowCreateRecordModal() {
    this.showCreateRecordModal(this.createdRecordModalRef);
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

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Contacts" },
      { label: "Profile", active: true },
    ];

    this.getAllAffiliates();
  }

  getAllAffiliates() {
    this.affiliateService.getRecords({ role: "affiliate" }).subscribe(
      (response: any) => {
        this.data = response;
      },
      (error) => {}
    );
    this.affiliateService.getAffiliateEarningsReport().subscribe(
      (response: any) => {
        this.affiliateEarnings = response;
      },
      (error) => {}
    );
  }

  gotoPage(nextPageNumber: number): void {
    this.filter.pageNumber = nextPageNumber;
    // this.getTransactions();
  }

  searchRecord() {
    // this.getTransactionsByDateRange();
  }

  resetFilter() {
    this.filter.pageNumber = 0;
    // this.getTransactions();
  }
  resetForm() {
    this.obj = {
      firstName: null,
      lastName: null,
      otherName: null,
      phone: null,
      email: null,
      address: null,
      state: null,
      city: null,
    };
  }

  onSubmit() {
    Swal.fire({
      title: "Capturing record...",
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(Swal.getDenyButton());
      },
    });

    const data = {
      ...this.obj,
      state: this.obj.state.toString(),
      city: this.obj.city.toString(),
    };
  }

  resendEmail(user: any) {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to resend onboarding email?",
      showDenyButton: true,
      allowOutsideClick: false,
      confirmButtonText: "Yes, resend email!",
      confirmButtonColor: "#1B84FF",
      denyButtonText: `No, return`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.resendEmailFn(user);
        this.modalService.dismissAll();
      }
    });
  }

  resendEmailFn(user: any) {
    this.affiliateService.resendEmail(user.email).subscribe(
      (response: any) => {
        Swal.fire({
          text: "Onboarding email sent successfully!",
          icon: "success",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.modalService.dismissAll();
            this.resetForm();
            this.isLoading = false;
            this.getAllAffiliates();
          }
        });
      },
      (error: any) => {
        Swal.fire({
          text: `Failed to send onboarding email! ${
            error.error.statusCode === 401
              ? "User not authorized!"
              : error.error.message
          }`,
          icon: "error",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.isLoading = false;
            // this.getRoomTypes();
          }
        });
      }
    );
  }
}
