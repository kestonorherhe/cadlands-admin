import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { AuthenticationService } from "../../../core/services/auth.service";
import { OwlOptions } from "ngx-owl-carousel-o";
import { first } from "rxjs/operators";
import Swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-affiliate-referral-registration",
  templateUrl: "./affiliate-referral-registration.component.html",
  styleUrls: ["./affiliate-referral-registration.component.scss"],
})
export class AffiliateReferralRegistrationComponent implements OnInit {
  // set the currenr year
  year: number = new Date().getFullYear();

  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    responsive: {
      680: {
        items: 1,
      },
    },
  };

  referralCode: string
  loginForm: UntypedFormGroup;
  submitted = false;
  error = "";
  showErr = false;
  isLoggingIn = false;

  // Password visibility toggle
  passwordFieldType: "password" | "text" = "password";
  confirmPasswordFieldType: "password" | "text" = "password";

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    this.route.params.subscribe((params) => {
      this.referralCode = params["referralcode"];
    });
  }

  ngOnInit(): void {
    document.body.classList.add("auth-body-bg");
    this.loginForm = this.formBuilder.group(
      {
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        phone: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(6),
            this.passwordStrengthValidator,
          ],
        ],
        confirmPassword: [null, [Validators.required]],
        referralCode: [this.referralCode, []],
        termsAccepted: [false, [Validators.requiredTrue]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );

    // Add real-time validation for confirm password
    this.loginForm.get("confirmPassword").valueChanges.subscribe(() => {
      const passwordControl = this.loginForm.get("password");
      const confirmPasswordControl = this.loginForm.get("confirmPassword");

      if (passwordControl.value && confirmPasswordControl.value) {
        if (passwordControl.value !== confirmPasswordControl.value) {
          confirmPasswordControl.setErrors({ passwordMismatch: true });
        } else {
          confirmPasswordControl.setErrors(null);
        }
      }
    });
  }

  // Custom validator for password strength
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
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }

    return null;
  }

  // Getter for easy access to form controls
  get f() {
    return this.loginForm.controls;
  }

  // Toggle password visibility
  togglePasswordVisibility(field: "password" | "confirmPassword") {
    if (field === "password") {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    } else {
      this.confirmPasswordFieldType =
        this.confirmPasswordFieldType === "password" ? "text" : "password";
    }
  }

  onSubmit() {
    this.submitted = true;
    this.showErr = false;

    // Additional check for password validation
    if (
      this.loginForm.get("password").value !==
      this.loginForm.get("confirmPassword").value
    ) {
      this.loginForm
        .get("confirmPassword")
        .setErrors({ passwordMismatch: true });
      return;
    }

    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoggingIn = true;

    this.authenticationService
      .affiliateRegistration(this.loginForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.isLoggingIn = false;
          Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: "You have been registered successfully!",
          });
        },
        (error) => {
          this.isLoggingIn = false;
          this.showErr = true;
          this.error =
            error?.message || "Registration failed. Please try again.";
        }
      );
  }
}
