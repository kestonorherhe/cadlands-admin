import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { AffiliateService } from "../../affiliate/affiliate.service";

@Component({
  selector: "app-pending-subscription-request-list",
  templateUrl: "./pending-subscription-request-list.component.html",
  styleUrls: ["./pending-subscription-request-list.component.scss"],
})
export class PendingSubscriptionRequestListComponent implements OnInit {
  subscriptionRequests$: Observable<any>;
  isLoading = false;

  constructor(
    private readonly affiliateService: AffiliateService
  ) {}

  ngOnInit(): void {
    this.getAllSubscriptionRequests();
  }

  getAllSubscriptionRequests() {
    this.subscriptionRequests$ =
      this.affiliateService.getAllSubscriptionRequests({
        approvalStatus: "Pending",
      });
  }

  approveRequest(item: any) {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to confirm payment and approve this subscription request?",
      showDenyButton: true,
      allowOutsideClick: false,
      confirmButtonText: "Yes, confirm & approve!",
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

    this.affiliateService.confirmPayment(requestId).subscribe(
      (response: any) => {
        Swal.fire({
          text: "Subscription request was approved successfully!",
          icon: "success",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.isLoading = false;
            this.getAllSubscriptionRequests();
          }
        });
      },
      (error) => {
        Swal.fire({
          text: `Failed to create feature! ${
            error.error.statusCode === 401
              ? "User not authorized!"
              : error.error.message
          }`,
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
    console.log(
      "🚀 ~ PendingWithdrawalRequestListComponent ~ approveRequest ~ item:",
      item
    );
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

    this.affiliateService.cancelRequest(requestId).subscribe(
      (response: any) => {
        Swal.fire({
          text: "Feature was created successfully!",
          icon: "success",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.isLoading = false;
            this.getAllSubscriptionRequests();
          }
        });
      },
      (error) => {
        Swal.fire({
          text: `Failed to create feature! ${
            error.error.statusCode === 401
              ? "User not authorized!"
              : error.error.message
          }`,
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
