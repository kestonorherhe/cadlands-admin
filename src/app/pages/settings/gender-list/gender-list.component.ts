import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { SettingsService } from "../settings.service";

@Component({
  selector: "app-gender-list",
  templateUrl: "./gender-list.component.html",
  styleUrls: ["./gender-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class GenderListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  data = [];

  isLoading = false;

  obj = {
    gender: null,
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

    this.getAllGender();
  }

  getAllGender() {
    this.isLoading = true;
    this.settingsService.getAllGender({}).subscribe(
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
      gender: null,
    };
  }

  onSubmit() {
    this.isLoading = true;
    this.settingsService.createGender(this.obj).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Gender successfully created!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllGender();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to create gender", "error");
      }
    );
  }
}
