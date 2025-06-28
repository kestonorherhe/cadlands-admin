import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { SalesCommissionService } from "../../sales-commission/sales-commission.service";

@Component({
  selector: "app-pending-withdrawal-request-list",
  templateUrl: "./pending-withdrawal-request-list.component.html",
  styleUrls: ["./pending-withdrawal-request-list.component.scss"],
})
export class PendingWithdrawalRequestListComponent implements OnInit {
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
      this.salesCommissionService.getAllBonusWithdrawalRequests({
        status: "Pending",
      });
  }

  approveRequest(item: any) {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to approve this withdrawal request and make payment?",
      showDenyButton: true,
      allowOutsideClick: false,
      confirmButtonText: "Yes, approve & pay!",
      confirmButtonColor: "#1B84FF",
      denyButtonText: `No, return`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.approveRequestFn(item?.id);
      }
    });
  }

  approveRequestFn(requestId: number) {
    this.isLoading = true;

    this.salesCommissionService.processBonusWithdrawal(requestId).subscribe(
      (response: any) => {
        Swal.fire({
          text: "Process successful!",
          icon: "success",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.isLoading = false;
            this.getAllWithdrawalRequest();
          }
        });
      },
      (error) => {
        Swal.fire({
          text: `${error}`,
          icon: "error",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.isLoading = false;
            // this.getRoomTypes();
          }
        });
      }
    );
  }
  cancelRequest(item: any) {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to cancel this withdrawal request?",
      showDenyButton: true,
      allowOutsideClick: false,
      confirmButtonText: "Yes, cancel!",
      confirmButtonColor: "#1B84FF",
      denyButtonText: `No, return`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.cancelRequestFn(item?.id);
      }
    });
  }

  cancelRequestFn(requestId: number) {
    this.isLoading = true;

    this.salesCommissionService.cancelBonusWithdrawal(requestId).subscribe(
      (response: any) => {
        Swal.fire({
          text: "Process successful!",
          icon: "success",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.isLoading = false;
            this.getAllWithdrawalRequest();
          }
        });
      },
      (error) => {
        Swal.fire({
          text: `${error}`,
          icon: "error",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.isLoading = false;
            // this.getRoomTypes();
          }
        });
      }
    );
  }
}
