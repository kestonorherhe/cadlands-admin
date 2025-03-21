import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AffiliateService } from "../../affiliate/affiliate.service";

@Component({
  selector: "app-cancelled-subscription-request-list",
  templateUrl: "./cancelled-subscription-request-list.component.html",
  styleUrls: ["./cancelled-subscription-request-list.component.scss"],
})
export class CancelledSubscriptionRequestListComponent implements OnInit {
  subscriptionRequests$: Observable<any>;
  isLoading = false;

  constructor(private readonly affiliateService: AffiliateService) {}

  ngOnInit(): void {
    this.getAllWithdrawalRequest();
  }

  getAllWithdrawalRequest() {
    this.subscriptionRequests$ =
      this.affiliateService.getAllSubscriptionRequests({
        approvalStatus: "Cancelled",
      });
  }
}
