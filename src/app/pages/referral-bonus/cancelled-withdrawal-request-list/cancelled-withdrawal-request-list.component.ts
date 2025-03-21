import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { SalesCommissionService } from "../../sales-commission/sales-commission.service";

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
      this.salesCommissionService.getAllBonusWithdrawalRequests({
        status: "Cancelled",
      });
  }
}
