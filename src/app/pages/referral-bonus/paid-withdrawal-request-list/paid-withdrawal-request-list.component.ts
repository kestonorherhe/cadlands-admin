import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { SalesCommissionService } from "../../sales-commission/sales-commission.service";

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
      this.salesCommissionService.getAllBonusWithdrawalRequests({
        status: "Approved",
      });
  }
}
