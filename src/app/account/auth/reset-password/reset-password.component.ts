import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { AuthenticationService } from "../../../core/services/auth.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
/**
 * Login-2 component
 */
export class ResetPasswordComponent implements OnInit {
  loginForm: UntypedFormGroup;
  submitted = false;
  error = "";
  showErr = false;
  isLoggingIn = false;
  returnUrl: string;
  fieldTextType!: boolean;

  // Password visibility toggle
  passwordFieldType: "password" | "text" = "password";
  confirmPasswordFieldType: "password" | "text" = "password";

  // set the currenr year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    document.body.classList.add("auth-body-bg");
    this.loginForm = this.formBuilder.group(
      {
        password: [
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

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
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

  /**
   * Form submit
   */
  onSubmit() {
    this.showErr = false;
    this.isLoggingIn = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authenticationService
        .login(this.loginForm.value)
        .pipe(first())
        .subscribe(
          (data) => {
            console.log("🚀 ~ Login2Component ~ onSubmit ~ data:", data);
            this.isLoggingIn = false;

            if (data.data.role && data.data.role == "admin") {
              window.location.replace("/dashboard");
            } else if (data.data.role && data.data.role == "super_admin") {
              window.location.replace("/dashboard");
            } else if (data.data.role && data.data.role == "affiliate") {
              window.location.replace("/my-dashboard");
            }
          },
          (error) => {
            this.isLoggingIn = false;
            console.log("error ::", error);
            this.error = error ? error : "";
          }
        );
    }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
