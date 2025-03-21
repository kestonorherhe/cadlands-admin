import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { SalesCommissionService } from "../../sales-commission/sales-commission.service";
import { AffiliateService } from "../affiliate.service";

@Component({
  selector: "app-my-subscription",
  templateUrl: "./my-subscription.component.html",
  styleUrls: ["./my-subscription.component.scss"],
})
export class MySubscriptionComponent implements OnInit {
  isLoading = false;
  subscriptionRequests$: Observable<any>;
  subscriptions$: Observable<any>;
  affiliate: any;

  constructor(
    private readonly affiliateService: AffiliateService,
  ) {}

  ngOnInit() {
    this.getMySubscriptionRequests();
    this.getMyWithdrawals();
  }

  getMySubscriptionRequests() {
    this.subscriptionRequests$ =
      this.affiliateService.getMySubscriptionRequests();
  }

  getMyWithdrawals() {
    this.subscriptions$ = this.affiliateService.getMySubscriptions();
  }

  getTotalAmount(data: any[]) {
    const filteredWithdrawals = data.filter(
      (item: any) => item.paymentStatus === "PAID"
    );
    return {
      totalAmount: filteredWithdrawals.reduce(
        (acc, item) => acc + Number(item.amount),
        0
      ),
      count: filteredWithdrawals.length,
    };
  }
}
