import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { SettingsService } from "../settings.service";

@Component({
  selector: "app-property-facility-list",
  templateUrl: "./property-facility-list.component.html",
  styleUrls: ["./property-facility-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class PropertyFacilityListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  data = [];

  isLoading = false;

  obj = {
    facilityName: null,
  };

  constructor(
    private modalService: NgbModal,
    private readonly _router: Router,
    private readonly settingsService: SettingsService
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

  async createRecordModal(content: any) {
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

    this.getAllPropertyFacility();
  }

  getAllPropertyFacility() {
    this.isLoading = true;
    this.settingsService.getAllPropertyFacilities({}).subscribe(
      (response: any) => {
        console.log(
          "🚀 ~ PropertyFacilityListComponent ~ getAllPropertyFacility ~ response:",
          response
        );
        this.data = response.data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  resetForm() {
    this.obj = {
      facilityName: null,
    };
  }

  onSubmit() {
    this.isLoading = true;
    const data = {
      name: this.obj.facilityName,
      icon: null
    };
    this.settingsService.createPropertyFacility(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Property facility successfully created!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllPropertyFacility();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to capture farmer", "error");
      }
    );
  }
}
