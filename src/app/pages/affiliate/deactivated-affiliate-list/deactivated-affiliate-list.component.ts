import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AffiliateService } from "../affiliate.service";

@Component({
  selector: "app-deactivated-affiliate-list",
  templateUrl: "./deactivated-affiliate-list.component.html",
  styleUrls: ["./deactivated-affiliate-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class DeactivatedAffiliateListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  data = [];
  actionList = [
    { id: "verified", name: "Approve" },
    { id: "rejected", name: "Reject" },
  ];
  // cityList = [{ id: 1, name: "Akwanga" }];
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
    id: null,
    firstName: null,
    lastName: null,
    otherName: null,
    phone: null,
    email: null,
    address: null,
    state: null,
    city: null,
    statusOption: null,
    status: null,
  };

  @ViewChild("processAffiliateApplicationModal")
  processAffiliateApplicationModalRef: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private readonly _router: Router,
    private readonly affiliateService: AffiliateService
  ) {
    // this.viewRecord = this.viewRecord.bind(this);
  }

  processApplicationFn(evt: any) {
    console.log("🚀 ~ FarmerListComponent ~ viewRecord ~ evt:", evt);
    // const id = evt.row.data.id;
    // this._router.navigate(["farmers", id]);
    this.obj = evt;
    this.showProcessAffiliateApplicationModal(
      this.processAffiliateApplicationModalRef
    );
  }

  showProcessAffiliateApplicationModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {
        centered: true,
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
    this.affiliateService
      .getRecords({ role: "affiliate", status: "pending" })
      .subscribe(
        (response: any) => {
          console.log(
            "🚀 ~ CustomerListComponent ~ ngOnInit ~ response:",
            response
          );
          this.data = response;
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
      id: null,
      firstName: null,
      lastName: null,
      otherName: null,
      phone: null,
      email: null,
      address: null,
      state: null,
      city: null,
      statusOption: null,
      status: null,
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
      id: this.obj.id,
      firstName: this.obj.firstName,
      lastName: this.obj.lastName,
      // otherName: this.obj.firstName,
      phone: this.obj.phone,
      email: this.obj.email,
      address: this.obj.address,
      status: this.obj.statusOption,
    };
    console.log("🚀 ~ FarmerListComponent ~ onSubmit ~ data:", data);

    this.affiliateService.processApplication(data).subscribe(
      (response: any) => {
        Swal.fire("", "Successfully processed application", "success");
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllAffiliates();
      },
      (error) => {
        Swal.fire("", "Failed to process application", "error");
      }
    );
  }
}
