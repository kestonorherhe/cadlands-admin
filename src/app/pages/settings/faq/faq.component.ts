import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { SettingsService } from "../settings.service";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { PropertyService } from "../../property/property.service";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.scss"],
})

/**
 * Contacts-profile component
 */
export class FaqComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  data = [];
  estates = [];
  statusOptions = [
    { id: true, name: "Make active" },
    { id: false, name: "Make inactive" },
  ];

  isLoading = false;

  public Editor = ClassicEditor;
  obj = {
    id: null,
    estateId: null,
    title: null,
    text: null,
    status: null,
  };

  @ViewChild("editItemModal")
  editItemModalRef: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private readonly _router: Router,
    private readonly propertyService: PropertyService,
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
      })
      .catch((res) => {});
  }

  edit(data: any) {
    this.obj = data;
    this.obj.estateId = data.estate.id;
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

    this.propertyService.getAllEstate({}).subscribe(
      (response: any) => {
        this.estates = response.data?.estates;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );

    this.getAllFaqs();
  }

  getAllFaqs() {
    this.isLoading = true;
    this.settingsService.getAllFaqs({}).subscribe(
      (response: any) => {
        this.data = response.data.faqs;
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
      estateId: null,
      title: null,
      text: null,
      status: null,
    };
  }

  onSubmit() {
    this.isLoading = true;
    const data = {
      estateId: this.obj.estateId,
      title: this.obj.title,
      text: this.obj.text,
    };
    this.settingsService.createFaq(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Successfully created FAQ!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllFaqs();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to create faq", "error");
      }
    );
  }

  onUpdate() {
    this.isLoading = true;
    const data = {
      id: this.obj.id,
      // estateId: this.obj.estateId,
      title: this.obj.title,
      text: this.obj.text,
      status: this.obj.status,
    };
    this.settingsService.updateFaq(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Successfully updated FAQ!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllFaqs();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to update faq", "error");
      }
    );
  }
}
