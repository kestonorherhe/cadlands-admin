import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { SalesCommissionService } from "../../sales-commission/sales-commission.service";
import { AffiliateService } from "../affiliate.service";

@Component({
  selector: "app-my-bonus-withdrawal",
  templateUrl: "./my-bonus-withdrawal.component.html",
  styleUrls: ["./my-bonus-withdrawal.component.scss"],
})
export class MyBonusWithdrawalComponent implements OnInit {
  isLoading = false;
  transactions$: Observable<any>;
  withdrawals$: Observable<any>;
  affiliate: any;

  obj = {
    amount: null,
  };
  activeBankDetails: any[] = [];

  constructor(
    private modalService: NgbModal,
    private readonly affiliateService: AffiliateService,
    private readonly salesCommissionService: SalesCommissionService
  ) {}

  edit(item: any) {}

  withdrawalModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "md",
    });
  }

  closeModal() {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you would like to cancel?",
      showDenyButton: true,
      allowOutsideClick: false,
      confirmButtonText: "Yes, cancel it!",
      confirmButtonColor: "#1B84FF",
      denyButtonText: `No, return`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.resetForm();
        this.modalService.dismissAll();
      }
    });
  }

  ngOnInit() {
    this.getSubscriptionBonuses();
    this.getMyWithdrawals();

    this.affiliateService.getAffiliateBanks().subscribe(
      (response: any) => {
        console.log(
          "🚀 ~ MyWithdrawalComponent ~ this.affiliateService.getAffiliateBanks ~ response:",
          response
        );
        this.activeBankDetails = response.filter(
          (account: any) => account.status == true
        );
      },
      (error) => {
        console.log(
          "🚀 ~ MyWithdrawalComponent ~ this.affiliateService.getAffiliateBanks ~ error:",
          error
        );
      }
    );
  }

  getSubscriptionBonuses() {
    this.transactions$ = this.salesCommissionService.getMySubscriptionBonuses(
      {}
    );
  }

  getMyWithdrawals() {
    this.withdrawals$ = this.salesCommissionService.getMyBonusWithdrawals({});
  }

  getPaidWithdrawals(data: any[]) {
    // console.log("data :: ", data);
    const filteredWithdrawals = data.filter(
      (item: any) => item.paymentStatus === "Paid"
    );
    return {
      totalAmount: filteredWithdrawals.reduce(
        (acc, item) => acc + Number(item.amount),
        0
      ),
      count: filteredWithdrawals.length,
    };
  }

  getPendingWithdrawals(data: any[]) {
    const filteredWithdrawals = data.filter(
      (item: any) => item.paymentStatus === "Not_Paid"
    );
    return {
      totalAmount: filteredWithdrawals.reduce(
        (acc, item) => acc + Number(item.amount),
        0
      ),
      count: filteredWithdrawals.length,
    };
  }

  getPendingSales(data: any[]) {
    const filteredSales = data.filter(
      (item: any) => item.approvalStatus === "Pending"
    );
    this.obj.amount = Number(
      filteredSales.reduce((acc, item) => acc + item.amount, 0)
    );
    return {
      totalAmount: filteredSales.reduce((acc, item) => acc + item.amount, 0),
      count: filteredSales.length,
    };
  }

  resetForm() {
    this.obj = {
      amount: null,
    };
  }

  onSubmit() {
    this.isLoading = true;
    const withdrawalDto = {
      amount: this.obj.amount,
    };
    this.salesCommissionService
      .createBonusWithdrawalRequest(withdrawalDto)
      .subscribe(
        (response: any) => {
          this.isLoading = false;
          Swal.fire({
            text: "Feature was created successfully!",
            icon: "success",
            confirmButtonText: "Ok, got it!",
            confirmButtonColor: "#1B84FF",
          }).then((res) => {
            if (res.isConfirmed) {
              this.modalService.dismissAll();
              this.resetForm();
              this.isLoading = false;
              this.getSubscriptionBonuses();
            }
          });
        },
        (error) => {
          console.log("🚀 ~ MyWithdrawalComponent ~ onSubmit ~ error:", error);
          this.isLoading = false;
          Swal.fire({
            // text: `${
            //   error.error.statusCode === 401
            //     ? "User not authorized!"
            //     : error
            // }`,
            text: `${error}`,
            icon: "error",
            confirmButtonText: "Ok, got it!",
            confirmButtonColor: "#1B84FF",
          }).then((res) => {
            if (res.isConfirmed) {
              this.isLoading = false;
              this.modalService.dismissAll();
              this.resetForm();
            }
          });
        }
      );
  }
}
