import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AffiliateService } from '../../affiliate/affiliate.service';

@Component({
  selector: "app-all-subscription-list",
  templateUrl: "./all-subscription-list.component.html",
  styleUrls: ["./all-subscription-list.component.scss"],
})
export class AllsubScriptionListComponent implements OnInit {
  subscriptions$: Observable<any>;
  isLoading = false;

  constructor(private readonly affiliateService: AffiliateService) {}

  ngOnInit(): void {
    this.getAllWithdrawalRequest();
  }

  getAllWithdrawalRequest() {
    this.subscriptions$ = this.affiliateService.getAllSubscriptions({
      // approvalStatus: "Cancelled",
    });
  }
}
