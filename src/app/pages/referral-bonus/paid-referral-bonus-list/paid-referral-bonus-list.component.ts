import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesCommissionService } from '../../sales-commission/sales-commission.service';

@Component({
  selector: "app-paid-referral-bonus-list",
  templateUrl: "./paid-referral-bonus-list.component.html",
  styleUrls: ["./paid-referral-bonus-list.component.scss"],
})
export class PaidReferralBonusListComponent implements OnInit {
  transactions$: Observable<any>;

  constructor(
    private readonly salesCommissionService: SalesCommissionService
  ) {}

  ngOnInit(): void {
    this.getAllSubscriptionBonuses();
  }

  getAllSubscriptionBonuses() {
    this.transactions$ = this.salesCommissionService.getAllSubscriptionBonuses({
      status: "Approved",
    });
  }
}
