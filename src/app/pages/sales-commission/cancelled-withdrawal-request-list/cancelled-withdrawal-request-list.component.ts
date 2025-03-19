import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { SalesCommissionService } from "../sales-commission.service";

@Component({
  selector: "app-cancelled-withdrawal-request-list",
  templateUrl: "./cancelled-withdrawal-request-list.component.html",
  styleUrls: ["./cancelled-withdrawal-request-list.component.scss"],
})
export class CancelledWithdrawalRequestListComponent implements OnInit {
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
        status: "CANCELLED",
      });
  }
}
