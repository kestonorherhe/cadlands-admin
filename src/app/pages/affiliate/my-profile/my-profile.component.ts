import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { AffiliateService } from "../affiliate.service";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.scss"],
})
export class MyProfileComponent implements OnInit {
  affiliate: any;
  isLoading = false;
  submittingUpgradeRequest = false;
  isAddingBank = false;
  titleList = [{ name: "Mr." }, { name: "Mrs." }];
  countryList = [];
  stateList = [];
  cityList = [];

  nok = {
    title: null,
    firstName: null,
    lastName: null,
    otherName: null,
    phone: null,
    email: null,
    address: null,
    countryId: null,
    stateId: null,
    cityId: null,
  };

  bank = {
    bankName: null,
    accountName: null,
    accountNumber: null,
  };

  changePassword = {
    currentPassword: null,
    newPassword: null,
    confirmPassword: null,
  };

  constructor(
    private modalService: NgbModal,
    private affiliateService: AffiliateService
  ) {}

  editAffiliateModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  editNokModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "lg",
    });
  }

  addBankModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "md",
    });
  }
  changePasswordModal(content: any) {
    this.modalService.open(content, {
      backdrop: "static",
      centered: true,
      size: "md",
    });
  }
  upgradeAccountModal(content: any) {
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
  closeModal2() {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
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
    this.nok = {
      title: null,
      firstName: null,
      lastName: null,
      otherName: null,
      phone: null,
      email: null,
      address: null,
      countryId: null,
      stateId: null,
      cityId: null,
    };
    this.bank = {
      bankName: null,
      accountName: null,
      accountNumber: null,
    };
    this.changePassword = {
      currentPassword: null,
      newPassword: null,
      confirmPassword: null,
    };
  }

  onSubmit() {
    this.isLoading = true;

    // const createRoomTypeDto: any = {
    //   name: this.obj.feature,
    //   description: this.obj.description,
    // };

    // this.accessControlService.createFeature(createRoomTypeDto).subscribe(
    //   (response: any) => {
    //     Swal.fire({
    //       text: "Feature was created successfully!",
    //       icon: "success",
    //       confirmButtonText: "Ok, got it!",
    //       confirmButtonColor: "#1B84FF",
    //     }).then((res) => {
    //       if (res.isConfirmed) {
    //         this.modalService.dismissAll();
    //         this.resetForm();
    //         this.isLoading = false;
    //         this.getFeatures();
    //       }
    //     });
    //   },
    //   (error) => {
    //     Swal.fire({
    //       text: `Failed to create feature! ${
    //         error.error.statusCode === 401
    //           ? "User not authorized!"
    //           : error.error.message
    //       }`,
    //       icon: "error",
    //       confirmButtonText: "Ok, got it!",
    //       confirmButtonColor: "#1B84FF",
    //     }).then((res) => {
    //       if (res.isConfirmed) {
    //         this.isLoading = false;
    //         // this.getRoomTypes();
    //       }
    //     });
    //   }
    // );
  }

  upgradeAccount() {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to submit an upgrade account request?",
      showDenyButton: true,
      allowOutsideClick: false,
      confirmButtonText: "Yes, submit request!",
      confirmButtonColor: "#450000",
      denyButtonText: `No, cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.upgradeAccountFn();
      }
    });
  }

  upgradeAccountFn() {
    this.submittingUpgradeRequest = true;

    this.affiliateService.upgradeAccount().subscribe(
      (response: any) => {
        Swal.fire({
          text: "Account upgrate request was created successfully!",
          icon: "success",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.modalService.dismissAll();
            this.submittingUpgradeRequest = false;
            // this.resetForm();
            // this.getFeatures();
          }
        });
      },
      (error) => {
        console.log(
          "🚀 ~ MyProfileComponent ~ upgradeAccountFn ~ error:",
          error
        );
        Swal.fire({
          text: `${error}`,
          icon: "error",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.submittingUpgradeRequest = false;
            // this.getRoomTypes();
          }
        });
      }
    );
  }

  addBank() {
    this.isAddingBank = true;

    this.affiliateService.addBankAccount(this.bank).subscribe(
      (response: any) => {
        Swal.fire({
          text: "Bank account was successfully added!",
          icon: "success",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.modalService.dismissAll();
            this.resetForm();
            this.isAddingBank = false;
            this.getProfileInfo();
          }
        });
      },
      (error) => {
        Swal.fire({
          text: `Failed to create feature! ${
            error.error.statusCode === 401
              ? "User not authorized!"
              : error.error.message
          }`,
          icon: "error",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.isAddingBank = false;
            // this.getRoomTypes();
          }
        });
      }
    );
  }
}
