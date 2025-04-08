import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { SettingsService } from "../settings.service";

@Component({
  selector: "app-negotiation-status-list",
  templateUrl: "./negotiation-status-list.component.html",
  styleUrls: ["./negotiation-status-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class NegotiationStatusListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  data = [];

  isLoading = false;

  obj = {
    id: null,
    negotiationStatus: null,
  };

  @ViewChild("editItemModal")
  editItemModalRef: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private readonly _router: Router,
    private readonly settingsService: SettingsService
  ) {}

  showEditItemModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {
        centered: false,
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

  edit(data: any) {
    console.log("🚀 ~ NegotiationStatusListComponent ~ edit ~ data:", data);
    this.obj = data;
    this.obj.negotiationStatus = data.name;
    this.showEditItemModal(this.editItemModalRef);
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

    this.getAllNegotiationStatus();
  }

  getAllNegotiationStatus() {
    this.isLoading = true;
    this.settingsService.getAllNegotiationStatus({}).subscribe(
      (response: any) => {
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
      id: null,
      negotiationStatus: null,
    };
  }

  onSubmit() {
    this.isLoading = true;
    const data = {
      name: this.obj.negotiationStatus,
    };
    this.settingsService.createNegotiationStatus(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Negotiation status successfully created!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllNegotiationStatus();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          "Process Failed!",
          "Failed to create negotiation status",
          "error"
        );
      }
    );
  }

  onUpdate() {
    this.isLoading = true;
    const data = {
      id: this.obj.id,
      name: this.obj.negotiationStatus,
    };
    this.settingsService.updateNegotiationStatus(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Negotiation status successfully update!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllNegotiationStatus();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          "Process Failed!",
          "Failed to update negotiation status",
          "error"
        );
      }
    );
  }
}
