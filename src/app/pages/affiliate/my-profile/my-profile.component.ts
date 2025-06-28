import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { AffiliateService } from "../affiliate.service";
import { SettingsService } from "../../settings/settings.service";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { AuthenticationService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.scss"],
})
export class MyProfileComponent implements OnInit {
  loginForm: UntypedFormGroup;
  submitted = false;

  affiliate: any;
  isLoading = false;
  submittingUpgradeRequest = false;
  isAddingBank = false;
  titleList = [{ name: "Mr." }, { name: "Mrs." }, { name: "Mss." }];
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

  updateBank = {
    id: null,
    bankName: null,
    accountName: null,
    accountNumber: null,
  };

  changePassword = {
    currentPassword: null,
    newPassword: null,
    confirmPassword: null,
  };

  // Password visibility toggle
  currentPasswordFieldType: "password" | "text" = "password";
  newPasswordFieldType: "password" | "text" = "password";
  confirmPasswordFieldType: "password" | "text" = "password";
  constructor(
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private affiliateService: AffiliateService,
    private settingsService: SettingsService,
    private authenticationService: AuthenticationService
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
  updateBankModal(content: any, data: any) {
    this.updateBank = data;
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
    this.loginForm = this.formBuilder.group(
      {
        currentPassword: [
          null,
          [
            Validators.required,
            Validators.minLength(6),
            // this.passwordStrengthValidator,
          ],
        ],
        newPassword: [
          null,
          [
            Validators.required,
            Validators.minLength(6),
            this.passwordStrengthValidator,
          ],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );

    // Add real-time validation for confirm password
    this.loginForm.get("confirmPassword").valueChanges.subscribe(() => {
      const newPasswordControl = this.loginForm.get("newPassword");
      const confirmPasswordControl = this.loginForm.get("confirmPassword");

      if (newPasswordControl.value && confirmPasswordControl.value) {
        if (newPasswordControl.value !== confirmPasswordControl.value) {
          confirmPasswordControl.setErrors({ passwordMismatch: true });
        } else {
          confirmPasswordControl.setErrors(null);
        }
      }
    });
    this.getProfileInfo();
  }

  get f() {
    return this.loginForm.controls;
  }

  getProfileInfo() {
    this.affiliateService.getProfile().subscribe(
      (response: any) => {
        this.affiliate = response;
        if (response?.nok[0]) {
          this.nok = response?.nok[0];
          this.nok.relationshipId = response?.nok[0]?.relationship?.id;
        }
      },
      (error) => {}
    );
    this.settingsService.getAllNationality({}).subscribe(
      (response: any) => {
        this.countryList = response.data;
      },
      (error) => {}
    );
    this.settingsService.getAllRelationship({}).subscribe(
      (response: any) => {
        this.relationshipList = response.data;
      },
      (error) => {}
    );
  }

  passwordStrengthValidator(control) {
    const value = control.value;

    if (!value) {
      return null;
    }

    // Check for at least one uppercase letter
    const hasUpperCase = /[A-Z]/.test(value);
    // Check for at least one lowercase letter
    const hasLowerCase = /[a-z]/.test(value);
    // Check for at least one number
    const hasNumber = /[0-9]/.test(value);
    // Check for at least one special character
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

    const passwordValid =
      hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    return passwordValid ? null : { passwordStrength: true };
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: UntypedFormGroup) {
    const newPassword = form.get("newPassword");
    const confirmPassword = form.get("confirmPassword");

    if (newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }

    return null;
  }

  // Toggle password visibility
  togglePasswordVisibility(
    field: "newPassword" | "confirmPassword" | "currentPassword"
  ) {
    if (field === "newPassword") {
      this.newPasswordFieldType =
        this.newPasswordFieldType === "password" ? "text" : "password";
    } else if (field === "currentPassword") {
      this.currentPasswordFieldType =
        this.currentPasswordFieldType === "password" ? "text" : "password";
    } else {
      this.confirmPasswordFieldType =
        this.confirmPasswordFieldType === "password" ? "text" : "password";
    }
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
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    } else {
      this.authenticationService.updatePassword(this.loginForm.value).subscribe(
        (response: any) => {
          Swal.fire({
            text: "Successfully updated password!",
            icon: "success",
            confirmButtonText: "Re-authenticate your account!",
            confirmButtonColor: "#1B84FF",
          }).then((res) => {
            if (res.isConfirmed) {
              this.modalService.dismissAll();
              this.authenticationService.logout();
              this.submitted = false;
            }
          });
        },
        (error) => {
          Swal.fire({
            text: error,
            icon: "error",
            confirmButtonText: "Ok, got it!",
            confirmButtonColor: "#1B84FF",
          }).then((res) => {
            if (res.isConfirmed) {
              this.submitted = false;
            }
          });
        }
      );
    }
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
          text: "Your account upgrade request was submitted successfully. Please check your email for payment instructions!",
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

    const addBankAccountDto = {
      // id: this.updateBank.id,
      bankName: this.bank.bankName,
      accountName: this.bank.accountName,
      accountNumber: this.bank.accountNumber,
    };

    this.affiliateService.addBankAccount(addBankAccountDto).subscribe(
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
          text: `Failed to update bank account! ${
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

  onUpdateBank() {
    this.isAddingBank = true;

    this.affiliateService.updateBankAccount(this.updateBank).subscribe(
      (response: any) => {
        Swal.fire({
          text: "Bank account was successfully updated!",
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
          text: `Failed to create bank account! ${
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

  hasPendingSubscriptionRequest(data: any[]) {
    const request = data.find((item: any) => item.approvalStatus === "Pending");

    if (request) {
      return true;
    } else {
      return false;
    }
  }
}
