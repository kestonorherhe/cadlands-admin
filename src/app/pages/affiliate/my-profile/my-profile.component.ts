import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { AffiliateService } from "../affiliate.service";
import { SettingsService } from "../../settings/settings.service";

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
  genderList = [{ name: "Male" }, { name: "Female" }];
  countryList = [];
  relationshipList = [];

  nok = {
    id: null,
    title: null,
    firstName: null,
    lastName: null,
    otherName: null,
    phone: null,
    email: null,
    address: null,
    country: null,
    state: null,
    city: null,
    relationshipId: null,
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
    private affiliateService: AffiliateService,
    private settingsService: SettingsService
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
        this.nok = response?.nok[0];
        this.nok.relationshipId = response?.nok[0]?.relationship?.id;
      },
      (error) => {
        console.log(
          "🚀 ~ MyProfileComponent ~ this.affiliateService.getProfile ~ error:",
          error
        );
      }
    );
    this.settingsService.getAllNationality({}).subscribe(
      (response: any) => {
        this.countryList = response.data;
      },
      (error) => {
        console.log("🚀 ~ MyProfileComponent ~ getProfileInfo ~ error:", error);
      }
    );
    this.settingsService.getAllRelationship({}).subscribe(
      (response: any) => {
        this.relationshipList = response.data;
      },
      (error) => {
        console.log("🚀 ~ MyProfileComponent ~ getProfileInfo ~ error:", error);
      }
    );
  }

  resetForm() {
    this.nok = {
      id: null,
      title: null,
      firstName: null,
      lastName: null,
      otherName: null,
      phone: null,
      email: null,
      address: null,
      country: null,
      state: null,
      city: null,
      relationshipId: null,
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

  onUpdateAffiliate() {
    this.isLoading = true;

    const updateDto: any = {
      id: this.affiliate.id,
      firstName: this.affiliate.firstName,
      lastName: this.affiliate.lastName,
      phone: this.affiliate.phone,
      email: this.affiliate.email,
      address: this.affiliate.address,
      birthDate: this.affiliate.birthDate,
      gender: this.affiliate.gender,
      country: this.affiliate.country,
      state: this.affiliate.state,
      city: this.affiliate.city,
    };

    this.affiliateService.updateAffiliate(updateDto).subscribe(
      (response: any) => {
        Swal.fire({
          text: "Affiliate record updated successfully!",
          icon: "success",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.modalService.dismissAll();
            this.resetForm();
            this.isLoading = false;
            this.getProfileInfo();
          }
        });
      },
      (error) => {
        Swal.fire({
          text: error.error.message,
          icon: "error",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.isLoading = false;
            // this.getRoomTypes();
          }
        });
      }
    );
  }

  onUpdateNok() {
    this.isLoading = true;

    const createRoomTypeDto: any = {
      id: this.nok.id ?? null,
      title: this.nok.title,
      firstName: this.nok.firstName,
      lastName: this.nok.lastName,
      otherName: this.nok.otherName,
      phone: this.nok.phone,
      email: this.nok.email,
      address: this.nok.address,
      country: this.nok.country,
      state: this.nok.state,
      city: this.nok.city,
      relationshipId: this.nok.relationshipId,
    };

    this.affiliateService.updateAffiliateNok(createRoomTypeDto).subscribe(
      (response: any) => {
        Swal.fire({
          text: "Successfully updated NoK information!",
          icon: "success",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.modalService.dismissAll();
            this.resetForm();
            this.isLoading = false;
            this.getProfileInfo();
          }
        });
      },
      (error) => {
        console.log("🚀 ~ MyProfileComponent ~ onUpdateNok ~ error:", error)
        this.isLoading = false;
        Swal.fire({
          text: error,
          icon: "error",
          confirmButtonText: "Ok, got it!",
          confirmButtonColor: "#1B84FF",
        }).then((res) => {
          if (res.isConfirmed) {
            this.isLoading = false;
            // this.getRoomTypes();
          }
        });
      }
    );
  }

  onChangePassword() {
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
