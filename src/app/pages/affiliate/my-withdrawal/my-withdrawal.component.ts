import { Component, OnInit, TemplateRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { AffiliateService } from "../affiliate.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-my-withdrawal",
  templateUrl: "./my-withdrawal.component.html",
  styleUrls: ["./my-withdrawal.component.scss"],
  // providers: [AdvancedService, DecimalPipe],
})
export class MyWithdrawalComponent implements OnInit {
  isLoading = false;
  transactions$: Observable<any>;
  affiliate: any;

  obj = {
    amount: null,
  };

  constructor(
    private modalService: NgbModal,
    private affiliateService: AffiliateService
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
    this.getProfileInfo();
  }

  getProfileInfo() {
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

  resetForm() {
    this.obj = {
      amount: null,
    };
  }

  onSubmit() {}
}
