import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { QueryService } from "src/app/core/services/query.service";
import Swal from "sweetalert2";
import { FarmerService } from "../farmer.service";

@Component({
  selector: "app-farmer-list",
  templateUrl: "./farmer-list.component.html",
  styleUrls: ["./farmer-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class FarmerListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  data = [];
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
    private readonly farmerService: FarmerService
  ) {
    this.viewRecord = this.viewRecord.bind(this);
  }

  viewRecord(evt: any) {
    console.log("🚀 ~ FarmerListComponent ~ viewRecord ~ evt:", evt);
    const id = evt.row.data.id;
    this._router.navigate(['farmers', id]);
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

    this.getAllFarmers();
  }

  getAllFarmers() {
    this.farmerService.getRecords({}).subscribe(
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
    console.log("🚀 ~ FarmerListComponent ~ onSubmit ~ data:", data);

    this.farmerService.createRecord(data).subscribe(
      (response: any) => {
        Swal.fire("Process Successful!", "Farmer Captured", "success");
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllFarmers();
      },
      (error) => {
        Swal.fire("Process Failed!", "Failed to capture farmer", "error");
      }
    );
  }
}
