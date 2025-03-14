import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Observable } from "rxjs";
import { ApplicationRequestService } from "../application-request.service";

@Component({
  selector: "app-paid-application-request-list",
  templateUrl: "./paid-application-request-list.component.html",
  styleUrls: ["./paid-application-request-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class PaidApplicationRequestListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  data: any;
  buildingStructures = [{ name: "Duplex" }];
  propertyTitles = [{ name: "C of O" }];
  optionList = [
    // { id: "Pending", name: "Pending" },
    { id: "Approved", name: "Approve" },
    { id: "Declined", name: "Decline" },
  ];

  estates$: Observable<any>;
  propertyTypes$: Observable<any>;
  propertySubTypeList = [];
  buildingStructures$: Observable<any>;
  negotiationStatus$: Observable<any>;
  facilities$: Observable<any>;
  propertyTitles$: Observable<any>;

  files: File[] = [];
  public Editor = ClassicEditor;

  isLoading = false;

  obj: any = {};

  @ViewChild("viewApplicationModal")
  viewApplicationModalRef: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private readonly _router: Router,
    private readonly applicationRequestService: ApplicationRequestService
  ) {}

  viewRecord(evt: any) {
    console.log("🚀 ~ FarmerListComponent ~ viewRecord ~ evt:", evt);
    this.obj = evt;
    this.showApplicationModal(this.viewApplicationModalRef);
  }

  showApplicationModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {
        centered: true,
        size: "xl",
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

  async createRecordModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: false,
      size: "lg",
    });
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Contacts" },
      { label: "Profile", active: true },
    ];

    // this.estates$ = this.applicationRequestService.getAllEstate({});
    // this.propertyTypes$ = this.settingsService.getAllPropertyTypes({});
    // this.negotiationStatus$ = this.settingsService.getAllNegotiationStatus({});
    // this.facilities$ = this.settingsService.getAllPropertyFacilities({});
    // this.propertyTitles$ = this.settingsService.getAllPro({});
    this.getAllApplicationRequests();
  }

  getAllApplicationRequests() {
    this.isLoading = true;
    this.applicationRequestService
      .getAllApplicationRequests({ status: "Paid" })
      .subscribe(
        (response: any) => {
          this.data = response.data;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }

  onSelectPropertyType(evt: any) {
    console.log(
      "🚀 ~ PropertyListComponent ~ onSelectPropertyType ~ evt:",
      evt
    );
    this.propertySubTypeList = evt.propertySubTypes;
  }

  resetForm() {
    this.obj = {
      estateId: null,
      propertyTypeId: null,
      propertySubTypeId: null,
      propertyName: null,
      buildingStructure: null,
      mapUrl: null,
      size: null,
      propertyPrice: null,
      negotiationStatusId: null,
      description: null,
      images: null,
      facilities: [],
      titles: [],
    };
  }

  confirmFullPaymentFn() {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to confirm payment for this application?",
      showDenyButton: true,
      allowOutsideClick: false,
      confirmButtonText: "Yes, confirm payment!",
      confirmButtonColor: "#1B84FF",
      denyButtonText: `No, return`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.confirmFullPayment();
      }
    });
  };

  async confirmFullPayment() {
    this.isLoading = true;

    const data = {
      id: this.obj.id,
      status: "Completed",
    };
    this.applicationRequestService.confirmFullPayment(data).subscribe(
      (response: any) => {
        console.log(
          "🚀 ~ PendingApplicationRequestListComponent ~ onSubmit ~ response:",
          response
        );
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Full payment confirmed successfully!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllApplicationRequests();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to confirm payment", "error");
      }
    );
  }
}
