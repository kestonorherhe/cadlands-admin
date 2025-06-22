import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Observable } from "rxjs";
import { ApplicationRequestService } from "../application-request.service";

@Component({
  selector: "app-pending-application-request-list",
  templateUrl: "./pending-application-request-list.component.html",
  styleUrls: ["./pending-application-request-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class PendingApplicationRequestListComponent implements OnInit {
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
  discountTypes = [{ name: "Percentage" }, { name: "Fixed_Amount" }];

  files: File[] = [];
  public Editor = ClassicEditor;

  isLoading = false;

  obj: any = {};
  applicationRequest: any = {};

  discountObj = {
    discountType: null,
    discountPercent: null,
    discountAmount: null,
  };

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

  showDiscountModal(content: TemplateRef<any>, data: any) {
    this.applicationRequest = data;
    this.modalService
      .open(content, {
        centered: true,
        size: "md",
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
      .getAllApplicationRequests({ status: "Pending" })
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
    this.discountObj = {
      discountType: null,
      discountPercent: null,
      discountAmount: null,
    };
  }

  // dropzone methods
  onSelect(event: any) {
    console.log(event);
    if (this.files.length > 1) {
      Swal.fire("", "You can add only one image", "warning");
    }
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  async onSubmit() {
    this.isLoading = true;

    const data = {
      id: this.obj.id,
      status: this.obj.applicationStatus,
    };
    this.applicationRequestService.processApplicationRequest(data).subscribe(
      (response: any) => {
        console.log(
          "🚀 ~ PendingApplicationRequestListComponent ~ onSubmit ~ response:",
          response
        );
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Application successfully processed!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllApplicationRequests();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to process application", "error");
      }
    );
  }

  onDiscountTypeChange() {
    this.discountObj.discountPercent = null;
    this.discountObj.discountAmount = null;
  }

  onDiscountPercentChange(event: any) {
    console.log(
      "🚀 ~ PendingApplicationRequestListComponent ~ event:",
      event.target.value,
      this.applicationRequest.originalAmount
    );

    const discountAmount =
      this.applicationRequest.originalAmount * (event.target.value / 100);
    console.log(
      "🚀 ~ PendingApplicationRequestListComponent ~ onDiscountPercentChange ~ discountAmount:",
      discountAmount
    );
    this.discountObj.discountAmount = discountAmount;
  }

  onApplyDiscount() {
    Swal.fire({
      icon: "warning",
      text: `Are you sure you want to apply a discount of ₦ ${this.discountObj.discountAmount} to this application?`,
      showDenyButton: true,
      allowOutsideClick: false,
      confirmButtonText: "Yes, cancel it!",
      confirmButtonColor: "#1B84FF",
      denyButtonText: `No, return`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.applyDiscountFn();
      }
    });
  }

  async applyDiscountFn() {
    this.isLoading = true;

    const data = {
      applicationId: this.applicationRequest.id,
      discountType: this.discountObj.discountType,
      discountPercent: this.discountObj.discountPercent,
      discountAmount: this.discountObj.discountAmount,
    };
    this.applicationRequestService.applyDiscount(data).subscribe(
      (response: any) => {
        console.log(
          "🚀 ~ PendingApplicationRequestListComponent ~ onSubmit ~ response:",
          response
        );
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Discount successfully applied!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllApplicationRequests();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to apply discount", "error");
      }
    );
  }
}
