import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { StaffService } from "../staff.service";

@Component({
  selector: "app-staff-list",
  templateUrl: "./staff-list.component.html",
  styleUrls: ["./staff-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class StaffListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  stateList = [{ id: 1, name: "Nasarawa" }];
  cityList = [{ id: 1, name: "Akwanga" }];
  data = [];

  isLoading = false;

  obj = {
    firstName: null,
    lastName: null,
    phone: null,
    email: null,
    address: null,
    privilegeId: null,
    // state: null,
    // city: null,
    role: "admin",
    password: null,
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
    private readonly staffService: StaffService
  ) {
    this.viewRecord = this.viewRecord.bind(this);
  }

  viewRecord(evt: any) {
    const id = evt.row.data.id;
    this._router.navigate(["staff", id]);
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
      { label: "Contacts" },
      { label: "Profile", active: true },
    ];

    this.getAllAdmins();
  }

  getAllAdmins() {
    this.isLoading = true;
    this.staffService.getAllAdmins({ role: "admin" }).subscribe(
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
      // otherName: null,
      phone: null,
      email: null,
      address: null,
      privilegeId: null,
      // state: null,
      // city: null,
      role: null,
      password: null,
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
      // state: this.obj.state.toString(),
      // city: this.obj.city.toString(),
    };
    this.staffService.createRecord(data).subscribe(
      (response: any) => {
        console.log("🚀 ~ StaffListComponent ~ onSubmit ~ response:", response);
        Swal.fire(
          "Process Successful!",
          "Admin successfully created!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllAdmins();
      },
      (error) => {
        Swal.fire("Process Failed!", "Failed to capture farmer", "error");
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
