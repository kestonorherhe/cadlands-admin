import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { PropertyService } from "../../property/property.service";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: "app-other-listing",
  templateUrl: "./other-listing.component.html",
  styleUrls: ["./other-listing.component.scss"],
})
export class OtherListingComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  data: any;

  isLoading = false;

  obj = {
    estateName: null,
    imageUrl: null,
    description: null,
    otherListing: true,
  };

  files: File[] = [];
  public Editor = ClassicEditor;

  constructor(
    private modalService: NgbModal,
    private readonly _router: Router,
    private readonly propertyService: PropertyService
  ) {}

  viewRecord(evt: any) {
    const id = evt.id;
    this._router.navigate(["estate/other-listing", id]);
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
    this.propertyService.getAllOtherEstateListings({}).subscribe(
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
      otherListing: true,
    };
  }

  // processImage(evt: any) {
  //   this.obj.imageUrl = evt.target.files[0];
  // }

  // dropzone methods
  onSelect(event: any) {
    // Clear existing files before adding new ones
    this.files = [];

    // Validate file type (optional, but recommended)
    const file = event.addedFiles[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
      Swal.fire("", "Please upload a valid image file", "warning");
      return;
    }

    this.files.push(file);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  async onSubmit() {
    this.isLoading = true;

    let formData: FormData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formData.append("file", this.files[i]);
    }

    const imageUrl = await this.propertyService.uploadImage(formData);
    const data = {
      name: this.obj.estateName,
      imageUrl: imageUrl,
      description: this.obj.description,
      otherListing: this.obj.otherListing,
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
        Swal.fire("Process Failed!", "Failed to create estate", "error");
      }
    );
  }
}
