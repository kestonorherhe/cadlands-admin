import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { PropertyService } from "../../property/property.service";

@Component({
  selector: "app-estate-list",
  templateUrl: "./estate-list.component.html",
  styleUrls: ["./estate-list.component.scss"],
})

/**
 * Contacts-profile component
 */
export class EstateListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  data: any;

  isLoading = false;

  obj = {
    estateName: null,
    imageUrl: null,
    description: null,
  };

  constructor(
    private modalService: NgbModal,
    private readonly _router: Router,
    private readonly propertyService: PropertyService
  ) {
    this.viewRecord = this.viewRecord.bind(this);
  }

  viewRecord(evt: any) {
    console.log("🚀 ~ EstateListComponent ~ viewRecord ~ evt:", evt)
    const id = evt.id;
    this._router.navigate(["estate", id]);
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

    this.getAllEstate();
  }

  getAllEstate() {
    this.isLoading = true;
    this.propertyService.getAllEstate({}).subscribe(
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
      estateName: null,
      imageUrl: null,
      description: null,
    };
  }

  processImage(evt: any) {
    this.obj.imageUrl = evt.target.files[0];
  }

  async onSubmit() {
    this.isLoading = true;
    const data = {
      name: this.obj.estateName,
      imageUrl: await this.propertyService.uploadImage(this.obj.imageUrl),
      description: this.obj.description,
    };
    this.propertyService.createEstate(data).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire(
          "Process Successful!",
          "Estate successfully created!",
          "success"
        );
        this.modalService.dismissAll();
        this.resetForm();
        this.getAllEstate();
      },
      (error) => {
        this.isLoading = false;
        Swal.fire("Process Failed!", "Failed to capture farmer", "error");
      }
    );
  }
}
