import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { SalesCommissionService } from '../sales-commission.service';

@Component({
  selector: "app-paid-sales-commission-list",
  templateUrl: "./paid-sales-commission-list.component.html",
  styleUrls: ["./paid-sales-commission-list.component.scss"],
})
export class PaidSalesCommissionListComponent implements OnInit {
  data = [];
  obj = { id: 0, feature: null, description: null };
  salesCommissions$: Observable<any>;
  isLoading = false;

  @ViewChild("editItemModal")
  editItemModalRef: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private readonly salesCommissionService: SalesCommissionService
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
    console.log("we are editing ::", data);
    this.obj = data;
    this.obj.feature = data.name;
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

  ngOnInit(): void {
    this.getFeatures();
  }

  getFeatures() {
    this.salesCommissions$ = this.salesCommissionService.getSalesCommissions({
      status: "PENDING",
    });
  }

  createRecordModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  resetForm() {
    this.obj = {
      id: 0,
      feature: null,
      description: null,
    };
  }

  onSubmit() {
    this.isLoading = true;

    const createRoomTypeDto: any = {
      name: this.obj.feature,
      description: this.obj.description,
    };

    // this.salesCommissionService.createFeature(createRoomTypeDto).subscribe(
    //   (response: any) => {
    //     Swal.fire({
    //       text: "Feature was created successfully!",
    //       icon: "success",
    //       confirmButtonText: "Ok, got it!",
    //       confirmButtonColor: "#1B84FF",
    //     }).then((res) => {
    //       if (res.isConfirmed) {
    //         this.modalService.dismissAll();
    //         this.resetForm();
    //         this.isLoading = false;
    //         this.getFeatures();
    //       }
    //     });
    //   },
    //   (error) => {
    //     Swal.fire({
    //       text: `Failed to create feature! ${
    //         error.error.statusCode === 401
    //           ? "User not authorized!"
    //           : error.error.message
    //       }`,
    //       icon: "error",
    //       confirmButtonText: "Ok, got it!",
    //       confirmButtonColor: "#1B84FF",
    //     }).then((res) => {
    //       if (res.isConfirmed) {
    //         this.isLoading = false;
    //         // this.getRoomTypes();
    //       }
    //     });
    //   }
    // );
  }

  onUpdate() {
    this.isLoading = true;

    const updateRoomTypeDto: any = {
      id: this.obj.id,
      name: this.obj.feature,
      description: this.obj.description,
    };

    // this.salesCommissionService.updateFeature(updateRoomTypeDto).subscribe(
    //   (response: any) => {
    //     Swal.fire({
    //       text: "Feature was updated successfully!",
    //       icon: "success",
    //       confirmButtonText: "Ok, got it!",
    //       confirmButtonColor: "#1B84FF",
    //     }).then((res) => {
    //       if (res.isConfirmed) {
    //         this.modalService.dismissAll();
    //         this.resetForm();
    //         this.isLoading = false;
    //         this.getFeatures();
    //       }
    //     });
    //   },
    //   (error) => {
    //     Swal.fire({
    //       text: `Failed to update feature! ${
    //         error.error.statusCode === 401
    //           ? "User not authorized!"
    //           : error.error.message
    //       }`,
    //       icon: "error",
    //       confirmButtonText: "Ok, got it!",
    //       confirmButtonColor: "#1B84FF",
    //     }).then((res) => {
    //       if (res.isConfirmed) {
    //         this.isLoading = false;
    //         // this.getRoomTypes();
    //       }
    //     });
    //   }
    // );
  }
}
