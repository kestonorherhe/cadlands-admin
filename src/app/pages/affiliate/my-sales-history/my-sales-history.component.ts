import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { SalesCommissionService } from "../../sales-commission/sales-commission.service";

@Component({
  selector: "app-my-sales-history",
  templateUrl: "./my-sales-history.component.html",
  styleUrls: ["./my-sales-history.component.scss"],
})
export class MySalesHistoryComponent implements OnInit {
  isLoading = false;
  transactions$: Observable<any>;
  affiliateSales$: Observable<any>;
  first_name = "";

  @ViewChild("appointmentDetailModal")
  appointmentDetailModalRef: TemplateRef<any>;
  constructor(
    private readonly salesCommissionService: SalesCommissionService
  ) {}

  edit(evt: any) {}

  ngOnInit() {
    this.first_name = JSON.parse(
      localStorage.getItem("currentUser")
    ).first_name;

    this.getSales();
    this.getAffiliateSales();
  }

  getSales() {
    this.transactions$ = this.salesCommissionService.getMySalesHistory({
      // status: "PENDING",
    });
  }

  getAffiliateSales() {
    this.affiliateSales$ = this.salesCommissionService.getMyAffiliateSalesHistory(
      {
        // status: "PENDING",
      }
    );
  }

  getPaidSales(data: any[]) {
    const filteredSales = data.filter((item: any) => item.status === "Paid");
    return {
      totalAmount: filteredSales.reduce((acc, item) => acc + item.amount, 0),
      count: filteredSales.length,
    };
  }

  getPendingSales(data: any[]) {
    const filteredSales = data.filter((item: any) => item.status === "Pending");
    return {
      totalAmount: filteredSales.reduce((acc, item) => acc + item.amount, 0),
      count: filteredSales.length,
    };
  }
}
