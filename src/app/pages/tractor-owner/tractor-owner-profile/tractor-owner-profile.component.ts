import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdvancedService } from "../../tables/advancedtable/advanced.service";
import { DecimalPipe } from "@angular/common";
import { TractorOwnerService } from "../tractor-owner.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";

@Component({
  selector: "app-tractor-owner-profile",
  templateUrl: "./tractor-owner-profile.component.html",
  styleUrls: ["./tractor-owner-profile.component.scss"],
  providers: [AdvancedService, DecimalPipe],
})

/**
 * Contacts-profile component
 */
export class TractorOwnerProfileComponent implements OnInit {
  isLoading = false;
  // bread crumb items
  ownerTypeList = [
    { id: 1, name: "Agency" },
    { id: 2, name: "Individual" },
  ];
  specializationList = [
    { id: 1, name: "Ploughing" },
    { id: 2, name: "Harvesting" },
  ];
  stateList = [{ id: 1, name: "Nasarawa" }];
  cityList = [{ id: 1, name: "Akwanga" }];

  breadCrumbItems: Array<{}>;
  tractorOwnerId: string;
  tractorOwner: any;
  data = [];

  owner = {
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

  obj = {
    ownerId: null,
    specialization: null,
    model: null,
    yearOfManufacture: null,
  };

  @ViewChild("createTractorModal")
  createTractorModalRef: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private readonly route: ActivatedRoute,
    private readonly tractorOwnerService: TractorOwnerService
  ) {
    this.route.params.subscribe((params) => {
      this.tractorOwnerId = params["id"];
      this.getUser();
    });

    this.viewRecord = this.viewRecord.bind(this);
  }

  viewRecord(evt: any) {
    console.log("🚀 ~ FarmerListComponent ~ viewRecord ~ evt:", evt);
    const id = evt.row.data.id;
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
    this.showCreateRecordModal(this.createTractorModalRef);
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
      { label: "Staff" },
      { label: "Profile", active: true },
    ];
  }

  getUser() {
    this.tractorOwnerService
      .getRecords({ tractorOwnerId: this.tractorOwnerId })
      .subscribe(
        (response: any) => {
          console.log(
            "🚀 ~ FarmerProfileComponent ~ getUser ~ response:",
            response
          );
          this.tractorOwner = response;
        },
        (error) => {
          console.log("🚀 ~ FarmerProfileComponent ~ getUser ~ error:", error);
        }
      );
  }

  resetForm() {
    this.obj = {
      ownerId: null,
      specialization: null,
      model: null,
      yearOfManufacture: null,
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
      ownerId: +this.tractorOwnerId,
    };
    this.tractorOwnerService.createTractor(data).subscribe(
      (response: any) => {
        console.log("🚀 ~ StaffListComponent ~ onSubmit ~ response:", response);
        Swal.fire(
          "Process Successful!",
          "Tractor Owner successfully created!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getUser();
      },
      (error) => {
        Swal.fire("Process Failed!", "Failed to create tractor owner", "error");
      }
    );
  }
}
