import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { SalesCommissionService } from "../../sales-commission/sales-commission.service";
import { ClipboardService } from "src/app/core/services/copyToClipboard";
import { AffiliateService } from "../affiliate.service";

@Component({
  selector: "app-my-referrals",
  templateUrl: "./my-referrals.component.html",
  styleUrls: ["./my-referrals.component.scss"],
})
export class MyReferralsComponent implements OnInit {
  isLoading = false;
  transactions$: Observable<any>;
  referralCode: string = "";
  copied = false;
  affiliate: any;

  constructor(
    private affiliateService: AffiliateService,
    private salesCommissionService: SalesCommissionService,
    private clipboardService: ClipboardService
  ) {}

  edit(data: any) {}

  ngOnInit() {
    this.referralCode = JSON.parse(
      localStorage.getItem("currentUser")
    ).referral_code;
    console.log("referralCode ::", this.referralCode);
    this.getSubscriptionBonuses();
    this.affiliateService.getProfile().subscribe(
      (response: any) => {
        console.log(
          "🚀 ~ MyProfileComponent ~ getFeatures ~ response:",
          response
        );
        this.affiliate = response;
      },
      (error) => {
        console.log(
          "🚀 ~ MyProfileComponent ~ this.affiliateService.getProfile ~ error:",
          error
        );
      }
    );
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

  async copyText(text: string): Promise<void> {
    const result = await this.clipboardService.copyToClipboard(text);
    this.copied = result;

    // Reset the "copied" message after 2 seconds
    if (this.copied) {
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    }
  }
}
