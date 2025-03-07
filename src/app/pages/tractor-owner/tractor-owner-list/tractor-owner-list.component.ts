import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TractorOwnerService } from "../tractor-owner.service";

@Component({
  selector: "app-tractor-owner-list",
  templateUrl: "./tractor-owner-list.component.html",
  styleUrls: ["./tractor-owner-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class TractorOwnerListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  ownerTypeList = [
    { id: 1, name: "Agency" },
    { id: 2, name: "Individual" },
  ];
  stateList = [{ id: 1, name: "Nasarawa" }];
  cityList = [{ id: 1, name: "Akwanga" }];
  data = [];

  isLoading = false;

  obj = {
    firstName: null,
    lastName: null,
    otherName: null,
    phone: null,
    email: null,
    address: null,
    ownerType: null,
    state: null,
    city: null,
  };

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

  @ViewChild("createdRecordModal")
  createdRecordModalRef: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private readonly _router: Router,
    private readonly tractorOwnerService: TractorOwnerService
  ) {
    this.viewRecord = this.viewRecord.bind(this);
  }

  viewRecord(evt: any) {
    const id = evt.row.data.id;
    this._router.navigate(["tractor-owner", id]);
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

  showCreateRecordModal(content: TemplateRef<any>) {
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

  onShowCreateRecordModal() {
    this.showCreateRecordModal(this.createdRecordModalRef);
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Tractor Owner" },
      { label: "Profile", active: true },
    ];

    this.getAllTractorOwners();
  }

  getAllTractorOwners() {
    this.isLoading = true;
    this.tractorOwnerService.getAllTractorOwners().subscribe(
      (response: any) => {
        this.data = response;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  resetForm() {
    this.obj = {
      firstName: null,
      lastName: null,
      otherName: null,
      phone: null,
      email: null,
      address: null,
      ownerType: null,
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
    this.tractorOwnerService.createTractorOwner(data).subscribe(
      (response: any) => {
        console.log("🚀 ~ StaffListComponent ~ onSubmit ~ response:", response);
        Swal.fire(
          "Process Successful!",
          "Tractor Owner successfully created!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllTractorOwners();
      },
      (error) => {
        Swal.fire("Process Failed!", "Failed to create tractor owner", "error");
      }
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
}
