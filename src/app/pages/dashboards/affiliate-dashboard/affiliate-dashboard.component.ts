import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { SalesCommissionService } from "../../sales-commission/sales-commission.service";

@Component({
  selector: "app-affiliate-dashboard",
  templateUrl: "./affiliate-dashboard.component.html",
  styleUrls: ["./affiliate-dashboard.component.scss"],
  // providers: [AdvancedService, DecimalPipe],
})
export class AffiliateDashboardComponent implements OnInit {
  isLoading = false;
  transactions$: Observable<any>;
  referralBonuses$: Observable<any>;
  mySales$: Observable<any>;
  directCommissions$: Observable<any>;
  indirectCommissions$: Observable<any>;

  data = [];
  first_name = "";
  user;
  tractorCount = 0;

  isVisible: string;
  isActive: string;

  constructor(
    private readonly salesCommissionService: SalesCommissionService
  ) {}

  ngOnInit() {
    this.first_name = JSON.parse(
      localStorage.getItem("currentUser")
    ).first_name;
    this.user = JSON.parse(localStorage.getItem("currentUser"));

    this.transactions$ = this.salesCommissionService.getMySalesHistory({
      // status: "PENDING",
    });
    this.getSales();
    this.getSubscriptionBonuses();
    this.getMyDirectSalesCommissions();
    this.getMyIndirectSalesCommissions();
  }
  getSubscriptionBonuses() {
    this.referralBonuses$ =
      this.salesCommissionService.getMySubscriptionBonuses({
        // status: "PENDING",
      });
  }

  getSales() {
    this.mySales$ = this.salesCommissionService.getMySalesHistory({
      // status: "PENDING",
    });
  }

  getMyDirectSalesCommissions() {
    this.directCommissions$ =
      this.salesCommissionService.getMyDirectSalesCommissions({});
  }

  getMyIndirectSalesCommissions() {
    this.indirectCommissions$ =
      this.salesCommissionService.getMyIndirectSalesCommissions({
        // status: "PENDING",
      });
  }

  getTotalAmount(data: any[]) {
    const filteredSales = data;
    return {
      totalAmount: filteredSales.reduce(
        (acc, item) => acc + Number(item.amount),
        0
      ),
      count: filteredSales.length,
    };
  }

  getPaidSales(data: any[]) {
    const filteredSales = data.filter((item: any) => item.status === "Paid");
    return {
      totalAmount: filteredSales.reduce((acc, item) => acc + item.amount, 0),
      count: filteredSales.length,
    };
  }
}
