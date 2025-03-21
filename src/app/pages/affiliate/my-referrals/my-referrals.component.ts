import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { SalesCommissionService } from "../../sales-commission/sales-commission.service";

@Component({
  selector: "app-my-referrals",
  templateUrl: "./my-referrals.component.html",
  styleUrls: ["./my-referrals.component.scss"],
})
export class MyReferralsComponent implements OnInit {
  isLoading = false;
  transactions$: Observable<any>;

  constructor(private salesCommissionService: SalesCommissionService) {}

  edit(data: any) {}

  ngOnInit() {
    this.getSubscriptionBonuses();
  }

  getSubscriptionBonuses() {
    this.transactions$ = this.salesCommissionService.getMySubscriptionBonuses({
      // status: "PENDING",
    });
  }

  getTotalAmount(data: any[]) {
    // const filteredSales = data.filter((item: any) => item.status === "Paid");
    const filteredSales = data;
    return {
      totalAmount: filteredSales.reduce(
        (acc, item) => acc + Number(item.amount),
        0
      ),
      count: filteredSales.length,
    };
  }
}
