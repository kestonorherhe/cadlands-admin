import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesCommissionService } from '../../sales-commission/sales-commission.service';

@Component({
  selector: "app-pending-referral-bonus-list",
  templateUrl: "./pending-referral-bonus-list.component.html",
  styleUrls: ["./pending-referral-bonus-list.component.scss"],
})
export class PendingReferralBonusListComponent implements OnInit {
  transactions$: Observable<any>;

  constructor(
    private readonly salesCommissionService: SalesCommissionService
  ) {}

  ngOnInit(): void {
    this.getAllSubscriptionBonuses();
  }

  getAllSubscriptionBonuses() {
    this.transactions$ = this.salesCommissionService.getAllSubscriptionBonuses({
      status: "Pending",
    });
  }
}
