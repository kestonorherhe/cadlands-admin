import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AffiliateService } from '../../affiliate/affiliate.service';

@Component({
  selector: "app-paid-subscription-request-list",
  templateUrl: "./paid-subscription-request-list.component.html",
  styleUrls: ["./paid-subscription-request-list.component.scss"],
})
export class PaidsubScriptionRequestListComponent implements OnInit {
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
