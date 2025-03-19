import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { SalesCommissionService } from '../sales-commission.service';

@Component({
  selector: "app-paid-withdrawal-request-list",
  templateUrl: "./paid-withdrawal-request-list.component.html",
  styleUrls: ["./paid-withdrawal-request-list.component.scss"],
})
export class PaidWithdrawalRequestListComponent implements OnInit {
  withdrawalRequests$: Observable<any>;
  isLoading = false;

  constructor(
    private readonly salesCommissionService: SalesCommissionService
  ) {}

  ngOnInit(): void {
    this.getAllWithdrawalRequest();
  }

  getAllWithdrawalRequest() {
    this.withdrawalRequests$ =
      this.salesCommissionService.getWithdrawalRequests({
        status: "PAID",
      });
  }

  edit(data: any) {
    console.log("we are editing ::", data);
  }

  onSubmit() {
    this.isLoading = true;

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
}
